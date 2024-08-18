import { Block } from '@/components/resume/blocks';
import {
  PrimaryColumn,
  SecondaryColumn,
  SecondaryHeaderRow,
} from '@/components/resume/layout';
import { getBlocks } from '@/db/queries/blocks';
import { cn } from '@/lib/cn';
import { layout } from '@/constants/resume';

import { BlocksProvider } from './context';

const ResumeHtmlPage = async () => {
  const blocks = await getBlocks();
  return (
    <BlocksProvider value={blocks}>
      <div
        className={cn(
          'grid min-h-screen break-after-avoid grid-cols-[var(--secondary-col-width),1fr]',
          'grid-rows-[auto,1fr] before:fixed before:w-[--secondary-col-width]',
          'before:start-0 before:top-0 before:-z-10 before:h-full before:bg-primary',
          '[--inverted-radius:0.6in] after:fixed after:start-[--secondary-col-width]',
          'after:top-0 after:h-full after:w-[--inverted-radius] after:rounded-bl-[calc(var(--inverted-radius)/2)]',
          'after:rounded-tl-[calc(var(--inverted-radius)/2)] after:shadow-[calc(var(--inverted-radius)/-2)_0_0_0_theme(colors.primary)]',
          'after:-z-20 print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'
        )}
        style={layout}
      >
        <SecondaryHeaderRow>
          <Block blockId='dummy-title' />
          <Block blockId='dummy-contact' />
          <Block blockId='dummy-links' />
        </SecondaryHeaderRow>
        <PrimaryColumn>
          <Block blockId='dummy-summary' />
          <Block blockId='dummy-exp' />
          <Block blockId='dummy-edu' />
        </PrimaryColumn>
        <SecondaryColumn>
          <Block blockId='dummy-skills' />
          <Block blockId='dummy-tools' />
          <Block blockId='dummy-languages' />
        </SecondaryColumn>
      </div>
    </BlocksProvider>
  );
};

export default ResumeHtmlPage;
