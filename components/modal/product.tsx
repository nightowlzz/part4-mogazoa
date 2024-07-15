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
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from 'sonner';
import { z } from 'zod';
import { Input } from '../ui/input';

const FormSchema = z.object({
  name: z.string(),
  category: z.string(),
  desc: z.string(),
  image: z.string(),
});

interface ProductData {
  name: string;
  description: string;
  image: string;
  categoryName: string;
}

export default function Product({ name, description, image, categoryName }: ProductData) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name, desc: description, image, category: categoryName },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('전송 되었습니다.');
    toast.error('전송 실패 하였습니다.');
  }

  //"url('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160406_70%2Fjane0014_145991895474804Yrl_PNG%2F20160324_1822371.png&type=sc960_832')"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">편집하기</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogDescription className="hidden">product form content</DialogDescription>
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
                          <Input id="productPicture" type="file" multiple accept="image/*" />
                          {/* label bg로 image 보이게*/}
                          <FormLabel
                            htmlFor="productPicture"
                            variant="file"
                            style={{
                              backgroundImage: `url(${field.value})`,
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
              <div className="flex flex-1 flex-col gap-[10px] md:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="상품명 (상품 등록 여부를 확인해 주세요)" />
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
                        <CategorySelector initialValue={field.value} />
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
                      {...field}
                      placeholder="상품 설명을 입력해 주세요"
                      className="h-[120px] smd:h-[160px]"
                    />
                  </FormControl>
                  <span className="absolute bottom-5 right-5 text-sm text-gray-600 px-1 bg-black-450">
                    2/300
                  </span>
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
