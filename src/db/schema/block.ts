import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const blockType = pgEnum('block_type', [
  'section',
  'title',
  'text',
  'contactInfo',
  'experience',
]);

export const block = pgTable('block', {
  id: text('id').primaryKey().$default(createId),
  type: blockType('type').notNull(),
});

export type Block = InferSelectModel<typeof block>;
