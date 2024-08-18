import type { PropsWithChildren } from 'react';

export const SecondaryColumn = ({ children }: PropsWithChildren) => (
  <aside className='secondary-col prose prose-invert pb-[--page-margin] pe-8 ps-[--page-margin]'>
    {children}
  </aside>
);
