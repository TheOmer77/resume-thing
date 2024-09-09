import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import {
  deleteResumeById,
  getResumeById,
  getResumes,
} from '@/db/queries/resume';

export const resumesRouter = new Hono()
  .get('/', async ctx => {
    const data = await getResumes();
    return ctx.json(data);
  })
  .get('/:id', async ctx => {
    const id = ctx.req.param('id');
    const data = await getResumeById(ctx.req.param('id'));
    if (!data)
      throw new HTTPException(404, {
        message: `Resume with ID '${id}' was not found.`,
      });
    return ctx.json(data);
  })
  .delete('/:id', async ctx => {
    const id = ctx.req.param('id');
    const data = await deleteResumeById(ctx.req.param('id'));
    if (!data)
      throw new HTTPException(404, {
        message: `Resume with ID '${id}' was not found.`,
      });
    return ctx.json(data);
  });
