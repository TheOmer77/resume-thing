import { resumeBlocks } from '@/constants/resume';
import type { SectionBlockData } from '@/types/blocks';

import { getBlockById } from './getBlockById';
import type { BlockProps } from './types';

export const SectionBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'section'
  ) as SectionBlockData | undefined;
  if (!block) return null;

  return (
    <div>
      <h2>{block.content.title}</h2>
      {(block.content.children || []).map(childId => getBlockById(childId))}
    </div>
  );
};
