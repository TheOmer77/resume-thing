import { Hono } from 'hono';
import puppeteer from 'puppeteer-core';
import tailwindTypography from '@tailwindcss/typography';
import { mkdir, writeFile } from 'fs/promises';

import { ResumeRoot } from '@/components/resume';
import { generateTailwindCss } from '@/lib/generateTailwindCss';
import { interCdn } from '@/constants/inter';
import { resumeTheme } from '@/constants/resume';

/** Weird hack to fix some complex Tailwind classnames. */
const fixTwClasses = (html: string) => {
  return html.replace(/class="([^"]*?)"/g, (_, classNames: string) => {
    const modifiedClassNames = classNames
      .replace(/&amp;/g, '&')
      .replace(/&gt;/, '>');
    return `class="${modifiedClassNames}"`;
  });
};

export const pdfRouter = new Hono().get('/', async () => {
  // Next.js complains when you import 'react-dom/server' directly
  const { renderToStaticMarkup } = await import('react-dom/server');

  const html = `${interCdn}${fixTwClasses(renderToStaticMarkup(<ResumeRoot />))}`;
  const css = await generateTailwindCss(
    html,
    { plugins: [tailwindTypography], theme: resumeTheme },
    '@page{margin:0;}'
  );

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
    args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu'],
    executablePath: '/usr/bin/chromium-browser',
  });
  const page = await browser.newPage();
  await page.setContent(`<style>${css}</style>${html}`, {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  return new Response(pdf, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="thing.pdf"',
    },
  });
});
