import type { PropsWithChildren } from 'react';

export const PrimaryColumn = ({ children }: PropsWithChildren) => (
  <main className='prose row-span-2 max-w-none py-[--page-margin] pe-[--page-margin] ps-8 [&>:first-child]:mt-0'>
    {children}
  </main>
);
