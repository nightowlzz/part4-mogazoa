'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUploadImage } from '@/hooks/image';
import { useUpdateProduct } from '@/hooks/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { renameFileWithExtension } from '@/utils/textUtils';

export const FormSchema = z.object({
  name: z.string().min(1, { message: '상품 이름은 필수 입력입니다.' }),
  categoryName: z.string().min(1, { message: '카테고리를 선택해주세요.' }),
  desc: z
    .string()
    .min(1, { message: '상품 설명은 필수 입력입니다.' })
    .min(10, { message: '최소 10자 이상 적어주세요.' }),
  image: z.string().min(1, { message: '대표 이미지를 추가해주세요.' }),
  categoryId: z.number(),
});

export interface ProductData {
  productId: string[] | string;
  name: string;
  description: string;
  image: string;
  categoryId: number;
  categoryName: string;
}

export default function EditProduct({
  productId,
  name,
  description,
  image,
  categoryId,
  categoryName,
}: ProductData) {
  const [descLength, setDescLength] = useState(description.length);
  const [isSaving, setIsSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name, desc: description, image, categoryName, categoryId },
    mode: 'onBlur',
  });

  const uploadImageMutation = useUploadImage();
  const updateProductMutation = useUpdateProduct(Number(productId));

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', renameFileWithExtension(file));
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
      setIsSaving(true);
      const { name, desc, image, categoryId } = formData;
      const updatedData = { name, description: desc, image, categoryId };
      await updateProductMutation.mutateAsync(updatedData);

      // 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['productDetail'] });

      //모달 닫기
      setIsOpen(false);

      toast.success('상품이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      toast.error('상품 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                          <Input
                            id="productPicture"
                            type="file"
                            accept=".jpg, .jpeg, .png"
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
                        <Input {...field} placeholder="상품명 (상품 등록 여부를 확인해 주세요)" />
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
                          initialValue={{ id: categoryId, name: categoryName }}
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
                      {...field}
                      placeholder="상품 설명을 입력해 주세요"
                      className="h-[120px] smd:h-[160px]"
                      maxLength={500}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          field.onChange(e);
                          setDescLength(e.target.value.length);
                        }
                      }}
                    />
                  </FormControl>
                  <span className="absolute bottom-5 right-5 text-sm text-gray-600 px-1 bg-black-450">
                    {descLength}/500
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="default"
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || isSaving}
          >
            {isSaving ? '저장 중..' : '저장하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
