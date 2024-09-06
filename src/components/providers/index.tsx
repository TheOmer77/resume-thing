import type { PropsWithChildren } from 'react';

import { QueryProvider } from './QueryProvider';
import { ConfirmProvider } from './ConfirmProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <QueryProvider>
    <ConfirmProvider>{children}</ConfirmProvider>
  </QueryProvider>
);
