import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { createId } from '@paralleldrive/cuid2';

export const resume = pgTable('resume', {
  id: text('id').primaryKey().$default(createId),
  title: text('title').notNull(),
  author: text('author'),
  userId: text('user_id'), // TODO: notNull() and relation to user table
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const renameResumeSchema = createInsertSchema(resume, {
  title: schema => schema.title.min(1, 'Title cannot be empty.').trim(),
}).pick({ title: true });

export type Resume = InferSelectModel<typeof resume>;
