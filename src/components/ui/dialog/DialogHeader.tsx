import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export const DialogHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('flex flex-col space-y-1.5 sm:text-left', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';
