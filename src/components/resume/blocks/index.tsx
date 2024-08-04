import type { BlockProps } from './types';

import { getBlockById } from './getBlockById';

export const Block = ({ blockId }: BlockProps) => getBlockById(blockId);
