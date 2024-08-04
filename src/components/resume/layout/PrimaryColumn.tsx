import { type PropsWithChildren } from 'react';

export const PrimaryColumn = ({ children }: PropsWithChildren) => (
  <main className='py-page-margin pe-page-margin prose row-span-2 max-w-none ps-8 [&>:first-child]:mt-0'>
    {children}
  </main>
);
