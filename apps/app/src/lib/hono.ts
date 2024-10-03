import { hc } from 'hono/client';

import type { ApiRoutes } from '@/app/api/[[...route]]/route';

export const client = hc<ApiRoutes>(
  typeof window !== 'undefined' ? window.location.origin : ''
);
