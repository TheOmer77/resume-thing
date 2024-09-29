import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';

import {
  deleteResumeById,
  getResumeById,
  getResumes,
} from '@/db/queries/resume';
import { db } from '@/db';
import { renameResumeSchema, resume } from '@/db/schema';
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

  .patch('/:id', zValidator('json', renameResumeSchema), async ctx => {
    const id = ctx.req.param('id');
    const data = await getResumeById(ctx.req.param('id'));
    if (!data)
      throw new HTTPException(404, {
        message: `Resume with ID '${id}' was not found.`,
      });

    const { title } = ctx.req.valid('json');
    const [updated] = await db
      .update(resume)
      .set({ title })
      .where(eq(resume.id, id))
      .returning({ id: resume.id, title: resume.title });
    if (!updated) throw new Error("We couldn't update this resume.");

    return ctx.json(updated);
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
