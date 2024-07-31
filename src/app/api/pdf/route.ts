import puppeteer, { type PDFMargin } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

import { ExampleContent } from '@/components/example';

const EXAMPLE_MARGINS = {
  bottom: '0.4in',
  left: '0.4in',
  right: '0.4in',
  top: '0.4in',
} satisfies PDFMargin;

export const GET = async () => {
  // Next.js complains when you import 'react-dom/server' directly
  const { renderToStaticMarkup } = await import('react-dom/server');

  const html = renderToStaticMarkup(ExampleContent());
  const dataUrl = `data:text/html,${encodeURIComponent(html)}`;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  console.log('DEBUG | browser.newPage passed');
  await page.goto(dataUrl, { waitUntil: 'domcontentloaded' });
  console.log('DEBUG | page.goTo passed');

  const pdf = await page.pdf({
    format: 'A4',
    margin: EXAMPLE_MARGINS,
  });
  console.log('DEBUG | page.pdf passed');
  return new Response(pdf, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="thing.pdf"',
    },
  });
};
