import { Header } from '@/components/layout/Header';
import { PDFDownloadButton } from '@/components/pdf/PDFDownloadButton';
import { PDFViewer } from '@/components/pdf/PDFViewer';

const Page = () => (
  <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
    <Header>
      <PDFDownloadButton />
    </Header>
    <PDFViewer />
  </div>
);

export default Page;
