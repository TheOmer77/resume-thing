import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { blocksRouter } from './blocks';
import { pdfRouter } from './pdf';
import { resumesRouter } from './resumes';

const app = new Hono()
  .basePath('/api')
  .route('/resumes', resumesRouter)
  .route('/blocks', blocksRouter)
  .route('/pdf', pdfRouter);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type ApiRoutes = typeof app;
