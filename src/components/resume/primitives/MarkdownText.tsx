import Markdown, {
  type Components as MarkdownComponents,
  type Options as MarkdownProps,
} from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ALLOWED_ELEMENTS = [
  'p',
  'strong',
  'em',
  'del',
  'a',
  'ul',
  'ol',
  'li',
  'br',
] satisfies (keyof MarkdownComponents)[];

export type MarkdownTextProps = Pick<MarkdownProps, 'className' | 'children'>;

export const MarkdownText = ({ className, children }: MarkdownTextProps) => (
  <Markdown
    remarkPlugins={[remarkGfm]}
    allowedElements={ALLOWED_ELEMENTS}
    className={className}
    skipHtml
  >
    {children}
  </Markdown>
);
