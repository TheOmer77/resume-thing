/**
 * Get only the content inside the `<body>` tag of an HTML string, excluding
 * `<script>` tags.
 * @param html The original HTML string.
 */
export const extractHtmlBodyContent = (html: string) => {
  const bodyContentMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i),
    bodyContent = bodyContentMatch ? bodyContentMatch[1] : '';
  return bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
};
