import { layout } from '@/constants/resume';
import { cn } from '@/lib/utils';

import { PrimaryColumn, SecondaryColumn, SecondaryHeaderRow } from './layout';
import { Block } from './blocks';

export const ResumeRoot = () => (
  <div
    className={cn(
      'relative grid min-h-screen break-after-avoid grid-cols-[var(--secondary-col-width),1fr]',
      'grid-rows-[auto,1fr] before:fixed before:w-[--secondary-col-width]',
      'before:start-0 before:top-0 before:-z-10 before:h-full before:bg-primary',
      '[--inverted-radius:4rem] after:absolute after:start-[--secondary-col-width]',
      'after:top-0 after:h-full after:w-[--inverted-radius] after:rounded-bl-[calc(var(--inverted-radius)/2)]',
      'after:rounded-tl-[calc(var(--inverted-radius)/2)] after:shadow-[calc(var(--inverted-radius)/-2)_0_0_0_theme(colors.primary)]',
      'print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'
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
);
