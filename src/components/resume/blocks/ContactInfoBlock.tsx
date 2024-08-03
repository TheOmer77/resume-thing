import { MailIcon, MapPinIcon, PhoneIcon, type Icon } from 'lucide-react';

// TODO: Don't hardcode content
const TEMP_CONTACT_INFO_BLOCKS = [
  {
    id: 'dummy-contact',
    content: {
      items: [
        { icon: MailIcon, content: 'email@domain.com' },
        { icon: PhoneIcon, content: '(123) 456-7890' },
        { icon: MapPinIcon, content: 'Some City, NY' },
      ],
    },
  },
] satisfies {
  id: string;
  content: { items: { icon: typeof Icon; content: string }[] };
}[];

type TEMP_ContactInfoBlockProps = {
  TEMP_blockId: string;
};

export const ContactInfoBlock = ({
  TEMP_blockId,
}: TEMP_ContactInfoBlockProps) => {
  const block = TEMP_CONTACT_INFO_BLOCKS.find(({ id }) => id === TEMP_blockId);
  if (!block) return null;

  return (
    <div className='pb-6'>
      {block.content.items.map(({ content, icon: Icon }, idx) => (
        <div
          key={`contactInfo-${idx}`}
          className='flex flex-row items-center gap-2 leading-normal'
        >
          <Icon className='size-[1.125rem]' />
          <span>{content}</span>
        </div>
      ))}
    </div>
  );
};
