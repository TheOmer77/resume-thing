import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import type { InferInsertModel } from 'drizzle-orm';

import { block } from '../block';

export const blockContentContactOrientation = pgEnum(
  'block_content_contact_orientation',
  ['horizontal', 'vertical']
);

export const blockContentContact = pgTable('block_content_contact', {
  blockId: text('block_id')
    .primaryKey()
    .references(() => block.id, { onDelete: 'cascade' }),

  orientation: blockContentContactOrientation('orientation'),
});

export type ContactInfoBlockContent = InferInsertModel<
  typeof blockContentContact
>;
