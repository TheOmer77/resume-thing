'use client';

import { useCallback } from 'react';
import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { usePDFFile } from '@/hooks/usePDFFile';

export const PDFDownloadButton = () => {
  const file = usePDFFile();

  const handleClick = useCallback(() => {
    if (!file) return;

    const a = document.createElement('a');
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = 'thing.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }, [file]);

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
