import type { PropsWithChildren } from 'react';

export const SecondaryColumn = ({ children }: PropsWithChildren) => (
  <div className='secondary-col bg-secondary-background text-secondary-body w-secondary-column-width p-page-margin prose-secondary prose prose-sm space-y-4 pe-8 leading-normal'>
    {children}
  </div>
);
