import { resumeBlocks } from '@/constants/resume/blocks';
import type { ExperienceBlockData } from '@/types/blocks';

import { H2 } from '../headings';
import { MarkdownText } from '../MarkdownText';

type ExperienceBlockProps = {
  blockId: string;
};

export const ExperienceBlock = ({ blockId: blockId }: ExperienceBlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'experience'
  ) as ExperienceBlockData | undefined;
  if (!block) return null;

  return (
    <div>
      <div className='mb-1 flex flex-row items-center'>
        <H2 className='mb-0 flex-1'>
          {[block.content.title, block.content.location]
            .filter(Boolean)
            .join(' – ')}
        </H2>
        <span className='flex-shrink-0 text-xs text-muted'>
          {block.content.dates
            .map(date =>
              date === null
                ? 'Present'
                : new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
            )
            .join(' – ')}
        </span>
      </div>
      <MarkdownText className='leading-normal [&>p:first-of-type]:mt-0'>
        {block.content.text}
      </MarkdownText>
    </div>
  );
};
