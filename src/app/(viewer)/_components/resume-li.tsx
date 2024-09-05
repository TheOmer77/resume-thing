'use client';

import Link from 'next/link';
import { MoreVerticalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useConfirm } from '@/hooks/useConfirm';
import type { Resume } from '@/db/schema';

export const ResumeListItem = ({ resume }: { resume: Resume }) => {
  const [DeleteDialog, confirmDelete] = useConfirm({
    title: 'Delete this resume?',
    message: `The resume "${resume.title}" will be deleted.`,
    confirmLabel: 'Delete',
    destructive: true,
  });

  const handleDelete = async () => {
    const confirmed = await confirmDelete();
    if (!confirmed) return;

    // TODO: Send request to delete this resume
  };

  return (
    <li className='relative w-full'>
      <Button
        asChild
        variant='flat'
        className='h-auto w-full flex-col items-start py-2'
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
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog />
    </li>
  );
};
