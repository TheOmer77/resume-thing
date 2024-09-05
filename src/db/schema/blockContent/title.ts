import { pgTable, text } from 'drizzle-orm/pg-core';
import type { InferInsertModel } from 'drizzle-orm';

import { block } from '../block';

export const blockContentTitle = pgTable('block_content_title', {
  blockId: text('block_id')
    .primaryKey()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  subtitle: text('subtitle'),
});

export type TitleBlockContent = InferInsertModel<typeof blockContentTitle>;
