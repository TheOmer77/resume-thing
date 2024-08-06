import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';

import { cn } from '@/lib/utils';
import { resumeBlocks } from '@/constants/resume';
import type { ContactInfoBlockData } from '@/types/blocks';

import type { BlockProps } from './types';

const icons = {
  mail: MailIcon,
  phone: PhoneIcon,
  address: MapPinIcon,
  linkedin: SiLinkedin,
  github: SiGithub,
};

export const ContactInfoBlock = ({ blockId }: BlockProps) => {
  const block = resumeBlocks.find(
    ({ id, type }) => id === blockId && type === 'contactInfo'
  ) as ContactInfoBlockData | undefined;
  if (!block) return null;

  return (
    <div
      className={cn(
        block.content.orientation === 'horizontal' &&
          'flex flex-row flex-wrap gap-x-4 gap-y-1'
      )}
    >
      {block.content.items.map(({ text, icon, url }, idx) => {
        const Icon = icons[icon as keyof typeof icons];
        const Comp = url ? 'a' : 'span';
        return (
          <Comp
            key={`contactInfo-${idx}`}
            className='flex flex-row items-center gap-2'
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
