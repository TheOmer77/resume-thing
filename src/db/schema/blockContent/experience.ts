import { pgTable, text } from 'drizzle-orm/pg-core';

import { block } from '../block';

export const blockContentExperience = pgTable('block_content_experience', {
  blockId: text('block_id')
    .primaryKey()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  location: text('location').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  text: text('text').notNull(),
});
