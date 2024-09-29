import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import type { OptionalConfig } from 'tailwindcss/types/config';

export const generateTailwindCss = async (
  html: string,
  config: Partial<OptionalConfig>,
  ...extraCss: string[]
) => {
  const combinedCSS = `@tailwind base;@tailwind components;@tailwind utilities;${extraCss.join('')}`;

  const result = await postcss([
    tailwindcss({ content: [{ raw: html }], ...config }),
  ]).process(combinedCSS, { from: undefined });
  return result.css;
};
