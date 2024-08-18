import type { PropsWithChildren } from 'react';

const ResumeHtmlLayout = ({ children }: PropsWithChildren) => (
  <html>
    <body>{children}</body>
  </html>
);

export default ResumeHtmlLayout;
