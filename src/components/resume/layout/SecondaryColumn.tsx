import type { PropsWithChildren } from 'react';

export const SecondaryColumn = ({ children }: PropsWithChildren) => (
  <aside className='pb-page-margin ps-page-margin secondary-col prose prose-invert pe-8'>
    {children}
  </aside>
);
