'use client';

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';

import { cn } from '@/lib/cn';

import { FormItemContext } from './form-item-context';

export const FormItem = forwardRef<
  ElementRef<'div'>,
  ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';
