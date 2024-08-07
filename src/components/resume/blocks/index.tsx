import { resumeBlocks } from '@/constants/resume';

import { TextBlock } from './TextBlock';
import { TitleBlock } from './TitleBlock';
import { ContactInfoBlock } from './ContactInfoBlock';
import { ExperienceBlock } from './ExperienceBlock';
import { SectionBlock } from './SectionBlock';
import type { BlockProps } from './types';

export const Block = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(({ id }) => id === blockId);
  if (!block) return null;

  switch (block.type) {
    case 'text':
      return <TextBlock key={blockId} blockId={blockId} />;
    case 'title':
      return <TitleBlock key={blockId} blockId={blockId} />;
    case 'contactInfo':
      return <ContactInfoBlock key={blockId} blockId={blockId} />;
    case 'experience':
      return <ExperienceBlock key={blockId} blockId={blockId} />;
    case 'section':
      return <SectionBlock key={blockId} blockId={blockId} />;

    default:
      return null;
  }
};
