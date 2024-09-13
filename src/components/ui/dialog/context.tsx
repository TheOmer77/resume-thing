'use client';

import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
} from 'react';

type DialogTypeValue = 'dialog' | 'alert';

const DialogTypeContext = createContext<DialogTypeValue>('dialog');

export const DialogTypeProvider = ({
  value,
  children,
}: ComponentPropsWithoutRef<typeof DialogTypeContext.Provider>) => (
  <DialogTypeContext.Provider value={value}>
    {children}
  </DialogTypeContext.Provider>
);

export const useDialogType = () => useContext(DialogTypeContext);
