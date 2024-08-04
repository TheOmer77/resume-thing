import { cn } from '@/lib/utils';
import { resumeBlocks } from '@/constants/resume/blocks';
import type { TextBlockData } from '@/types/blocks';

import { MarkdownText } from '../primitives';
import type { BlockProps } from './types';

export const TextBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'text'
  ) as TextBlockData | undefined;
  if (!block) return null;

  return (
    <MarkdownText
      className={cn(
        'leading-normal [&>p:first-of-type]:mt-0',
        block.content.lead && 'prose-base'
      )}
    >
      {block.content.text}
    </MarkdownText>
  );
};
