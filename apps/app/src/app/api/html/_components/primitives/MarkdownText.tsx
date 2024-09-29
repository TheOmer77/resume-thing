import Markdown, {
  type Components as MarkdownComponents,
  type Options as MarkdownProps,
} from 'react-markdown';

const ALLOWED_ELEMENTS = [
  'p',
  'strong',
  'em',
  'a',
  'ul',
  'ol',
  'li',
  'br',
] satisfies (keyof MarkdownComponents)[];

export type MarkdownTextProps = Pick<MarkdownProps, 'className' | 'children'>;

export const MarkdownText = ({ className, children }: MarkdownTextProps) => (
  <Markdown allowedElements={ALLOWED_ELEMENTS} className={className} skipHtml>
    {children}
  </Markdown>
);
