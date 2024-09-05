'use client';

import { useCallback } from 'react';
import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { usePDFFile } from '@/hooks/usePDFFile';
import type { PDFViewerProps } from '@/types/pdf';

type PDFDownloadButtonProps = PDFViewerProps & { title?: string };

export const PDFDownloadButton = ({
  resumeId,
  title = 'Resume',
}: PDFDownloadButtonProps) => {
  const file = usePDFFile(resumeId);

  const handleClick = useCallback(() => {
    if (!file) return;

    const a = document.createElement('a');
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = `${title}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [file, title]);

  if (!file) return null;
  return (
    <Button
      className='size-10 p-0 sm:w-auto sm:px-4 sm:py-2'
      onClick={handleClick}
    >
      <DownloadIcon className='size-4 sm:me-2' />
      <span className='hidden sm:inline'>Download</span>
    </Button>
  );
};
