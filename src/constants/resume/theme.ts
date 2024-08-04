import type { Config } from 'tailwindcss';
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from 'tailwindcss/types/config';

/** https://palette-generator-thing.vercel.app/?primary=3858aa&neutral=neutral20 */
const resumeColors = {
  white: '#ffffff',
  primary: '#172959',
  neutral: {
    '100': '#e9ebf1',
    '200': '#cad1de',
    '300': '#abb5c8',
    '400': '#8d98b0',
    '500': '#717c94',
    '600': '#576176',
    '700': '#3e4758',
    '800': '#272d39',
    '900': '#10141b',
  },
} satisfies ResolvableTo<RecursiveKeyValuePair>;

const resumeTypography = {
  DEFAULT: {
    css: {
      '--tw-prose-body': resumeColors.neutral[700],
      '--tw-prose-headings': resumeColors.neutral[900],
      '--tw-prose-lead': resumeColors.neutral[700],
      '--tw-prose-links': resumeColors.neutral[900],
      '--tw-prose-bold': resumeColors.neutral[900],
      '--tw-prose-counters': resumeColors.neutral[500],
      '--tw-prose-bullets': resumeColors.neutral[300],
      '--tw-prose-captions': resumeColors.neutral[500],
      '--tw-prose-code': resumeColors.neutral[900],
      '--tw-prose-invert-body': resumeColors.neutral[300],
      '--tw-prose-invert-headings': resumeColors.white,
      '--tw-prose-invert-lead': resumeColors.neutral[300],
      '--tw-prose-invert-links': resumeColors.white,
      '--tw-prose-invert-bold': resumeColors.white,
      '--tw-prose-invert-counters': resumeColors.neutral[400],
      '--tw-prose-invert-bullets': resumeColors.neutral[600],
      '--tw-prose-invert-captions': resumeColors.neutral[400],
    },
  },
};

export const resumeTheme = {
  extend: {
    colors: resumeColors,
    fontFamily: { sans: 'Inter, sans-serif' },
    fontSize: { title: ['2.5rem', '2.5rem'] },
    spacing: {
      'page-margin': '0.4in',
      'secondary-column-width': '3in',
    },
    typography: resumeTypography,
  },
} satisfies Config['theme'];
