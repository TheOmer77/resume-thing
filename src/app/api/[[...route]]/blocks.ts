import { Hono } from 'hono';

import { getBlocks } from '@/db/queries/block';

export const blocksRouter = new Hono()
  .get('/', async ctx => {
    const result = await getBlocks();
    return ctx.json(result);
  })
  .get('/:id', async ctx => {
    const result = await getBlocks({ resumeId: ctx.req.param('id') });
    return ctx.json(result);
  });
