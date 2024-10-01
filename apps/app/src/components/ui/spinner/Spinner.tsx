import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/cn';

export const Spinner = forwardRef<
  ElementRef<typeof Loader2Icon>,
  ComponentPropsWithoutRef<typeof Loader2Icon>
>(({ className, ...props }, ref) => (
  <Loader2Icon
    {...props}
    ref={ref}
    className={cn('text-muted-foreground size-6 animate-spin', className)}
  />
));
Spinner.displayName = 'Spinner';
