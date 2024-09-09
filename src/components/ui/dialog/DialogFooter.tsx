import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export const DialogFooter = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('flex flex-row justify-end space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';
