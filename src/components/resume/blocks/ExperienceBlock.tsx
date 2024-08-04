import type { ExperienceBlockData } from '@/types/blocks';

import { H2 } from '../headings';
import { MarkdownText } from '../MarkdownText';

// TODO: Don't hardcode content
const TEMP_EXP_BLOCKS = [
  {
    id: 'dummy-exp',
    type: 'experience',
    content: {
      title: 'Job Title',
      location: 'Company Name',
      dates: ['2015-04', '2016-04'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
    },
  },
  {
    id: 'dummy-edu',
    type: 'experience',
    content: {
      title: 'Course',
      location: 'Institution',
      dates: ['2015-04', '2016-04'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius orci a nisl suscipit, et molestie ligula semper. Cras in bibendum augue. Phasellus lacinia a turpis a ullamcorper.',
    },
  },
] satisfies ExperienceBlockData[];

type TEMP_ExperienceBlockProps = {
  TEMP_blockId: string;
};

export const ExperienceBlock = ({
  TEMP_blockId,
}: TEMP_ExperienceBlockProps) => {
  const block = TEMP_EXP_BLOCKS.find(({ id }) => id === TEMP_blockId);
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
