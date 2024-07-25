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
import { useEffect, useState } from 'react';

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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUploadImage } from '@/hooks/image';
import { useCreateProduct } from '@/hooks/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  name: z
    .string()
    .min(1, '상품명을 입력해 주세요')
    .max(20, '상품명은 최대 20자까지 입력 가능합니다.'),
  categoryName: z.string().min(1, '카테고리를 선택해 주세요'),
  desc: z
    .string()
    .min(1, { message: '상품 설명은 필수 입력입니다.' })
    .min(10, { message: '최소 10자 이상 적어주세요.' })
    .max(500, '상품 설명은 최대 500자까지 입력 가능합니다.'),
  image: z.string().min(1, '이미지를 업로드해 주세요'),
  categoryId: z.number(),
});

interface AddProductModalProps {
  triggerButton: React.ReactNode;
}

export default function AddProductModal({ triggerButton }: AddProductModalProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [descLength, setDescLength] = useState(0);

  const uploadImageMutation = useUploadImage();
  const createProduct = useCreateProduct();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  // 글자수 세기
  useEffect(() => {
    const subscription = form.watch((value) => {
      setDescLength(value.desc?.length || 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 상품명 중복 체크를 위한 API 함수.
  async function isProductNameDuplicate(name: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/products?keyword=${encodeURIComponent(name)}`);
      const data = await response.json();
      return data.list.some((product: { name: string }) => product.name === name);
    } catch (error) {
      console.error('isProductNameDuplicate 체크 중 오류가 발생했습니다.', error);
      return false;
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await uploadImageMutation.mutateAsync(formData);
        setImageUrl(response.url);
        form.setValue('image', response.url);
      } catch (error) {
        toast.error('이미지 업로드 중 오류가 발생했습니다.');
      }
    }
  };

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {
      const { name, desc, image, categoryId } = formData;
      const updatedData = { name, description: desc, image, categoryId };
      await createProduct.mutateAsync(updatedData);

      toast.success('상품이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      toast.error('상품 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleNameBlur = async () => {
    const name = form.getValues('name');
    if (name) {
      const isDuplicate = await isProductNameDuplicate(name);
      if (isDuplicate) {
        form.setError('name', { type: 'manual', message: '이미 등록된 상품입니다.' });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-5 md:gap-[10px]">상품 추가</DialogTitle>
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
                          <Input
                            id="productPicture"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {/* label bg로 image 보이게*/}
                          <FormLabel
                            htmlFor="productPicture"
                            variant="file"
                            style={{
                              backgroundImage: imageUrl
                                ? `url(${imageUrl})`
                                : `url(${field.value})`,
                            }}
                          ></FormLabel>
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
                        <Input
                          placeholder="상품명 (상품 등록 여부를 확인해 주세요)"
                          {...field}
                          type="text"
                          onBlur={handleNameBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategorySelector
                          onChange={(value) => {
                            form.setValue('categoryId', value.id);
                            form.setValue('categoryName', value.name);
                          }}
                        />
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
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setDescLength(e.target.value.length);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="absolute bottom-5 right-5 text-sm text-gray-600">
                    {descLength}/500
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid}
            >
              추가하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
