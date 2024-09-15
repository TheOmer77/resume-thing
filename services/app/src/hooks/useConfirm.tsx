import { useContext } from 'react';

import { ConfirmContext } from '@/components/providers/ConfirmProvider';

export const useConfirm = () => {
  const { promise, confirm } = useContext(ConfirmContext);
  const isPending = !!promise;

  return [confirm, isPending] as const;
};
