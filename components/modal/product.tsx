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

import CategorySelector from '@/app/_styled-guide/_components/CategorySelector';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ImFilePicture } from 'react-icons/im';
import { toast } from 'sonner';
import { z } from 'zod';
import { Input } from '../ui/input';
const FormSchema = z.object({
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  image: z.string(),
});
export default function Product() {
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
        <Button>상품 모달</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-5 md:gap-[10px]">상품 편집</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-[10px] md:space-y-4 lg:space-y-5"
          >
            <div className="flex flex-col md:flex-row-reverse gap-[10px] md:gap-5">
              {/* 이미지 추가 */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex h-[140px] md:h-full w-[140px] md:w-[135px] lg:w-[160px]">
                      <FormControl>
                        <>
                          <Input id="picture" type="file" multiple accept="image/*" />
                          {/* label bg로 image 보이게*/}
                          <FormLabel
                            htmlFor="picture"
                            className={`absolute right-[1px] top-[1px] flex items-center justify-center cursor-pointer rounded-lg bg-[#252530] border border-[#353542] bg-center bg-no-repeat z-[1]`}
                            style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
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
              <div className="flex flex-1 flex-col gap-[10px] md:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="상품명 (상품 등록 여부를 확인해 주세요)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategorySelector />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Textarea
                      placeholder="상품 설명을 입력해 주세요"
                      className="h-[120px] smd:h-[160px]"
                    />
                  </FormControl>
                  <FormDescription className="absolute bottom-5 right-5 text-sm text-gray-600">
                    2/30
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default">
              저장하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
