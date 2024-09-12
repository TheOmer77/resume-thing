'use client';

import { createContext, useState, type PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';

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

  const handleOpenChange = (open: boolean) => !open && closeModal();

  const handleAction = (value: boolean) => {
    promise?.resolve(value);
    setPromise(null);
  };

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
