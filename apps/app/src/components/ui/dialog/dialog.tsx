'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { Root } from '@radix-ui/react-dialog';
import { AlertDialog } from '@radix-ui/react-alert-dialog';

import { DialogTypeProvider } from './context';

type NonAlertDialogProps = ComponentPropsWithoutRef<typeof Root> & {
  type?: 'dialog';
};
type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertDialog> & {
  type: 'alert';
};
export type DialogProps = NonAlertDialogProps | AlertDialogProps;

export const Dialog = ({ type = 'dialog', ...props }: DialogProps) => {
  const Comp = type === 'alert' ? AlertDialog : Root;
  return (
    <DialogTypeProvider value={type}>
      <Comp {...props} />
    </DialogTypeProvider>
  );
};
