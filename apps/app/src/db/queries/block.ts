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
  type TablesRelationalConfig,
} from 'drizzle-orm';
import type {
  PgColumn,
  PgQueryResultHKT,
  PgTransaction,
} from 'drizzle-orm/pg-core';

import { db } from '@/db';
import {
  block,
  blockContentContact,
  blockContentContactItem,
  blockContentExperience,
  blockContentSection,
  blockContentSectionChild,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import { jsonBuildObject } from '@/lib/drizzle';
import { queryMap } from '@/constants/queries/block';
import type {
  BlockData,
  ContactInfoBlockData,
  ExperienceBlockData,
  SectionBlockData,
  TextBlockData,
  TitleBlockData,
} from '@/types/blocks';

const blockContentWhere = or(
  ...queryMap.map(({ schema }) => isNotNull(schema.blockId))
);
/** Required for child schemas to be fetched properly. */
const groupBy = queryMap
    .reduce<
      PgColumn[]
    >((arr, { schema, properties }) => [...arr, schema.blockId, ...Object.values(properties).filter(value => !(value instanceof SQL))], [])
    .flat(),
  orderBy = [
    isNull(block.order), // Blocks without order are last
    desc(block.inHeaderRow),
    asc(block.inSecondaryCol),
    asc(block.order),
  ];

export const getBlocks = async <
  TQueryResult extends PgQueryResultHKT,
  TFullSchema extends Record<string, unknown> = Record<string, never>,
  TSchema extends TablesRelationalConfig = Record<string, never>,
>(
  resumeId?: string,
  transaction?: PgTransaction<TQueryResult, TFullSchema, TSchema>
) => {
  const initialQuery = (transaction || db)
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

export const insertBlocks = async <
  TQueryResult extends PgQueryResultHKT,
  TFullSchema extends Record<string, unknown> = Record<string, never>,
  TSchema extends TablesRelationalConfig = Record<string, never>,
>(
  blocks: BlockData[],
  transaction?: PgTransaction<TQueryResult, TFullSchema, TSchema>
) => {
  const blocksByType = blocks.reduce<{
    title: TitleBlockData[];
    text: TextBlockData[];
    experience: ExperienceBlockData[];
    contactInfo: ContactInfoBlockData[];
    section: SectionBlockData[];
  }>(
    (obj, curr) => ({
      ...obj,
      [curr.type]: [...obj[curr.type], curr],
    }),
    { contactInfo: [], experience: [], section: [], text: [], title: [] }
  );

  return await (transaction || db).transaction(async tx => {
    try {
      const newBlocks = await tx.insert(block).values(blocks).returning();

      await Promise.all([
        tx.insert(blockContentTitle).values(
          blocksByType.title.map(({ content, id }) => ({
            blockId: id,
            ...content,
          }))
        ),

        tx.insert(blockContentText).values(
          blocksByType.text.map(({ content, id }) => ({
            blockId: id,
            ...content,
          }))
        ),

        tx.insert(blockContentExperience).values(
          blocksByType.experience.map(({ content, id }) => ({
            blockId: id,
            ...content,
          }))
        ),

        tx.insert(blockContentContact).values(
          blocksByType.contactInfo.map(({ content, id }) => ({
            blockId: id,
            orientation: content.orientation,
          }))
        ),
        tx.insert(blockContentContactItem).values(
          blocksByType.contactInfo
            .map(({ content, id }) =>
              content.items.map((value, order) => ({
                blockId: id,
                order,
                ...value,
              }))
            )
            .flat()
        ),

        tx.insert(blockContentSection).values(
          blocksByType.section.map(({ content, id }) => ({
            blockId: id,
            title: content.title,
          }))
        ),
        tx.insert(blockContentSectionChild).values(
          blocksByType.section
            .map(({ content, id }) =>
              content.children.map((value, order) => ({
                blockId: id,
                order,
                childId: value,
              }))
            )
            .flat()
        ),
      ]);

      return newBlocks.map(({ id }) => id);
    } catch (error) {
      tx.rollback();
    }
  });
};
