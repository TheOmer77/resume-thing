import type {
  BlockBase,
  ContactInfoBlockContent,
  ContactInfoItem,
  ExperienceBlockContent,
  SectionBlockContent,
  TextBlockContent,
  TitleBlockContent,
} from '@/db/schema';

export type TitleBlockData = BlockBase & {
  type: 'title';
  content: Omit<TitleBlockContent, 'blockId'>;
};

export type TextBlockData = BlockBase & {
  type: 'text';
  content: Omit<TextBlockContent, 'blockId'>;
};

export type ExperienceBlockData = BlockBase & {
  type: 'experience';
  content: Omit<ExperienceBlockContent, 'blockId'>;
};

export type ContactInfoBlockData = BlockBase & {
  type: 'contactInfo';
  content: Omit<ContactInfoBlockContent, 'blockId'> & {
    items: Omit<ContactInfoItem, 'blockId' | 'order'>[];
  };
};

export type SectionBlockData = BlockBase & {
  type: 'section';
  content: Omit<SectionBlockContent, 'blockId'> & { children: string[] };
};

export type BlockData =
  | SectionBlockData
  | TextBlockData
  | TitleBlockData
  | ContactInfoBlockData
  | ExperienceBlockData;

export type BlockType = BlockData['type'];
