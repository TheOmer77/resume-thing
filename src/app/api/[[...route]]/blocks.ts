import { Hono } from 'hono';
import { eq, isNotNull, or, sql } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import {
  block,
  blockContentExperience,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import type { BlockData } from '@/types/blocks';

type SchemaColumn<TSchema extends PgTable> = keyof TSchema['_']['columns'];
type QueryMapItem<TSchema extends PgTable> = {
  schema: TSchema;
  type: string;
  properties: Partial<
    Record<
      SchemaColumn<TSchema> | (NonNullable<unknown> & string),
      TSchema['_']['columns'][SchemaColumn<TSchema>] | SQL<unknown>
    >
  >;
};

const queryMap = [
  {
    schema: blockContentTitle,
    type: 'title',
    properties: {
      title: blockContentTitle.title,
      subtitle: blockContentTitle.subtitle,
    },
  } satisfies QueryMapItem<typeof blockContentTitle>,
  {
    schema: blockContentText,
    type: 'text',
    properties: {
      text: blockContentText.text,
      lead: blockContentText.lead,
  },
  } satisfies QueryMapItem<typeof blockContentText>,
  {
    schema: blockContentExperience,
    type: 'experience',
    properties: {
      title: blockContentExperience.title,
      location: blockContentExperience.location,
      startDate: blockContentExperience.startDate,
      endDate: blockContentExperience.endDate,
      text: blockContentExperience.text,
    },
  } satisfies QueryMapItem<typeof blockContentExperience>,
];

export const blocksRouter = new Hono().get('/', async ctx => {
  const result = (await db
    .select({
      id: block.id,
      type: sql`CASE ${sql.join(
        queryMap.map(
          ({ schema, type }) =>
            sql`WHEN ${isNotNull(schema.blockId)} THEN '${sql.raw(type)}'`
        ),
        sql.raw(' ')
      )} ELSE NULL END`.as('type'),
      content: sql`CASE ${sql.join(
        queryMap.map(
          ({ schema, properties }) =>
            sql`WHEN ${isNotNull(schema.blockId)} THEN json_build_object(${sql.join(
              properties.map(
                prop =>
                  sql`'${sql.raw(prop)}', ${schema[prop as keyof typeof schema]}`
              ),
              sql.raw(', ')
            )})`
        ),
        sql.raw(' ')
      )} ELSE NULL END`.as('content'),
    })
    .from(block)
    .leftJoin(blockContentTitle, eq(block.id, blockContentTitle.blockId))
    .leftJoin(blockContentText, eq(block.id, blockContentText.blockId))
    .leftJoin(
      blockContentExperience,
      eq(block.id, blockContentExperience.blockId)
    )
    .where(
      or(...queryMap.map(({ schema }) => isNotNull(schema.blockId)))
    )) as BlockData[];

  return ctx.json(result);
});
