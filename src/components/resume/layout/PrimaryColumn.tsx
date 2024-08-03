import { type PropsWithChildren } from 'react';

export const PrimaryColumn = ({ children }: PropsWithChildren) => (
  <div className='text-body p-page-margin prose prose-sm h-full max-w-none flex-1 space-y-4 bg-background ps-8 leading-normal'>
    {children}
  </div>
);
