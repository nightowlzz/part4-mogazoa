import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useCompareStore from '@/store/compareStore';
import { useRouter } from 'next/navigation';

interface CompareConfirmModal {
  title?: React.ReactNode;
  buttonText?: string;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CompareConfirmModal({
  title,
  buttonText,
  open,
  onOpenChange,
}: CompareConfirmModal) {
  const router = useRouter();
  const { compareItems } = useCompareStore();

  const handlePageNavigation = () => {
    onOpenChange(false);
    if (compareItems.length === 2) {
      router.push('/compare');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]">
        <DialogDescription className="hidden">compare content</DialogDescription>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="default" onClick={handlePageNavigation}>
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
