import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { Resume } from '@/db/schema';

export const ResumeListItem = ({ resume }: { resume: Resume }) => (
  <li className='w-full'>
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
  </li>
);
