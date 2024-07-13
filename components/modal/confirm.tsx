import { Button, buttonVariants } from '@/components/ui/button';
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
import Link from 'next/link';

export default function Confirm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>비교상품교체모달확인 바로가기</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[540px]">
        <DialogHeader>
          <DialogTitle>
            비교 상품이 교체되었습니다.
            <br /> 바로 확인해 보시겠어요?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Link href="/" className={cn(buttonVariants({ variant: 'default' }))}>
              바로가기
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
