import { useContext } from 'react';

import { ConfirmContext } from '@/components/providers/confirm-provider';

export const useConfirm = () => {
  const { promise, confirm } = useContext(ConfirmContext);
  const isPending = !!promise;

  return [confirm, isPending] as const;
};
