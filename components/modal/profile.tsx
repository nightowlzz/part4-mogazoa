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
import { IoCloseSharp } from 'react-icons/io5';

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
  nickname: z.string(),
  description: z.string(),
  image: z.string(),
});
export default function Profile() {
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
        <Button>프로필 모달</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogDescription className="hidden">profile form content</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-5 md:gap-[10px]">프로필 편집</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:space-y-4 lg:space-y-5">
            {/* 이미지 추가 */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <div className="relative flex h-[140px] md:h-[135px] lg:h-[160px] w-[140px] md:w-[135px] lg:w-[160px]">
                    <FormControl>
                      <>
                        <Input id="profilePicture" type="file" multiple accept="image/*" />
                        {/* label bg로 image 보이게*/}
                        <FormLabel
                          htmlFor="profilePicture"
                          variant="file"
                          style={{
                            backgroundImage: "url('')",
                          }}
                        >
                          {/* 삭제버튼 */}
                          {false ? (
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
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="닉네임을 입력해 주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
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
            <Button type="button" variant="default" onClick={form.handleSubmit(onSubmit)}>
              저장하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
