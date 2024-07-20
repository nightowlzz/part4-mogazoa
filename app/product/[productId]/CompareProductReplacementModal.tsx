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
import { cn } from '@/lib/utils';
import useCompareStore, { CompareItem } from '@/store/compareStore';
import { useEffect, useState } from 'react';

interface CompareProductReplacementModalProps {
  productId: number;
  productName: string;
}

export default function CompareProductReplacementModal({
  productId,
  productName,
}: CompareProductReplacementModalProps) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { compareItems, replaceCompareItem } = useCompareStore();

  const handleSelectItem = (index: number) => {
    setSelectedItem(index);
  };

  const handleReplaceItem = () => {
    if (selectedItem !== null) {
      replaceCompareItem(selectedItem, { id: productId, name: productName });
      setSelectedItem(null);
    }
  };

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
          <DialogTitle>지금 보신 {productName}을/를 어떤 상품과 비교할까요?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-5">
          {compareItems.map((item, index) => (
            <Button
              key={item.id}
              variant="outlineRed"
              className={selectedItem === index ? 'border-pink text-pink' : ''}
              onClick={() => handleSelectItem(index)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handleReplaceItem}>
              교체하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
