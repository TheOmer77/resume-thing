import { notFound } from 'next/navigation';

import { Header } from '@/components/layout/header';
import { PDFDownloadButton } from '@/components/pdf/pdf-download-button';
import { PDFViewer } from '@/components/pdf/pdf-viewer';
import { getResumeById } from '@/db/queries/resume';

type ResumeViewPageProps = { params: { id: string } };

const ResumeViewPage = async ({ params: { id } }: ResumeViewPageProps) => {
  const resume = await getResumeById(id);
  if (!resume) notFound();

  return (
    <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
      <Header title={resume.title}>
        <PDFDownloadButton resumeId={id} title={resume.title} />
      </Header>
      <PDFViewer resumeId={id} />
    </div>
  );
};

export default ResumeViewPage;
