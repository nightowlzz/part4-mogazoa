import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useCompareStore from '@/store/compareStore';
import { useState } from 'react';

interface CompareProductReplacementModalProps {
  productId: number;
  productName: string;
  open: boolean;
  onOpenChange: (isOpen: boolean, isReplacement?: boolean) => void;
}

export default function CompareProductReplacementModal({
  productId,
  productName,
  open,
  onOpenChange,
}: CompareProductReplacementModalProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { compareItems, updateCompareItem } = useCompareStore();

  const handleSelectItem = (index: number) => {
    setSelectedItem(index);
  };

  const handleUpdateItem = () => {
    if (selectedItem !== null) {
      updateCompareItem(selectedItem, { id: productId, name: productName });
      setSelectedItem(null);
      onOpenChange(false, true);
    }
  };

  const handleCloseModal = () => {
    onOpenChange(false, false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-[540px]">
        <DialogDescription className="hidden">compare content</DialogDescription>
        <DialogHeader>
          <DialogTitle>지금 보신 {productName}을/를 어떤 상품과 비교할까요?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-5">
          {compareItems.map((item, index) => (
            <Button
              key={item?.id}
              variant="outline"
              className={
                selectedItem === index
                  ? 'border-pink text-pink hover:border-pink hover:text-pink'
                  : ''
              }
              onClick={() => handleSelectItem(index)}
            >
              {item?.name}
            </Button>
          ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handleUpdateItem}>
              교체하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
