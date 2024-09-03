import { notFound } from 'next/navigation';

import { Header } from '@/components/layout/Header';
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton';
import { PDFViewer } from '@/components/pdf/PDFViewer';
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
