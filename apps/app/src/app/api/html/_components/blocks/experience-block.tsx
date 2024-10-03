import type { ExperienceBlockData } from '@/types/blocks';

import { MarkdownText } from '../primitives';
import { useBlocks } from '../../context';
import type { BlockProps } from './types';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

export const ExperienceBlock = ({ blockId }: BlockProps) => {
  const resumeBlocks = useBlocks();
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'experience'
  ) as ExperienceBlockData | undefined;
  if (!block) return null;

  return (
    <>
      <div className='mb-1 flex flex-row items-center'>
        <h3 className='my-0 flex-1'>
          {[block.content.title, block.content.location]
            .filter(Boolean)
            .join(' – ')}
        </h3>
        <span className='caption flex-shrink-0'>
          {`${formatDate(block.content.startDate)} – ${
            block.content.endDate === null ||
            typeof block.content.endDate === 'undefined'
              ? 'Present'
              : formatDate(block.content.endDate)
          }`}
        </span>
      </div>
      <MarkdownText className='[&>p:first-of-type]:mt-0'>
        {block.content.text}
      </MarkdownText>
    </>
  );
};
