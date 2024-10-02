'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { CheckboxItem, ItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <CheckboxItem
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pe-2 ps-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className='absolute start-2 flex h-3.5 w-3.5 items-center justify-center'>
      <ItemIndicator>
        <CheckIcon className='size-4' />
      </ItemIndicator>
    </span>
    {children}
  </CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;
