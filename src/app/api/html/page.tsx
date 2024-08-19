import { getBlocks } from '@/db/queries/blocks';

import { Block } from './_components/blocks';
import {
  PrimaryColumn,
  ResumeRoot,
  SecondaryColumn,
  SecondaryHeaderRow,
} from './_components/layout';
import { BlocksProvider } from './context';

const ResumeHtmlPage = async () => {
  const blocks = await getBlocks();
  return (
    <BlocksProvider value={blocks}>
      <ResumeRoot>
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
      </ResumeRoot>
    </BlocksProvider>
  );
};

export default ResumeHtmlPage;
