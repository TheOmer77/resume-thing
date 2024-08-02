import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { QueryProvider } from '@/components/providers/QueryProvider';
import '@/styles/index.css';

const font = Figtree({
  subsets: ['latin'],
  variable: '--font-family',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'PDF Thing',
  description: 'This description will be changed later',
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <QueryProvider>
    <html lang='en' className={font.variable}>
      <body>{children}</body>
    </html>
  </QueryProvider>
);

export default RootLayout;
