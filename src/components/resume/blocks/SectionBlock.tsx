import { resumeBlocks } from '@/constants/resume/blocks';
import type { SectionBlockData } from '@/types/blocks';

import { H1 } from '../primitives';
import { getBlockById } from './getBlockById';
import type { BlockProps } from './types';

export const SectionBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'section'
  ) as SectionBlockData | undefined;
  if (!block) return null;

  return (
    <div>
      <H1>{block.content.title}</H1>
      {(block.content.children || []).map(childId => getBlockById(childId))}
    </div>
  );
};
