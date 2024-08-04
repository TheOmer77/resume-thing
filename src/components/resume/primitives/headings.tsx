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
      'text-heading mb-4 text-lg font-bold leading-normal',
      '[.secondary-col_&]:text-secondary-heading [.secondary-col_&]:mb-1 [.secondary-col_&]:mt-0 [.secondary-col_&]:text-sm [.secondary-col_&]:font-semibold',
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
