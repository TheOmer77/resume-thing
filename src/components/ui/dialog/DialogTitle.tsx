'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Title } from '@radix-ui/react-dialog';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/cn';

import { useDialogType } from './context';

export const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => {
  const dialogType = useDialogType(),
    Comp = dialogType === 'alert' ? AlertDialogTitle : Title;

  return (
    <Comp
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = Title.displayName;
