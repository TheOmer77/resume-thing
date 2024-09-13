'use client';

import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MODAL_SEARCH_KEY, useModal } from '@/hooks/useModal';

type ConfirmDialogData = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};
type ConfirmContextValue = {
  promise: {
    resolve: (value: boolean) => void;
  } | null;
  confirm: (data: ConfirmDialogData) => Promise<boolean>;
};

const initialValue = {
  promise: null,
  confirm: () => new Promise<boolean>(resolve => resolve(false)),
} satisfies ConfirmContextValue;

export const ConfirmContext = createContext<ConfirmContextValue>(initialValue);

export const ConfirmProvider = ({ children }: PropsWithChildren) => {
  const [promise, setPromise] = useState<ConfirmContextValue['promise']>(null),
    [data, setData] = useState<ConfirmDialogData | null>(null);
  const { currentModal, openModal, closeModal } = useModal();

  const confirm = (data: ConfirmDialogData) => {
    setData(data);
    openModal('confirm');
    return new Promise<boolean>(resolve => setPromise({ resolve }));
  };

  const handleOpenChange = (open: boolean) => {
    if (open || !currentModal) return;
    closeModal();
  };

  const handleAction = (value: boolean) => {
    promise?.resolve(value);
    setPromise(null);
    closeModal();
  };

  /* Resolve promise when clicking outside on dialog overlay or using back button, not
  by choosing a dialog action */
  useEffect(() => {
    if (!promise) return;

    const listener = () => {
      /** Modal at the time this event is called (not the same as currentModal) */
      const newModal = new URLSearchParams(window.location.search).get(
        MODAL_SEARCH_KEY
      );
      if (newModal !== null) return;
      promise.resolve(false);
      setPromise(null);
    };

    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  }, [promise]);

  return (
    <ConfirmContext.Provider value={{ promise, confirm }}>
      {children}
      <Dialog
        open={promise !== null && currentModal === 'confirm'}
        onOpenChange={handleOpenChange}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data?.title}</DialogTitle>
            <DialogDescription>{data?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleAction(false)}>
              {data?.cancelLabel || 'Cancel'}
            </Button>
            <Button
              variant={data?.destructive ? 'destructive' : 'primary'}
              onClick={() => handleAction(true)}
            >
              {data?.confirmLabel || 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
};
