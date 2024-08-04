import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import type { ContactInfoBlockData } from '@/types/blocks';

const icons = {
  mail: MailIcon,
  phone: PhoneIcon,
  address: MapPinIcon,
};

// TODO: Don't hardcode content
const TEMP_CONTACT_INFO_BLOCKS = [
  {
    id: 'dummy-contact',
    type: 'contactInfo',
    content: {
      items: [
        { icon: 'mail', text: 'email@domain.com' },
        { icon: 'phone', text: '(123) 456-7890' },
        { icon: 'address', text: 'Some City, NY' },
      ],
    },
  },
] satisfies ContactInfoBlockData[];

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
      {block.content.items.map(({ text, icon }, idx) => {
        const Icon = icons[icon as keyof typeof icons];
        return (
          <div
            key={`contactInfo-${idx}`}
            className='flex flex-row items-center gap-2 leading-normal'
          >
            {Icon && <Icon className='size-[1.125rem]' />}
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
};
