import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { resume } from '@/db/schema';

export const getResumes = async () =>
  await db.select().from(resume).orderBy(desc(resume.updatedAt));

export const getResumeById = async (id: string) =>
  (await db.select().from(resume).where(eq(resume.id, id)))[0];
