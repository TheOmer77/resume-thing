import { resumeBlocks } from '@/constants/resume/blocks';
import type { ExperienceBlockData } from '@/types/blocks';

import { MarkdownText } from '../primitives';
import type { BlockProps } from './types';

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

export const ExperienceBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'experience'
  ) as ExperienceBlockData | undefined;
  if (!block) return null;

  return (
    <div>
      <div className='mb-1 flex flex-row items-center'>
        <h3 className='mb-0 flex-1'>
          {[block.content.title, block.content.location]
            .filter(Boolean)
            .join(' – ')}
        </h3>
        <span className='caption flex-shrink-0'>
          {block.content.dates
            .map(date => (date === null ? 'Present' : formatDate(date)))
            .join(' – ')}
        </span>
      </div>
      <MarkdownText className='[&>p:first-of-type]:mt-0'>
        {block.content.text}
      </MarkdownText>
    </div>
  );
};
