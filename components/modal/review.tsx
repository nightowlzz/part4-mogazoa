'use client';
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa6';
import { ImFilePicture } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from 'sonner';
import { z } from 'zod';
import { Input } from '../ui/input';
import CategoryTag from '../ui/tags/CategoryTag';
const FormSchema = z.object({
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1.' })
    .max(5, { message: 'Rating must be at most 5.' }),
  review: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
  image: z.string(),
});
export default function Review() {
  const [rating, setRating] = useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('전송 되었습니다.');
    toast.error('전송 실패 하였습니다.');
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>리뷰모달</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[660px]" aria-describedby="dialog-review">
        <DialogDescription className="hidden">review form content</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-[10px]">
            <CategoryTag categoryName="전자기기" categoryId={6} />
            Sony WH-1000XM3
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2 md:space-y-4 lg:space-y-5"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-4 lg:gap-5">
                      <h3 className="text-gray-600">별점</h3>
                      <div className="flex gap-[2px] lg:gap-1">
                        {Array.from({ length: 5 }).map((star, i) => {
                          return (
                            <FaStar
                              key={i}
                              className="text-yellow w-[22px] md:w-[26px] h-[22px] md:h-[26px]"
                            />
                          );
                        })}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Textarea placeholder="리뷰를 작성해 주세요" />
                  </FormControl>
                  <span className="absolute bottom-5 right-5 text-sm text-gray-600 px-1 bg-black-450">
                    2/300
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 이미지 추가 */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <div className="relative flex w-[140px] md:w-[160px] h-[140px] md:h-[160px]">
                    <FormControl>
                      <>
                        <Input id="reviewPicture" type="file" multiple accept="image/*" />
                        {/* label bg로 image 보이게*/}
                        <FormLabel
                          htmlFor="reviewPicture"
                          variant="file"
                          style={{
                            backgroundImage:
                              "url('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160406_70%2Fjane0014_145991895474804Yrl_PNG%2F20160324_1822371.png&type=sc960_832')",
                          }}
                        >
                          {/* 삭제버튼 */}
                          {true ? (
                            <Button
                              asChild
                              variant="iconBg"
                              size="auto"
                              className="absolute right-1 top-1 flex items-center justify-center h-7 w-7 rounded-lg p-1"
                            >
                              <IoCloseSharp className="text-white" size={18} />
                            </Button>
                          ) : (
                            <span>
                              <ImFilePicture className="text-gray-600" size={34} />
                            </span>
                          )}
                        </FormLabel>
                      </>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={form.handleSubmit(onSubmit)}>
              작성하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
