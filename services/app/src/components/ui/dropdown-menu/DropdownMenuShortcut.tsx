import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => (
  <span
    className={cn('ms-auto text-xs tracking-widest opacity-60', className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
