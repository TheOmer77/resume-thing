import type { PropsWithChildren } from 'react';

import { QueryProvider } from './QueryProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <QueryProvider>{children}</QueryProvider>
);
