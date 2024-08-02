import { Header } from '@/components/layout/Header';
import { PDFViewer } from '@/components/PDFViewer';

const Page = () => (
  <div className='flex min-h-dvh w-full flex-col items-center justify-center'>
    <Header />
    <PDFViewer file='/api/pdf' />
  </div>
);

export default Page;
