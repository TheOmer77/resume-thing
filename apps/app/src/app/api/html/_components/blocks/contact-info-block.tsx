import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';

import { cn } from '@/lib/cn';
import type { ContactInfoBlockData } from '@/types/blocks';

import { useBlocks } from '../../context';
import type { BlockProps } from './types';

const typeIcons = {
  mail: MailIcon,
  phone: PhoneIcon,
  location: MapPinIcon,
  linkedin: SiLinkedin,
  github: SiGithub,
};

export const ContactInfoBlock = ({ blockId }: BlockProps) => {
  const resumeBlocks = useBlocks();
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
      {block.content.items.map(({ text, type, url }, idx) => {
        const Icon = typeIcons[type as keyof typeof typeIcons];
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
