'use client';

import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
} from 'react';

import type { BlockData } from '@/types/blocks';

const blocksContext = createContext<BlockData[]>([]);

export const BlocksProvider = ({
  value,
  children,
}: ComponentPropsWithoutRef<typeof blocksContext.Provider>) => (
  <blocksContext.Provider value={value}>{children}</blocksContext.Provider>
);

export const useBlocks = () => useContext(blocksContext);
