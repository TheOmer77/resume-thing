import { pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

import { block } from '../block';

export const blockContentTitle = pgTable('block_content_title', {
  id: text('id').primaryKey().$default(createId),
  blockId: text('block_id')
    .unique()
    .notNull()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
});
