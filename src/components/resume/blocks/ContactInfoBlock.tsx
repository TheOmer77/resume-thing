import { Fragment } from 'react';
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
    <div className='grid grid-cols-[auto,1fr] items-center gap-x-2'>
      {block.content.items.map(({ text, icon }, idx) => {
        const Icon = icons[icon as keyof typeof icons];
        return (
          <Fragment key={`contactInfo-${idx}`}>
            {Icon && <Icon className='size-[1.125rem]' />}
            <span>{text}</span>
          </Fragment>
        );
      })}
    </div>
  );
};
