import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

import { resumeBlocks } from '@/constants/resume/blocks';
import type { ContactInfoBlockData } from '@/types/blocks';

import type { BlockProps } from './types';

const icons = {
  mail: MailIcon,
  phone: PhoneIcon,
  address: MapPinIcon,
};

export const ContactInfoBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'contactInfo'
  ) as ContactInfoBlockData | undefined;
  if (!block) return null;

  return (
    <div className='pb-6'>
      {block.content.items.map(({ text, icon, url }, idx) => {
        const Icon = icons[icon as keyof typeof icons];
        const Comp = url ? 'a' : 'span';
        return (
          <Comp
            key={`contactInfo-${idx}`}
            className='flex flex-row items-center gap-2 no-underline'
            {...(url ? { href: url } : {})}
          >
            {Icon && <Icon className='size-[1.125rem]' />}
            <span>{text}</span>
          </Comp>
        );
      })}
    </div>
  );
};
