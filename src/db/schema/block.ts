import { boolean, pgTable, smallint, text, unique } from 'drizzle-orm/pg-core';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const block = pgTable(
  'block',
  {
    id: text('id').primaryKey().$default(createId),
    resumeId: text('resume_id').notNull(),
    order: smallint('order'),
    inHeaderRow: boolean('in_header_row').notNull().default(false),
    inSecondaryCol: boolean('in_secondary_col').notNull().default(false),
  },
  table => ({
    uniqueOrderPerResume: unique().on(
      table.resumeId,
      table.order,
      table.inHeaderRow,
      table.inSecondaryCol
    ),
  })
);

export type BlockBase = Pick<
  InferSelectModel<typeof block>,
  'id' | 'resumeId'
> &
  Omit<InferInsertModel<typeof block>, 'id' | 'resumeId'>;
