import { Hono, type Context } from 'hono';
import puppeteer from 'puppeteer-core';
import tailwindTypography from '@tailwindcss/typography';
import { mkdir, writeFile } from 'fs/promises';
import type { BlankEnv, BlankInput } from 'hono/types';

import { extractHtmlBodyContent } from '@/lib/extractHtmlContent';
import { generateTailwindCss } from '@/lib/generateTailwindCss';
import { interCdn } from '@/constants/inter';
import { resumeTheme } from '@/constants/resume';

/** Weird hack to fix some complex Tailwind classnames. */
const fixTwClasses = (html: string) =>
  html.replace(/class="([^"]*?)"/g, (_, classNames: string) => {
    const modifiedClassNames = classNames
      .replace(/&amp;/g, '&')
      .replace(/&gt;/, '>');
    return `class="${modifiedClassNames}"`;
  });

/** Temporary hack: Render a page in a separate Next.js route. */
const getHtml = async (ctx: Context<BlankEnv, '/:id', BlankInput>) => {
  const res = await fetch(
      `${ctx.req.header('x-forwarded-proto')}://${ctx.req.header(
        'x-forwarded-host'
      )}/api/html/${ctx.req.param('id')}`
    ),
    fullHtml = await res.text();
  const bodyContent = fixTwClasses(extractHtmlBodyContent(fullHtml));
  const css = await generateTailwindCss(
    bodyContent,
    { plugins: [tailwindTypography], theme: resumeTheme },
    '@page{margin:0;}'
  );

  return `<!doctype html><html><head>${interCdn}<style>${
    css
  }</style></head><body>${bodyContent}</body></html>`;
};

export const pdfRouter = new Hono().get('/:id', async ctx => {
  const [html, page] = await Promise.all([
    await getHtml(ctx),
    await (
      await puppeteer.launch({
        args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu'],
        executablePath: '/usr/bin/chromium-browser',
      })
    ).newPage(),
  ]);

  if (process.env.PDF_DEBUG?.toLowerCase() === 'true') {
    await mkdir('./debug').catch(error => {
      if (!('code' in error && error.code === 'EEXIST')) throw error;
    });
    await writeFile('./debug/index.html', html);
  }

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });
  await page.browser().close();

  return new Response(pdf, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="thing.pdf"',
    },
  });
});
