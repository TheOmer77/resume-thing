import { PDFDownloadButton } from './PDFDownloadButton';

export const Header = () => (
  <header className='fixed top-0 z-50 w-full bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60'>
    <div className='container flex h-16 max-w-screen-2xl items-center'>
      <div className='mr-4 flex items-center text-2xl font-extrabold tracking-tight text-primary lg:me-6'>
        PDF Thing
      </div>
      <nav className='flex grow items-center justify-end'>
        <PDFDownloadButton />
      </nav>
    </div>
  </header>
);
