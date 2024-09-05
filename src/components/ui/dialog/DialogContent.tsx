'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Close, Content, DialogOverlay, Portal } from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        'fixed start-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      <Close asChild className='absolute end-4 top-4'>
        <Button variant='ghost' size='icon'>
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </Button>
      </Close>
    </Content>
  </Portal>
));
DialogContent.displayName = Content.displayName;
