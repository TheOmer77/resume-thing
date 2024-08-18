import { useBlocks } from '@/app/api/html/context';
import { cn } from '@/lib/cn';
import type { TextBlockData } from '@/types/blocks';

import { MarkdownText } from '../primitives';
import type { BlockProps } from './types';

export const TextBlock = ({ blockId }: BlockProps) => {
  const resumeBlocks = useBlocks();
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'text'
  ) as TextBlockData | undefined;
  if (!block) return null;

  return (
    <MarkdownText
      className={cn('[&>p:first-of-type]:mt-0', block.content.lead && 'lead')}
    >
      {block.content.text}
    </MarkdownText>
  );
};
