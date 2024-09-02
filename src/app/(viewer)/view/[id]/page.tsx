import { Header } from '@/components/layout/Header';
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton';
import { PDFViewer } from '@/components/pdf/PDFViewer';

type ResumeViewPageProps = { params: { id: string } };

const ResumeViewPage = ({ params: { id } }: ResumeViewPageProps) => (
  <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
    <Header title='View resume'>
      <PDFDownloadButton resumeId={id} />
    </Header>
    <PDFViewer resumeId={id} />
  </div>
);

export default ResumeViewPage;
