import { pgTable, text } from 'drizzle-orm/pg-core';

import { block } from '../block';

export const blockContentSection = pgTable('block_content_section', {
  blockId: text('block_id')
    .unique()
    .notNull()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
});
