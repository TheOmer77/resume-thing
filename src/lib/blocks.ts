import { createId } from '@paralleldrive/cuid2';

import type { BlockData } from '@/types/blocks';

export const createDuplicateBlocks = (blocks: BlockData[]) => {
  const idMap = new Map<string, string>();
  const getOrCreateId = (originalId: string) => {
    if (!idMap.has(originalId)) idMap.set(originalId, createId());
    return idMap.get(originalId)!;
  };

  return blocks.map(
    item =>
      ({
        ...item,
        id: getOrCreateId(item.id),
        content:
          'children' in item.content
            ? {
                ...item.content,
                children: item.content.children.map(getOrCreateId),
              }
            : item.content,
      }) as BlockData
  );
};
