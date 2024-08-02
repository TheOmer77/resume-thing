import inter400 from 'inter-ui/web/Inter-Regular.woff2';
import inter500 from 'inter-ui/web/Inter-Medium.woff2';
import inter600 from 'inter-ui/web/Inter-SemiBold.woff2';
import inter700 from 'inter-ui/web/Inter-Bold.woff2';
import inter800 from 'inter-ui/web/Inter-ExtraBold.woff2';
import inter400Italic from 'inter-ui/web/Inter-Italic.woff2';
import inter500Italic from 'inter-ui/web/Inter-MediumItalic.woff2';
import inter600Italic from 'inter-ui/web/Inter-SemiBoldItalic.woff2';
import inter700Italic from 'inter-ui/web/Inter-BoldItalic.woff2';
import inter800Italic from 'inter-ui/web/Inter-ExtraBoldItalic.woff2';

/**
 * Can't import the CSS file directly, so recreating it with the font file
 * paths.
 */
export const interCss = [
  [inter400, inter500, inter600, inter700, inter800].map(
    (path, idx) => `@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: ${400 + idx * 100};
  font-display: swap;
  src: url("${path}") format("woff2");
}`
  ),
  [
    inter400Italic,
    inter500Italic,
    inter600Italic,
    inter700Italic,
    inter800Italic,
  ].map(
    (path, idx) => `@font-face {
  font-family: "Inter";
  font-style: italic;
  font-weight: ${400 + idx * 100};
  font-display: swap;
  src: url("${path}") format("woff2");
}`
  ),
]
  .flat()
  .join('\n');
