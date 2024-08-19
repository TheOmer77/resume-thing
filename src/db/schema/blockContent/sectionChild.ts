import {
  pgTable,
  primaryKey,
  smallint,
  text,
  unique,
} from 'drizzle-orm/pg-core';

import { block } from '../block';

export const blockContentSectionChild = pgTable(
  'block_content_section_child',
  {
    blockId: text('block_id')
      .notNull()
      .references(() => block.id, { onDelete: 'cascade' }),
    order: smallint('order').notNull(),

    childId: text('child_id').notNull(),
  },
  table => ({
    pk: primaryKey({ columns: [table.blockId, table.order] }),
    uniqueChild: unique().on(table.blockId, table.childId),
  })
);
