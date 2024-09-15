import type { CSSProperties } from 'react';
import type { Config } from 'tailwindcss';
import type {
  RecursiveKeyValuePair,
  ResolvableTo,
} from 'tailwindcss/types/config';

/** https://palette-generator-thing.vercel.app/?primary=3858aa&neutral=neutral20 */
const colors = {
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

const typography = {
  DEFAULT: {
    css: {
      '--tw-prose-body': colors.neutral[700],
      '--tw-prose-headings': colors.neutral[900],
      '--tw-prose-lead': colors.neutral[700],
      '--tw-prose-links': colors.neutral[900],
      '--tw-prose-bold': colors.neutral[900],
      '--tw-prose-counters': colors.neutral[500],
      '--tw-prose-bullets': colors.neutral[300],
      '--tw-prose-captions': colors.neutral[500],
      '--tw-prose-code': colors.neutral[900],
      '--tw-prose-invert-body': colors.neutral[200],
      '--tw-prose-invert-headings': colors.white,
      '--tw-prose-invert-lead': colors.neutral[200],
      '--tw-prose-invert-links': colors.white,
      '--tw-prose-invert-bold': colors.white,
      '--tw-prose-invert-counters': colors.neutral[400],
      '--tw-prose-invert-bullets': colors.neutral[600],
      '--tw-prose-invert-captions': colors.neutral[400],

      fontSize: '10.5pt',
      lineHeight: 1.5,
      h1: {
        fontSize: '30pt',
        fontWeight: 800,
        letterSpacing: '-0.025em',
        lineHeight: 1,
        marginBottom: '0.5rem',
      },
      h2: {
        fontSize: '13.5pt',
        fontWeight: 700,
        lineHeight: 1.5,
        marginTop: '1rem',
        marginBottom: '0.5rem',
      },
      '.secondary-col h2': {
        fontSize: '10.5pt',
        fontWeight: 600,
        marginTop: 0,
        marginBottom: '0.25rem',
      },
      h3: {
        fontSize: '10.5pt',
        fontWeight: 600,
        lineHeight: 1.5,
        marginTop: 0,
        marginBottom: '0.25rem',
      },
      'h2 + h3': { marginTop: '1rem' },
      '[class~="lead"]': { fontSize: '12pt', lineHeight: 1.5 },
      '[class~="caption"]': {
        fontSize: '9pt',
        lineHeight: 1.5,
        color: 'var(--tw-prose-captions)',
      },
      ul: { marginTop: 0 },
      ol: { marginTop: 0 },
      li: { marginTop: 0, marginBottom: 0 },
    },
  },
};

export const resumeTheme = {
  extend: {
    colors,
    fontFamily: { sans: 'Inter, sans-serif' },
    typography,
  },
} satisfies Config['theme'];

export const layout = {
  '--page-margin': '0.4in',
  '--secondary-col-width': '3in',
} as CSSProperties;
