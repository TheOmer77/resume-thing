import { resumeBlocks } from '@/constants/resume/blocks';
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
      {/* TODO: Section title */}
      {block.content.children.map(childId => getBlockById(childId))}
    </div>
  );
};
