import { pgTable, text } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const block = pgTable('block', {
  id: text('id').primaryKey().$default(createId),
});

export type Block = InferSelectModel<typeof block>;
