import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { blocksRouter } from './blocks';
import { pdfRouter } from './pdf';

const app = new Hono()
  .basePath('/api')
  .route('/blocks', blocksRouter)
  .route('/pdf', pdfRouter);

export const GET = handle(app);

export type ApiRoutes = typeof app;
