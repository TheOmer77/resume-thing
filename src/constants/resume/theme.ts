import type { Config } from 'tailwindcss';
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from 'tailwindcss/types/config';

const resumeThemeColors = {
  background: '#ffffff',
  heading: '#10141b',
  body: '#3e4758',
  muted: '#717c94',
  secondary: {
    background: '#172959',
    heading: '#ffffff',
    body: '#cad1de',
  },
} satisfies ResolvableTo<RecursiveKeyValuePair>;

const resumeTypography = {
  DEFAULT: {
    css: {
      '--tw-prose-body': resumeThemeColors.body,
      /* TODO: Add missing variables based on Tailwind default shades:
      --tw-prose-bold, --tw-prose-links, --tw-prose-bullets, --tw-prose-counters */
    },
  },
  secondary: {
    css: {
      '--tw-prose-body': resumeThemeColors.secondary.body,
      /* TODO: Add same missing variables as above
      maybe based on prose-invert */
    },
  },
};

export const resumeTheme = {
  extend: {
    colors: resumeThemeColors,
    fontFamily: { sans: 'Inter, sans-serif' },
    fontSize: { title: ['2.5rem', '2.5rem'] },
    spacing: {
      'page-margin': '0.4in',
      'secondary-column-width': '3in',
    },
    typography: resumeTypography,
  },
} satisfies Config['theme'];
