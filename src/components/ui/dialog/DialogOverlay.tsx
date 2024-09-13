'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Overlay } from '@radix-ui/react-dialog';
import { AlertDialogOverlay } from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/cn';

import { useDialogType } from './context';

export const DialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => {
  const dialogType = useDialogType(),
    Comp = dialogType === 'alert' ? AlertDialogOverlay : Overlay;

  return (
    <Comp
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
});
DialogOverlay.displayName = Overlay.displayName;
