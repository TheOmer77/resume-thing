import { PrimaryColumn } from './layout/PrimaryColumn';
import { SecondaryColumn } from './layout/SecondaryColumn';
import { TitleBlock } from './blocks/TitleBlock';
import { ContactInfoBlock } from './blocks/ContactInfoBlock';
import { TextBlock } from './blocks/TextBlock';
import { ExperienceBlock } from './blocks/ExperienceBlock';
import { H1, H2 } from './headings';

export const ResumeRoot = () => (
  <div className='flex min-h-screen break-after-avoid flex-row text-sm print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]'>
    <SecondaryColumn>
      <TitleBlock blockId='dummy-title' />
      <ContactInfoBlock blockId='dummy-contact' />

      <div>
        <H2>Skills</H2>
        <TextBlock blockId='dummy-skills' />
      </div>
      <div>
        <H2>Tools</H2>
        <TextBlock blockId='dummy-tools' />
      </div>
      <div>
        <H2>Languages</H2>
        <TextBlock blockId='dummy-languages' />
      </div>
    </SecondaryColumn>
    <PrimaryColumn>
      <TextBlock blockId='dummy-summary' />

      <H1>Experience</H1>
      <ExperienceBlock blockId='dummy-exp' />
      <ExperienceBlock blockId='dummy-exp' />
      <ExperienceBlock blockId='dummy-exp' />
      <ExperienceBlock blockId='dummy-exp' />
      <ExperienceBlock blockId='dummy-exp' />

      <H1>Education</H1>
      <ExperienceBlock blockId='dummy-edu' />
      <ExperienceBlock blockId='dummy-edu' />
    </PrimaryColumn>
  </div>
);
