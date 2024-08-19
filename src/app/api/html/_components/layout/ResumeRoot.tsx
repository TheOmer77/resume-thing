import type { PropsWithChildren } from 'react';

import { layout } from '@/constants/resume';
import { cn } from '@/lib/cn';

export const ResumeRoot = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      'grid min-h-screen break-after-avoid grid-cols-[var(--secondary-col-width),1fr]',
      'grid-rows-[auto,1fr] before:fixed before:w-[--secondary-col-width]',
      'before:start-0 before:top-0 before:-z-10 before:h-full before:bg-primary',
      '[--inverted-radius:0.6in] after:fixed after:start-[--secondary-col-width]',
      'after:top-0 after:h-full after:w-[--inverted-radius] after:rounded-bl-[calc(var(--inverted-radius)/2)]',
      'after:rounded-tl-[calc(var(--inverted-radius)/2)] after:shadow-[calc(var(--inverted-radius)/-2)_0_0_0_theme(colors.primary)]',
      'after:-z-20 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'
    )}
    style={layout}
  >
    {children}
  </div>
);
