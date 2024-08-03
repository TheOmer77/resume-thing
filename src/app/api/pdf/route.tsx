import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import tailwindTypography from '@tailwindcss/typography';
import { mkdir, writeFile } from 'fs/promises';

import { ExampleContent } from '@/components/example';
import { generateTailwindCss } from '@/lib/generateTailwindCss';
import { EXAMPLE_MARGINS } from '@/constants/margins';
import { interCss } from '@/constants/inter';

/** Weird hack to fix some complex Tailwind classnames. */
const fixTwClasses = (html: string) => {
  return html.replace(/class="([^"]*?)"/g, (_, classNames: string) => {
    const modifiedClassNames = classNames
      .replace(/&amp;/g, '&')
      .replace(/&gt;/, '>');
    return `class="${modifiedClassNames}"`;
  });
};

export const GET = async () => {
  // Next.js complains when you import 'react-dom/server' directly
  const { renderToStaticMarkup } = await import('react-dom/server');

  const html = fixTwClasses(renderToStaticMarkup(<ExampleContent />));
  const css = await generateTailwindCss(html, interCss, {
    plugins: [tailwindTypography],
    theme: {
      extend: {
        fontFamily: { sans: 'Inter, sans-serif' },
        typography: {
          DEFAULT: {
            css: {
              pre: {
                'print-color-adjust': 'exact !important',
                '-webkit-print-color-adjust': 'exact !important',
              },
            },
          },
        },
      },
    },
  });

  if (process.env.PDF_DEBUG?.toLowerCase() === 'true') {
    await mkdir('./debug').catch(error => {
      if (!('code' in error && error.code === 'EEXIST')) throw error;
    });
    await writeFile(
      './debug/index.html',
      `<link rel="stylesheet" href="./index.css">${html}`
    );
    await writeFile('./debug/index.css', css);
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.setContent(`<style>${css}</style>${html}`);
  const pdf = await page.pdf({ format: 'A4', margin: EXAMPLE_MARGINS });
  await browser.close();

  return new Response(pdf, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="thing.pdf"',
    },
  });
};
