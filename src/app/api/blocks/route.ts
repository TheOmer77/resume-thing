import { eq, isNotNull, or, sql } from 'drizzle-orm';

import { db } from '@/db';
import {
  block,
  blockContentExperience,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import type { BlockData } from '@/types/blocks';

const queryMap = [
  {
    schema: blockContentTitle,
    type: 'title',
    properties: [
      'title',
      'subtitle',
    ] satisfies (keyof typeof blockContentTitle)[],
  },
  {
    schema: blockContentText,
    type: 'text',
    properties: ['text', 'lead'] satisfies (keyof typeof blockContentText)[],
  },
  {
    schema: blockContentExperience,
    type: 'experience',
    properties: [
      'title',
      'location',
      'startDate',
      'endDate',
      'text',
    ] satisfies (keyof typeof blockContentExperience)[],
  },
];

export const GET = async () => {
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

  return Response.json(result);
};
