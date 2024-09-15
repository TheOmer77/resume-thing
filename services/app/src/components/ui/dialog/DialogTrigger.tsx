import type { ComponentPropsWithoutRef } from 'react';
import { Trigger } from '@radix-ui/react-dialog';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

import { useDialogType } from './context';

export const DialogTrigger = (
  props: ComponentPropsWithoutRef<typeof Trigger>
) => {
  const dialogType = useDialogType(),
    Comp = dialogType === 'alert' ? AlertDialogTrigger : Trigger;

  return <Comp {...props} />;
};
