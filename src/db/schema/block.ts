import { pgTable, smallint, text, unique } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const block = pgTable(
  'block',
  {
    id: text('id').primaryKey().$default(createId),
    resumeId: text('resume_id').notNull(),
    order: smallint('order'),
  },
  table => ({ uniqueOrderPerResume: unique().on(table.resumeId, table.order) })
);

export type Block = InferSelectModel<typeof block>;
