'use client';

import Link from 'next/link';
import { MoreVerticalIcon } from 'lucide-react';
import { format } from 'timeago.js';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/useConfirm';
import { useModal } from '@/hooks/useModal';
import { useResumeById } from '@/hooks/useResumeById';
import type { Resume } from '@/db/schema';
import { cn } from '@/lib/cn';

import { ResumeRenameDialog } from './resume-rename-dialog';

export const ResumeListItem = ({ resume }: { resume: Resume }) => {
  const { deleteResume, deleteResumePending, duplicateResume } = useResumeById(
    resume.id,
    // No need to get data here, its already passed as a prop
    { enabled: false }
  );
  const [confirm] = useConfirm();
  const { openModal } = useModal();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete this resume?',
      description: `The resume "${resume.title}" will be deleted.`,
      confirmLabel: 'Delete',
      destructive: true,
    });
    if (!confirmed) return;

    deleteResume();
  };

  return (
    <li
      className={cn(
        'relative w-full',
        deleteResumePending && 'pointer-events-none opacity-50'
      )}
    >
      <Button
        asChild
        variant='flat'
        className='h-auto w-full flex-col items-start py-2 font-normal'
      >
        <Link href={`/view/${resume.id}`}>
          <span className='text-lg font-semibold'>{resume.title}</span>
          <span className='text-sm text-muted-foreground'>
            {`${
              resume.createdAt.valueOf() === resume.updatedAt.valueOf()
                ? 'Created'
                : 'Last updated'
            } ${format(resume.updatedAt, 'en_US')}`}
          </span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='flat'
            size='icon'
            className='absolute end-2 top-1/2 -translate-y-1/2'
          >
            <MoreVerticalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => duplicateResume()}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal(`resume-rename-${resume.id}`)}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ResumeRenameDialog key={resume.title} resume={resume} />
    </li>
  );
};
