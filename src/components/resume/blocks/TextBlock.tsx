import { cn } from '@/lib/utils';
import { resumeBlocks } from '@/constants/resume/blocks';

import { MarkdownText } from '../MarkdownText';

type TEMP_TextBlockProps = {
  TEMP_blockId: string;
};

export const TextBlock = ({ TEMP_blockId }: TEMP_TextBlockProps) => {
  const block = resumeBlocks.find(({ id }) => id === TEMP_blockId);
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
