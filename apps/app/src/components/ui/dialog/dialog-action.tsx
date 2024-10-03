import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';

import { Button } from '@/components/ui/button';

import { useDialogType } from './context';

export const DialogAction = forwardRef<
  ElementRef<typeof Button>,
  ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => {
  const dialogType = useDialogType(),
    Comp = dialogType === 'alert' ? AlertDialogAction : DialogClose;

  return (
    <Comp asChild ref={ref}>
      <Button {...props} />
    </Comp>
  );
});
DialogAction.displayName = 'DialogAction';
