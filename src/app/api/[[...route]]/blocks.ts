import { Hono } from 'hono';

import { getBlocks } from '@/db/queries/block';

export const blocksRouter = new Hono().get('/', async ctx => {
  const result = await getBlocks();
  return ctx.json(result);
});
