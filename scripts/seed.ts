import { db } from '@/db';
import { block, resume } from '@/db/schema';
import { seedBlocks } from '@/constants/seed/blocks';
import { seedResumes } from '@/constants/seed/resumes';
import { insertBlocks } from '@/db/queries/block';

const main = async () => {
  await db.transaction(async tx => {
    try {
      await tx.delete(resume).execute();
      await tx.delete(block).execute(); // Also deletes block contents

      await tx.insert(resume).values(seedResumes).execute();
      await insertBlocks(seedBlocks, tx);

      console.log('\x1b[32m', '✔️ DB Seed successful.');
    } catch (error) {
      tx.rollback();
      console.error('Error during seed:', error);
      process.exit(1);
    }
  });
  process.exit();
};

main();
