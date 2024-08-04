import type { PropsWithChildren } from 'react';

export const SecondaryHeaderRow = ({ children }: PropsWithChildren) => (
  <header className='pt-page-margin ps-page-margin secondary-col prose prose-invert space-y-4 pb-8 pe-8'>
    {children}
  </header>
);
