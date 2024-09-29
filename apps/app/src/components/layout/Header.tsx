import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

type TitleProps = PropsWithChildren<{ title?: string }>;

export const Header = ({ title, children }: TitleProps) => (
  <header className='fixed top-0 z-50 w-full bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden'>
    <div className='mx-auto flex h-16 w-full max-w-screen-2xl items-center p-4 sm:px-8'>
      <h1
        className={cn(
          'me-4 flex items-center text-xl font-semibold text-primary lg:me-6',
          !title && 'text-2xl font-extrabold tracking-tight'
        )}
      >
        {title || 'Resume Thing'}
      </h1>
      {children && (
        <nav className='flex grow items-center justify-end'>{children}</nav>
      )}
    </div>
  </header>
);
