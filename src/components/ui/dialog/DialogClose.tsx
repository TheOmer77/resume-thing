'use client';

import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Close } from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export const DialogClose = forwardRef<
  ElementRef<typeof Close>,
  ComponentPropsWithoutRef<typeof Close>
>(({ className, ...props }, ref) => (
  <Close
    {...props}
    ref={ref}
    asChild
    className={cn('absolute end-4 top-4', className)}
  >
    <Button variant='flat' size='icon'>
      <XIcon className='size-4' />
      <span className='sr-only'>Close</span>
    </Button>
  </Close>
));
DialogClose.displayName = Close.displayName;
