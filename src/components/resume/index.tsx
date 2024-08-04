import { PrimaryColumn } from './layout/PrimaryColumn';
import { SecondaryColumn } from './layout/SecondaryColumn';
import { Block } from './blocks';
import { H1, H2 } from './primitives';

export const ResumeRoot = () => (
  <div className='flex min-h-screen break-after-avoid flex-row text-sm print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'>
    <SecondaryColumn>
      <Block blockId='dummy-title' />
      <Block blockId='dummy-contact' />

      <div>
        <H2>Skills</H2>
        <Block blockId='dummy-skills' />
      </div>
      <div>
        <H2>Tools</H2>
        <Block blockId='dummy-tools' />
      </div>
      <div>
        <H2>Languages</H2>
        <Block blockId='dummy-languages' />
      </div>
    </SecondaryColumn>
    <PrimaryColumn>
      <Block blockId='dummy-summary' />

      <H1>Experience</H1>
      <Block blockId='dummy-exp' />

      <H1>Education</H1>
      <Block blockId='dummy-edu' />
    </PrimaryColumn>
  </div>
);
