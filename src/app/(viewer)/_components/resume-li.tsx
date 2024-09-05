import Link from 'next/link';
import { MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Resume } from '@/db/schema';

export const ResumeListItem = ({ resume }: { resume: Resume }) => (
  <li className='relative w-full'>
    <Button
      asChild
      variant='ghost'
      className='h-auto w-full flex-col items-start'
    >
      <Link href={`/view/${resume.id}`}>
        <span className='text-lg font-semibold'>{resume.title}</span>
        <span className='text-sm text-muted-foreground'>
          Last updated{' '}
          {resume.updatedAt.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </Link>
    </Button>
    <Button
      variant='ghost'
      size='icon'
      className='absolute end-2 top-1/2 -translate-y-1/2'
    >
      <MoreVerticalIcon className='size-4' />
    </Button>
  </li>
);
