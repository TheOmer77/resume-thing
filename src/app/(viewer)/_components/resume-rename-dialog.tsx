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
import { useModal } from '@/hooks/useModal';
import type { Resume } from '@/db/schema';
import { toast } from '@/lib/toast';

const formSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty.'),
});

export const ResumeRenameDialog = ({ resume }: { resume: Resume }) => {
  const { currentModal, closeModal } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: resume.title },
  });

  const handleOpenChange = (open: boolean) => {
    if (open || !currentModal || form.formState.disabled) return;
    setTimeout(form.reset, 200);
    closeModal();
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    handleOpenChange(false);

    // TODO: Submit to rename route
    toast.error('Not implemented yet.');
    console.log(values);
  };

  const hasErrors =
    Object.values(form.formState.errors).filter(Boolean).length > 0;

  return (
    <Dialog
      open={currentModal === `resume-rename-${resume.id}`}
      onOpenChange={handleOpenChange}
    >
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
                disabled={form.formState.disabled || hasErrors}
              >
                Rename
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
