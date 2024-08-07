import { resumeBlocks } from '@/constants/resume';
import type { TitleBlockData } from '@/types/blocks';

import type { BlockProps } from './types';

export const TitleBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'title'
  ) as TitleBlockData | undefined;
  if (!block) return null;

  return (
    <div>
      <h1>{block.content.title}</h1>
      <p className='lead mb-4 mt-0'>{block.content.subtitle}</p>
    </div>
  );
};
