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
import useCompareStore from '@/store/compareStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  /*const handlePageNavigation = () => {
    setIsOpen(false);
    if (compareItems.length === 1) {
      router.push('/compare');
    }
  };*/

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[540px]">
        <DialogDescription className="hidden">compare content</DialogDescription>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="default" onClick={() => onOpenChange(false)}>
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
