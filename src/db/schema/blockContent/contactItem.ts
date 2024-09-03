import { pgTable, primaryKey, smallint, text } from 'drizzle-orm/pg-core';
import type { InferInsertModel } from 'drizzle-orm';

import { block } from '../block';

export const blockContentContactItem = pgTable(
  'block_content_contact_item',
  {
    blockId: text('block_id')
      .notNull()
      .references(() => block.id, { onDelete: 'cascade' }),
    order: smallint('order').notNull(),

    type: text('type').notNull(),
    text: text('text').notNull(),
    url: text('url'),
  },
  table => ({ pk: primaryKey({ columns: [table.blockId, table.order] }) })
);

export type ContactInfoItem = InferInsertModel<typeof blockContentContactItem>;
