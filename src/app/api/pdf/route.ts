import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import tailwindTypography from '@tailwindcss/typography';

import { ExampleContent } from '@/components/example';
import { generateTailwindCss } from '@/lib/generateTailwindCss';
import { EXAMPLE_MARGINS } from '@/constants/margins';

export const GET = async () => {
  // Next.js complains when you import 'react-dom/server' directly
  const { renderToStaticMarkup } = await import('react-dom/server');

  const html = renderToStaticMarkup(ExampleContent());
  const css = await generateTailwindCss(
    html,
    "@import url('https://rsms.me/inter/inter.css');",
    {
      plugins: [tailwindTypography],
      theme: { extend: { fontFamily: { sans: 'Inter, sans-serif' } } },
    }
  );
  const dataUrl = `data:text/html,${encodeURIComponent(
    `<style>${css}</style>`
  )}${encodeURIComponent(html)}`;

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
