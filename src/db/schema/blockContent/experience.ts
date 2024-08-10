import { pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

import { block } from '../block';

export const blockContentExperience = pgTable('block_content_experience', {
  id: text('id').primaryKey().$default(createId),
  blockId: text('block_id')
    .unique()
    .notNull()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  location: text('location').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  text: text('text').notNull(),
});
