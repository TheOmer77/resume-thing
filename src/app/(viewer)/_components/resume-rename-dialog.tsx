import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useModal } from '@/hooks/useModal';
import { useResumeById } from '@/hooks/useResumeById';
import { renameResumeSchema, type Resume } from '@/db/schema';
import { cn } from '@/lib/cn';

export const ResumeRenameDialog = ({ resume }: { resume: Resume }) => {
  const { currentModal, closeModal } = useModal();
  const open = currentModal === `resume-rename-${resume.id}`;

  const { updateResume, updateResumePending } = useResumeById(resume.id, {
    enabled: false,
  });

  const form = useForm<z.infer<typeof renameResumeSchema>>({
    resolver: zodResolver(renameResumeSchema),
    defaultValues: { title: resume.title },
    disabled: updateResumePending,
  });
  const hasErrors =
    Object.values(form.formState.errors).filter(Boolean).length > 0;

  const handleOpenChange = (open: boolean) => {
    if (open || !currentModal || updateResumePending) return;
    setTimeout(form.reset, 200);
    closeModal();
  };

  const handleSubmit = (values: z.infer<typeof renameResumeSchema>) => {
    updateResume(values, { onSuccess: () => handleOpenChange(false) });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Rename resume</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} aria-label='Title' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type='button'
                onClick={() => handleOpenChange(false)}
                disabled={form.formState.disabled}
              >
                Cancel
              </Button>
              <Button
                variant='primary'
                type='submit'
                className='relative'
                disabled={form.formState.disabled || hasErrors}
              >
                <span className={cn(updateResumePending && 'invisible')}>
                  Rename
                </span>
                <Spinner
                  className={cn(
                    'absolute size-5 text-inherit',
                    !updateResumePending && 'hidden'
                  )}
                />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
