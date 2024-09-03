import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

import { block } from '../block';

export const blockContentText = pgTable('block_content_text', {
  blockId: text('block_id')
    .primaryKey()
    .references(() => block.id, { onDelete: 'cascade' }),

  text: text('text').notNull(),
  lead: boolean('lead').notNull().default(false),
});

export type TextBlockContent = InferSelectModel<typeof blockContentText>;
