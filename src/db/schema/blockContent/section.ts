import { pgTable, text } from 'drizzle-orm/pg-core';
import type { InferSelectModel } from 'drizzle-orm';

import { block } from '../block';

export const blockContentSection = pgTable('block_content_section', {
  blockId: text('block_id')
    .unique()
    .notNull()
    .references(() => block.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
});

export type SectionBlockContent = InferSelectModel<typeof blockContentSection>;
