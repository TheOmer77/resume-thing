import { cn } from '@/lib/utils';

import { PrimaryColumn } from './layout/PrimaryColumn';
import { SecondaryColumn } from './layout/SecondaryColumn';
import { SecondaryHeaderRow } from './layout/SecondaryHeaderRow';
import { Block } from './blocks';

export const ResumeRoot = () => (
  <div
    className={cn(
      'grid min-h-screen break-after-avoid grid-cols-[theme(spacing.secondary-col-width),1fr]',
      'before:w-secondary-col-width grid-rows-[auto,1fr] before:fixed',
      'before:start-0 before:top-0 before:-z-10 before:h-full before:bg-primary',
      'print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'
    )}
  >
    <SecondaryHeaderRow>
      <Block blockId='dummy-title' />
      <Block blockId='dummy-contact' />
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
