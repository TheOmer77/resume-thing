'use client';

import { useEffect, useState, type ComponentPropsWithoutRef } from 'react';
import { pdfjs, Document, Page, type DocumentProps } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { Spinner } from '@/components/ui/spinner';
import { usePDFFile } from '@/hooks/usePDFFile';
import { cn } from '@/lib/cn';
import type { PDFViewerProps } from '@/types/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const options = { cMapUrl: '/cmaps/', standardFontDataUrl: '/standard_fonts/' };
const maxWidth = 800;

type ClientPDFViewerProps = PDFViewerProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const loadingSpinner = <Spinner className='size-8' key='loading-spinner' />;

export const ClientPDFViewer = ({
  resumeId,
  className,
  ...props
}: ClientPDFViewerProps) => {
  const file = usePDFFile(resumeId);

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onDocumentLoadSuccess: DocumentProps['onLoadSuccess'] = ({
    numPages,
  }) => setNumPages(numPages);

  useEffect(() => {
    if (!containerRef) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });

    resizeObserver.observe(containerRef);
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  return (
    <div
      {...props}
      ref={setContainerRef}
      className={cn(
        'bg-muted/40 flex min-h-dvh w-full flex-col pb-4 pt-[4.5rem]',
        className
      )}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        className='flex grow flex-col items-center justify-center gap-4 selection:bg-slate-500/50 selection:text-transparent'
        noData={loadingSpinner}
        loading={loadingSpinner}
      >
        {[...Array(numPages).keys()].map(index => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className='shadow-md'
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
          />
        ))}
      </Document>
    </div>
  );
};
