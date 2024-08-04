import type { PropsWithChildren } from 'react';

export const SecondaryColumn = ({ children }: PropsWithChildren) => (
  <div className='secondary-col w-secondary-column-width p-page-margin prose prose-sm prose-invert space-y-4 bg-primary pe-8 leading-normal'>
    {children}
  </div>
);
