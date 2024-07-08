'use client';
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
import { toast } from 'sonner';
import { z } from 'zod';
import { Input } from '../ui/input';
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
      <DialogContent className="w-full max-w-[540px]">
        {/* head */}
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-[10px]">
            <span className="text-sm">전자기기</span>
            Sony WH-1000XM3 s{' '}
          </DialogTitle>
        </DialogHeader>
        {/* content */}
        <div className="flex flex-col">
          {/* form */}
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
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 이미지 추가 */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="md:pt-2">
                    <div className="relative flex w-[140px] md:w-[160px] h-[140px] md:h-[160px]">
                      <FormControl>
                        <>
                          <Input id="picture" type="file" multiple accept="image/*" />
                          {/* label bg로 image 보이게*/}
                          <FormLabel
                            htmlFor="picture"
                            className={`absolute left-[1px] top-[1px] flex items-center justify-center h-[138px] w-[138px] md:h-[158px] md:w-[158px] cursor-pointer rounded-lg bg-[#252530] border border-[#353542] bg-center bg-no-repeat`}
                          >
                            {/* 삭제버튼 */}
                            {false ? (
                              <Button
                                type="button"
                                variant="icon"
                                size="auto"
                                className="absolute right-1 top-1 flex items-center justify-center h-7 w-7 rounded-lg bg-black/50 p-1"
                              ></Button>
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
        </div>
        {/* foot */}
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
