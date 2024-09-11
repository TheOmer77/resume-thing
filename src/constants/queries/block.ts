import { asc, type SQL } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

import {
  blockContentContact,
  blockContentContactItem,
  blockContentExperience,
  blockContentSection,
  blockContentSectionChild,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import { arrayAgg, jsonAgg, jsonBuildObject } from '@/lib/drizzle';
import type { BlockType } from '@/types/blocks';

type SchemaColumn<TSchema extends PgTable> = keyof TSchema['_']['columns'];
type QueryMapItem<TSchema extends PgTable> = {
  schema: TSchema;
  childSchema?: PgTable;
  type: BlockType;
  properties: Partial<
    Record<
      SchemaColumn<TSchema> | (NonNullable<unknown> & string),
      TSchema['_']['columns'][SchemaColumn<TSchema>] | SQL<unknown>
    >
  >;
};

export const queryMap = [
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
    childSchema: blockContentContactItem,
    type: 'contactInfo',
    properties: {
      orientation: blockContentContact.orientation,
      items: jsonAgg(
        jsonBuildObject({
          type: blockContentContactItem.type,
          text: blockContentContactItem.text,
          url: blockContentContactItem.url,
        }),
        asc(blockContentContactItem.order)
      ),
    },
  } satisfies QueryMapItem<typeof blockContentContact>,
  {
    schema: blockContentSection,
    childSchema: blockContentSectionChild,
    type: 'section',
    properties: {
      title: blockContentSection.title,
      children: arrayAgg(
        blockContentSectionChild.childId,
        asc(blockContentSectionChild.order)
      ),
    },
  } satisfies QueryMapItem<typeof blockContentSection>,
];
