import type { PDFMargin } from 'puppeteer-core';

export const NO_MARGINS = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
} satisfies PDFMargin;
