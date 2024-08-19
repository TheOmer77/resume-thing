import { pgTable, text } from 'drizzle-orm/pg-core';

import { block } from '../block';

export const blockContentTitle = pgTable('block_content_title', {
  blockId: text('block_id')
    .primaryKey()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  subtitle: text('subtitle'),
});
