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
  const blocks = await getBlocks({ resumeId: id });
  return (
    <BlocksProvider value={blocks}>
      <ResumeRoot>
        <SecondaryHeaderRow>
          {/* TODO: Secondary header row blocks */}
        </SecondaryHeaderRow>
        <PrimaryColumn>
          {blocks
            .filter(({ order }) => typeof order === 'number')
            .map(({ id }) => (
              <Block key={id} blockId={id} />
            ))}
        </PrimaryColumn>
        <SecondaryColumn>{/* TODO: Secondary column blocks */}</SecondaryColumn>
      </ResumeRoot>
    </BlocksProvider>
  );
};

export default ResumeHtmlPage;
