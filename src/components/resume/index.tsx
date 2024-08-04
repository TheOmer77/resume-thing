import { PrimaryColumn } from './layout/PrimaryColumn';
import { SecondaryColumn } from './layout/SecondaryColumn';
import { Block } from './blocks';

export const ResumeRoot = () => (
  <div className='flex min-h-screen break-after-avoid flex-row text-sm print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'>
    <SecondaryColumn>
      <Block blockId='dummy-title' />
      <Block blockId='dummy-contact' />

      <Block blockId='dummy-skills' />
      <Block blockId='dummy-tools' />
      <Block blockId='dummy-languages' />
    </SecondaryColumn>
    <PrimaryColumn>
      <Block blockId='dummy-summary' />

      <Block blockId='dummy-exp' />
      <Block blockId='dummy-edu' />
    </PrimaryColumn>
  </div>
);
