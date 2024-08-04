import type { PropsWithChildren } from 'react';

export const SecondaryHeaderRow = ({ children }: PropsWithChildren) => (
  <header className='secondary-col prose prose-invert space-y-4 pb-8 pe-8 ps-[--page-margin] pt-[--page-margin]'>
    {children}
  </header>
);
