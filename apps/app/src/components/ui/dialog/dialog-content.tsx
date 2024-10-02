import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Content, Portal } from '@radix-ui/react-dialog';
import {
  AlertDialogContent,
  AlertDialogPortal,
} from '@radix-ui/react-alert-dialog';

import { cn } from '@/lib/cn';

import { DialogClose } from './dialog-close';
import { DialogOverlay } from './dialog-overlay';
import { useDialogType } from './context';

export const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => {
  const dialogType = useDialogType(),
    ContentComp = dialogType === 'alert' ? AlertDialogContent : Content,
    PortalComp = dialogType === 'alert' ? AlertDialogPortal : Portal;

  return (
    <PortalComp>
      <DialogOverlay />
      <ContentComp
        ref={ref}
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed start-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg duration-200 rtl:translate-x-1/2',
          className
        )}
        {...props}
      >
        {children}
        {dialogType !== 'alert' && <DialogClose />}
      </ContentComp>
    </PortalComp>
  );
});
DialogContent.displayName = Content.displayName;
