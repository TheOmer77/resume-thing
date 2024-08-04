import { cn } from '@/lib/utils';
import { resumeBlocks } from '@/constants/resume/blocks';

import { MarkdownText } from '../MarkdownText';

type TextBlockProps = {
  blockId: string;
};

export const TextBlock = ({ blockId }: TextBlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'text'
  );
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
