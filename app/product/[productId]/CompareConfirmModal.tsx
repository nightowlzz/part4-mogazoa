import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CompareConfirmModal {
  title?: React.ReactNode;
  buttonText?: string;
  onClick: () => void;
}

export default function CompareConfirmModal({ title, buttonText, onClick }: CompareConfirmModal) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlineBlue" data-text="비교하기">
          variant:outlineBlue 버튼
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[540px]">
        <DialogDescription className="hidden">compare content</DialogDescription>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={onClick}>
              {buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
