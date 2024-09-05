import {
  and,
  asc,
  desc,
  eq,
  isNotNull,
  isNull,
  or,
  SQL,
  sql,
} from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { block } from '@/db/schema';
import { jsonBuildObject } from '@/lib/drizzle';
import { queryMap } from '@/constants/queries/block';
import type { BlockData } from '@/types/blocks';

const blockContentWhere = or(
  ...queryMap.map(({ schema }) => isNotNull(schema.blockId))
);
/** Required for child schemas to be fetched properly. */
const groupBy = queryMap
    .reduce<PgColumn[]>((arr, { schema, properties }) => {
      return [
        ...arr,
        schema.blockId,
        ...Object.values(properties).filter(value => !(value instanceof SQL)),
      ];
    }, [])
    .flat(),
  orderBy = [
    isNull(block.order), // Blocks without order are last
    desc(block.inHeaderRow),
    asc(block.inSecondaryCol),
    asc(block.order),
  ];

export const getBlocks = async ({ resumeId }: { resumeId?: string } = {}) => {
  const initialQuery = db
    .select({
      id: block.id,
      resumeId: block.resumeId,
      order: block.order,
      inHeaderRow: block.inHeaderRow,
      inSecondaryCol: block.inSecondaryCol,
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
    .where(
      resumeId
        ? and(blockContentWhere, eq(block.resumeId, resumeId))
        : blockContentWhere
    )
    .groupBy(block.id, ...groupBy)
    .orderBy(...orderBy)) as BlockData[];

  return result;
};
