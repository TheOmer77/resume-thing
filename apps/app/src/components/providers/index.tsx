import type { PropsWithChildren } from 'react';

import { QueryProvider } from './query-provider';
import { ConfirmProvider } from './confirm-provider';

export const Provider = ({ children }: PropsWithChildren) => (
  <QueryProvider>
    <ConfirmProvider>{children}</ConfirmProvider>
  </QueryProvider>
);
