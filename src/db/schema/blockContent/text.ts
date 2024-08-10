import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

import { block } from '../block';

export const blockContentText = pgTable('block_content_text', {
  id: text('id').primaryKey().$default(createId),
  blockId: text('block_id')
    .unique()
    .notNull()
    .references(() => block.id, { onDelete: 'cascade' }),

  text: text('text').notNull(),
  lead: boolean('lead').notNull().default(false),
});
