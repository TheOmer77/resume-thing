import { resumeBlocks } from '@/constants/resume/blocks';

import { TextBlock } from './TextBlock';
import { TitleBlock } from './TitleBlock';
import { ContactInfoBlock } from './ContactInfoBlock';
import { ExperienceBlock } from './ExperienceBlock';
import { SectionBlock } from './SectionBlock';

export const getBlockById = (blockId: string) => {
  const block = resumeBlocks.find(({ id }) => id === blockId);
  if (!block) return null;

  switch (block.type) {
    case 'text':
      return <TextBlock blockId={blockId} />;
    case 'title':
      return <TitleBlock blockId={blockId} />;
    case 'contactInfo':
      return <ContactInfoBlock blockId={blockId} />;
    case 'experience':
      return <ExperienceBlock blockId={blockId} />;
    case 'section':
      return <SectionBlock blockId={blockId} />;

    default:
      return null;
  }
};
