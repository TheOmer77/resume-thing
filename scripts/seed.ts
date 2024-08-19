import { db } from '@/db';
import {
  block,
  blockContentContact,
  blockContentContactItem,
  blockContentExperience,
  blockContentSection,
  blockContentSectionChild,
  blockContentText,
  blockContentTitle,
} from '@/db/schema';
import { resumeBlocks } from '@/constants/seed/blocks';
import type {
  ContactInfoBlockData,
  ExperienceBlockData,
  SectionBlockData,
  TextBlockData,
  TitleBlockData,
} from '@/types/blocks';

const main = async () => {
  const dummyData = resumeBlocks.reduce<{
    contactInfo: ContactInfoBlockData[];
    experience: ExperienceBlockData[];
    section: SectionBlockData[];
    text: TextBlockData[];
    title: TitleBlockData[];
  }>(
    (obj, curr) => ({
      ...obj,
      [curr.type]: [...obj[curr.type], curr],
    }),
    { contactInfo: [], experience: [], section: [], text: [], title: [] }
  );

  await db.transaction(async tx => {
    try {
      await tx.delete(block).execute();

      await tx
        .insert(block)
        .values(resumeBlocks.map(({ id }) => ({ id })))
        .execute();

      await tx
        .insert(blockContentContact)
        .values(
          dummyData.contactInfo.map(({ content, id }) => ({
            blockId: id,
            orientation: content.orientation,
          }))
        )
        .execute();
      await tx
        .insert(blockContentContactItem)
        .values(
          dummyData.contactInfo
            .map(({ content, id }) =>
              content.items.map((value, order) => ({
                blockId: id,
                order,
                ...value,
              }))
            )
            .flat()
        )
        .execute();

      await tx
        .insert(blockContentSection)
        .values(
          dummyData.section.map(({ content, id }) => ({
            blockId: id,
            title: content.title,
          }))
        )
        .execute();
      await tx
        .insert(blockContentSectionChild)
        .values(
          dummyData.section
            .map(({ content, id }) =>
              content.children.map((value, order) => ({
                blockId: id,
                order,
                childId: value,
              }))
            )
            .flat()
        )
        .execute();

      await tx
        .insert(blockContentExperience)
        .values(
          dummyData.experience.map(({ content, id }) => ({
            blockId: id,
            ...content,
          }))
        )
        .execute();

      await tx
        .insert(blockContentText)
        .values(
          dummyData.text.map(({ content, id }) => ({ blockId: id, ...content }))
        )
        .execute();

      await tx
        .insert(blockContentTitle)
        .values(
          dummyData.title.map(({ content, id }) => ({
            blockId: id,
            ...content,
          }))
        )
        .execute();

      console.log('\x1b[32m', '✔️ DB Seed successful.');
    } catch (error) {
      await tx.rollback();
      console.error('Error during seed:', error);
      process.exit(1);
    }
  });
  process.exit();
};

main();
