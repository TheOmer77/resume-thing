import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import type { OptionalConfig } from 'tailwindcss/types/config';

export const generateTailwindCss = async (
  html: string,
  css: string,
  config: Partial<OptionalConfig>
) => {
  const combinedCSS = `@tailwind base;@tailwind components;@tailwind utilities;${
    css
  }`;

  const result = await postcss([
    tailwindcss({ content: [{ raw: html }], ...config }),
  ]).process(combinedCSS, { from: undefined });
  return result.css;
};
