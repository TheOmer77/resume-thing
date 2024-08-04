import { resumeBlocks } from '@/constants/resume/blocks';

type TitleBlockProps = { blockId: string };

export const TitleBlock = ({ blockId }: TitleBlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'title'
  );
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
