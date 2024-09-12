import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import {
  deleteResumeById,
  getResumeById,
  getResumes,
} from '@/db/queries/resume';
import { db } from '@/db';
import { resume } from '@/db/schema';
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

    const { title, ...duplicateData } = Object.entries(data).reduce(
      (obj, [key, value]) =>
        ['id', 'createdAt', 'updatedAt'].includes(key)
          ? obj
          : { ...obj, [key]: value },
      {} as Omit<typeof data, 'id' | 'createdAt' | 'updatedAt'>
    );

    const duplicateId = await db.transaction(async tx => {
      try {
        const dupId = (
          await tx
            .insert(resume)
            .values({ title: getDuplicateName(title), ...duplicateData })
            .returning({ id: resume.id })
        )[0]?.id;

        // TODO: Duplicate blocks, resumeId = duplicateId
        // TODO: Link block content for each block, maybe use getBlocks util?

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
