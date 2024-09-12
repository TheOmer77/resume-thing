import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import {
  deleteResumeById,
  getResumeById,
  getResumes,
} from '@/db/queries/resume';
import { db } from '@/db';
import { resume } from '@/db/schema';
import { getBlocks, insertBlocks } from '@/db/queries/block';
import { createDuplicateBlocks } from '@/lib/blocks';
import { getDuplicateName } from '@/lib/getDuplicateName';

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

  .post('/duplicate/:id', async ctx => {
    const id = ctx.req.param('id');
    const data = await getResumeById(ctx.req.param('id'));
    if (!data)
      throw new HTTPException(404, {
        message: `Resume with ID '${id}' was not found.`,
      });

    const { title, author, userId } = data;

    const duplicateId = await db.transaction(async tx => {
      try {
        const dupId = (
          await tx
            .insert(resume)
            .values({ title: getDuplicateName(title), author, userId })
            .returning({ id: resume.id })
        )[0]?.id;
        if (!dupId) throw new Error("We couldn't duplicate this resume.");

        const originalBlocks = await getBlocks(id, tx),
          duplicateBlocks = createDuplicateBlocks(
            originalBlocks.map(block => ({ ...block, resumeId: dupId }))
          );
        await insertBlocks(duplicateBlocks, tx);

        return dupId;
      } catch (error) {
        tx.rollback();
      }
    });

    return ctx.json({ id: duplicateId });
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
