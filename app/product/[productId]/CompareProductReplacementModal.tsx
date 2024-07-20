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
import { useEffect, useState } from 'react';

interface CompareProductReplacementModalProps {
  productName: string;
}

export default function CompareProductReplacementModal({
  productName,
}: CompareProductReplacementModalProps) {
  const [compareItems, setCompareItems] = useState<string[]>([]);

  useEffect(() => {
    const items = sessionStorage.getItem('compare-storage');

    if (items) {
      try {
        const parsedItems = JSON.parse(items);
        const compareItems = parsedItems.state.compareItems;
        setCompareItems(compareItems);
      } catch (error) {
        console.error('JSON 파싱 오류');
      }
    }
  }, []);

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
          <Button variant="outlineRed" className={cn(`${false ? 'border-pink text-pink' : ''}`)}>
            {compareItems[0]}
          </Button>
          <Button variant="outlineRed" className={cn(`${true ? 'border-pink text-pink' : ''}`)}>
            {compareItems[1]}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default">
              교체하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
