import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { Provider } from '@/components/providers';
import '@/styles/index.css';

const font = Figtree({
  subsets: ['latin'],
  variable: '--font-family',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'Resume Thing',
  description: 'This description will be changed later',
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <Provider>
    <html lang='en' className={font.variable}>
      <body>{children}</body>
    </html>
  </Provider>
);

export default RootLayout;
