import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function Compare() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>비교모달</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>지금 보신 ‘Sony WH-1300XM3’ 어떤 상품과 비교할까요?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-5">
          <Button variant="outlineRed" className={cn(`${false ? 'border-pink text-pink' : ''}`)}>
            Air Pods 1
          </Button>
          <Button variant="outlineRed" className={cn(`${true ? 'border-pink text-pink' : ''}`)}>
            Air Pods 2
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
