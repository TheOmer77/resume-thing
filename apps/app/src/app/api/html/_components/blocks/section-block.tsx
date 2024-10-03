import type { SectionBlockData } from '@/types/blocks';

import { TextBlock } from './text-block';
import { TitleBlock } from './title-block';
import { ContactInfoBlock } from './contact-info-block';
import { ExperienceBlock } from './experience-block';
import { useBlocks } from '../../context';
import type { BlockProps } from './types';

export const SectionBlock = ({ blockId }: BlockProps) => {
  const resumeBlocks = useBlocks();
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'section'
  ) as SectionBlockData | undefined;
  if (!block) return null;

  return (
    <>
      <h2>{block.content.title}</h2>
      {(block.content.children || []).map(childId => {
        const block = resumeBlocks.find(({ id }) => id === childId);
        if (!block) return null;

        switch (block.type) {
          case 'text':
            return <TextBlock key={childId} blockId={childId} />;
          case 'title':
            return <TitleBlock key={childId} blockId={childId} />;
          case 'contactInfo':
            return <ContactInfoBlock key={childId} blockId={childId} />;
          case 'experience':
            return <ExperienceBlock key={childId} blockId={childId} />;
          // Sections cannot contain other sections

          default:
            return null;
        }
      })}
    </>
  );
};
