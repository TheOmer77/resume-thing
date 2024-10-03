import { getBlocks } from '@/db/queries/block';

import { Block } from '../_components/blocks';
import {
  PrimaryColumn,
  ResumeRoot,
  SecondaryColumn,
  SecondaryHeaderRow,
} from '../_components/layout';
import { BlocksProvider } from '../context';

type ResumeHtmlPageProps = { params: { id: string } };

const ResumeHtmlPage = async ({ params: { id } }: ResumeHtmlPageProps) => {
  const blocks = await getBlocks(id);
  const renderedBlocks = blocks.filter(
    ({ order }) => typeof order === 'number'
  );

  // TODO: primaryHeaderBlocks
  const primaryColBlocks = renderedBlocks.filter(
      ({ inHeaderRow, inSecondaryCol }) => !inHeaderRow && !inSecondaryCol
    ),
    secondaryHeaderBlocks = renderedBlocks.filter(
      ({ inHeaderRow, inSecondaryCol }) => inHeaderRow && inSecondaryCol
    ),
    secondaryColBlocks = renderedBlocks.filter(
      ({ inHeaderRow, inSecondaryCol }) => !inHeaderRow && inSecondaryCol
    );

  return (
    <BlocksProvider value={blocks}>
      <ResumeRoot>
        <SecondaryHeaderRow>
          {secondaryHeaderBlocks.map(({ id }) => (
            <Block key={id} blockId={id} />
          ))}
        </SecondaryHeaderRow>
        <PrimaryColumn>
          {primaryColBlocks.map(({ id }) => (
            <Block key={id} blockId={id} />
          ))}
        </PrimaryColumn>
        <SecondaryColumn>
          {secondaryColBlocks.map(({ id }) => (
            <Block key={id} blockId={id} />
          ))}
        </SecondaryColumn>
      </ResumeRoot>
    </BlocksProvider>
  );
};

export default ResumeHtmlPage;
