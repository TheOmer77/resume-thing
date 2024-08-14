import { Hono } from 'hono';
import { asc, eq, isNotNull, or, SQL, sql } from 'drizzle-orm';
import type { PgColumn, PgTable } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import {
  block,
  blockContentContact,
  blockContentContactItem,
  blockContentExperience,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import type { BlockData } from '@/types/blocks';
import { jsonAgg, jsonBuildObject } from '@/lib/drizzle';

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
  {
    schema: blockContentContact,
    type: 'contactInfo',
    properties: {
      orientation: blockContentContact.orientation,
      items: jsonAgg(
        jsonBuildObject({
          order: blockContentContactItem.order,
          type: blockContentContactItem.type,
          text: blockContentContactItem.text,
          url: blockContentContactItem.url,
        }),
        asc(blockContentContactItem.order)
      ),
    },
  } satisfies QueryMapItem<typeof blockContentContact>,
];

/** Required for contact info blocks with items to be fetched properly. */
const groupBy = queryMap
  .reduce(
    (arr, { schema, properties }) => [
      ...arr,
      schema.blockId,
      ...Object.values(properties).filter(value => !(value instanceof SQL)),
    ],
    [] as PgColumn[]
  )
  .flat();

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
            sql`WHEN ${isNotNull(schema.blockId)} THEN ${jsonBuildObject(
              properties
            )}`
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
    .leftJoin(blockContentContact, eq(block.id, blockContentContact.blockId))
    .leftJoin(
      blockContentContactItem,
      eq(block.id, blockContentContactItem.blockId)
    )
    .where(or(...queryMap.map(({ schema }) => isNotNull(schema.blockId))))
    .groupBy(block.id, ...groupBy)) as BlockData[];

  return ctx.json(result);
});
