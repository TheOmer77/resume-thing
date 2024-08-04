import type { TitleBlockData } from '@/types/blocks';

// TODO: Don't hardcode content
const TEMP_TITLE_BLOCKS = [
  {
    id: 'dummy-title',
    type: 'title',
    content: {
      title: 'Name Lastname',
      subtitle: 'Job Title',
    },
  },
] satisfies TitleBlockData[];

type TEMP_TitleBlockProps = {
  TEMP_blockId: string;
};

export const TitleBlock = ({ TEMP_blockId }: TEMP_TitleBlockProps) => {
  const block = TEMP_TITLE_BLOCKS.find(({ id }) => id === TEMP_blockId);
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
