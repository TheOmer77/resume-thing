import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/useModal';
import type { Resume } from '@/db/schema';
import { toast } from '@/lib/toast';

export const ResumeRenameDialog = ({ resume }: { resume: Resume }) => {
  const { currentModal, closeModal } = useModal();

  const handleRename = async () => {
    toast.error('Not implemented yet.');
    closeModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (open || !currentModal) return;
    closeModal();
  };

  return (
    <Dialog
      open={currentModal === `resume-rename-${resume.id}`}
      onOpenChange={handleOpenChange}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Rename resume</DialogTitle>
        </DialogHeader>
        {/* TODO: Rename form */}
        <div>
          <Input value={resume.title} readOnly disabled />
        </div>
        <DialogFooter>
          <Button onClick={() => closeModal()}>Cancel</Button>
          <Button variant='primary' onClick={handleRename}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
