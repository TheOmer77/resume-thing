export type BlockCore = {
  id: string;
};

export type SectionBlockContent = {
  title: string;
  children: string[];
};
export type SectionBlockData = BlockCore & {
  type: 'section';
  content: SectionBlockContent;
};

export type TitleBlockContent = {
  title: string;
  subtitle?: string;
};
export type TitleBlockData = BlockCore & {
  type: 'title';
  content: TitleBlockContent;
};

export type TextBlockContent = {
  /** Text with limited markdown support - bold, italic, strikethrough, links,
   * unordered lists, ordered lists. */
  text: string;
  /** Whether or not this is lead text. */
  lead?: boolean;
};
export type TextBlockData = BlockCore & {
  type: 'text';
  content: TextBlockContent;
};

export type ContactInfoItem = {
  icon?: string;
  /** If present, this item is a link. */
  url?: string;
  text: string;
};
export type ContactInfoBlockContent = {
  orientation?: 'horizontal' | 'vertical';
  items: ContactInfoItem[];
};
export type ContactInfoBlockData = BlockCore & {
  type: 'contactInfo';
  content: ContactInfoBlockContent;
};

export type ExperienceBlockContent = {
  title: string;
  location: string;
  /** Dates in format of 'yyyy-MM'; `null` = present.  */
  dates: [string, string | null];
  /** Text with limited markdown support - bold, italic, strikethrough, links,
   * unordered lists, ordered lists. */
  text: string;
};
export type ExperienceBlockData = BlockCore & {
  type: 'experience';
  content: ExperienceBlockContent;
};

export type BlockData =
  | SectionBlockData
  | TextBlockData
  | TitleBlockData
  | ContactInfoBlockData
  | ExperienceBlockData;
