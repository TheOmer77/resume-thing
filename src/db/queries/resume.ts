import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { resume, type Resume } from '@/db/schema';

export const getResumes = async () =>
  await db.select().from(resume).orderBy(desc(resume.updatedAt));

export const getResumeById = async (id: string): Promise<Resume | undefined> =>
  (await db.select().from(resume).where(eq(resume.id, id)))[0];
