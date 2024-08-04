import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const H1 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'h2'>) => (
  <h2
    {...props}
    className={cn(
      'text-heading [.secondary-col_&]:text-secondary-heading mb-4 text-lg font-bold leading-normal',
      className
    )}
  >
    {children}
  </h2>
);

export const H2 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'h3'>) => (
  <h3
    {...props}
    className={cn(
      'text-heading [.secondary-col_&]:text-secondary-heading mb-1 mt-0 text-sm font-semibold leading-normal',
      className
    )}
  >
    {children}
  </h3>
);
