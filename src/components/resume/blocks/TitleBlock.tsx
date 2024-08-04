import { resumeBlocks } from '@/constants/resume/blocks';
import type { TitleBlockData } from '@/types/blocks';

import type { BlockProps } from './types';

export const TitleBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'title'
  ) as TitleBlockData | undefined;
  if (!block) return null;

  return (
    <div className='space-y-2'>
      <h1 className='text-secondary-heading text-title not-prose font-extrabold tracking-tight'>
        {block.content.title}
      </h1>
      <p className='prose-base leading-none'>{block.content.subtitle}</p>
    </div>
  );
};
