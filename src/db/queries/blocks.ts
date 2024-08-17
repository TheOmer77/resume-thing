import { eq, isNotNull, or, SQL, sql } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { block } from '@/db/schema';
import { jsonBuildObject } from '@/lib/drizzle';
import { queryMap } from '@/constants/queries/blocks';
import type { BlockData } from '@/types/blocks';

export const getBlocks = async () => {
  const where = or(...queryMap.map(({ schema }) => isNotNull(schema.blockId)));
  /** Required for contact info blocks with items to be fetched properly. */
  const groupBy = queryMap
    .reduce<PgColumn[]>((arr, { schema, properties }) => {
      return [
        ...arr,
        schema.blockId,
        ...Object.values(properties).filter(value => !(value instanceof SQL)),
      ];
    }, [])
    .flat();

  const initialQuery = db
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
    .from(block);

  const queryWithJoins = queryMap.reduce<
    ReturnType<typeof initialQuery.leftJoin>
  >((curr, { schema, childSchema }) => {
    const joinedQuery = curr.leftJoin(schema, eq(block.id, schema.blockId));
    return childSchema
      ? joinedQuery.leftJoin(childSchema, eq(block.id, childSchema.blockId))
      : joinedQuery;
  }, initialQuery);

  const result = (await queryWithJoins
    .where(where)
    .groupBy(block.id, ...groupBy)) as BlockData[];

  return result;
};
