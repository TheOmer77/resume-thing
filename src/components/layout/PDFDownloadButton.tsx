import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const PDFDownloadButton = () => (
  <Button className='size-10 p-0 sm:w-auto sm:px-4 sm:py-2' asChild>
    <a href='/api/pdf' download='thing.pdf'>
      <DownloadIcon className='size-4 sm:me-2' />
      <span className='hidden sm:inline'>Download</span>
    </a>
  </Button>
);
