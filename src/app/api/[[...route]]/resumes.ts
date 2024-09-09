import { Hono } from 'hono';

import { getResumeById, getResumes } from '@/db/queries/resume';

export const resumesRouter = new Hono()
  .get('/', async ctx => {
    const result = await getResumes();
    return ctx.json(result);
  })
  .get('/:id', async ctx => {
    const result = await getResumeById(ctx.req.param('id'));
    return ctx.json(result);
  });
