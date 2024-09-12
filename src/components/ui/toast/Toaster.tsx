'use client';

import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckIcon,
  InfoIcon,
} from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';
import { Toaster as Sonner } from 'sonner';

import { Spinner } from '@/components/ui/spinner';

type ToasterProps = ComponentPropsWithoutRef<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    className='toaster group'
    theme='system'
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          'toast group group-[.toaster]:flex group-[.toaster]:w-full group-[.toaster]:flex-row group-[.toaster]:items-center group-[.toaster]:gap-2 group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:bg-background group-[.toaster]:p-4 group-[.toaster]:font-sans group-[.toaster]:text-sm group-[.toaster]:text-foreground group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        icon: 'size-5 [&_svg]:size-5',
      },
    }}
    icons={{
      success: <CheckIcon />,
      info: <InfoIcon />,
      warning: <AlertTriangleIcon />,
      error: <AlertCircleIcon />,
      loading: <Spinner />,
    }}
    {...props}
  />
);
