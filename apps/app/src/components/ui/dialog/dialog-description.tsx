import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Description } from '@radix-ui/react-dialog';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/cn';

import { useDialogType } from './context';

export const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => {
  const dialogType = useDialogType(),
    Comp = dialogType === 'alert' ? AlertDialogDescription : Description;

  return (
    <Comp
      ref={ref}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
});
DialogDescription.displayName = Description.displayName;
