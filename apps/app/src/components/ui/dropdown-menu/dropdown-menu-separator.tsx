'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/cn';

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = Separator.displayName;
