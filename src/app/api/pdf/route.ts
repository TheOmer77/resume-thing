import puppeteer, { type PDFMargin } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const EXAMPLE_URL =
    'https://palette-generator-thing.vercel.app/?primary=1740ea&neutral=neutral30',
  EXAMPLE_MARGINS = {
    bottom: '0.4in',
    left: '0.4in',
    right: '0.4in',
    top: '0.4in',
  } satisfies PDFMargin;

export const GET = async () => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  console.log('DEBUG | browser.newPage passed');
  await page.goto(EXAMPLE_URL, { waitUntil: 'domcontentloaded' });
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
