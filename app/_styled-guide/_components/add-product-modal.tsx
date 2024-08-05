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
import { useState } from 'react';

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
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useDataQuery } from '@/services/common';
import { ProductsListResponse } from '@/types/data';
import { useRouter } from 'next/navigation';
import { BiImageAdd } from 'react-icons/bi';
import { renameFileWithExtension } from '@/utils/textUtils';
import useDebounce from '@/hooks/useDebounce';

const FormSchema = z.object({
  name: z
    .string({ message: '상품 이름은 필수 입력입니다.' })
    .max(20, { message: '상품명은 최대 20자까지 입력 가능합니다.' }),
  categoryName: z.string({ message: '카테고리를 선택해주세요.' }),
  desc: z
    .string({ message: '상품 설명은 필수 입력입니다.' })
    .min(10, { message: '최소 10자 이상 적어주세요.' }),
  image: z.string({ message: '이미지를 업로드해 주세요' }),
  categoryId: z.number(),
});

interface AddProductModalProps {
  triggerButton: React.ReactNode;
}
interface FieldError {
  message: string;
  value: string;
}
interface ServerErrorResponse {
  message: string;
  details?: Record<string, FieldError>;
}

function isServerError(error: unknown): error is { response: { data: ServerErrorResponse } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    'data' in (error as { response: any }).response
  );
}

export default function AddProductModal({ triggerButton }: AddProductModalProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [descLength, setDescLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const uploadImageMutation = useUploadImage();
  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  const watchedName = useDebounce(
    useWatch({
      control: form.control,
      name: 'name',
      defaultValue: '', // Provide a default value to avoid undefined
    }),
    100,
  );
  // 상품명 중복 체크
  const {
    data,
    isLoading: queryLoading,
    isError: queryError,
  } = useDataQuery<ProductsListResponse>(
    ['products', 'searchSuggestions', form.getValues('name')],
    '/products',
    {
      staleTime: 60 * 1000,
    },
    { keyword: form.getValues('name') },
  );
  function isProductNameDuplicate(name: string): boolean {
    return data ? data.list.some((product: { name: string }) => product.name === name) : false;
  }

  const handleNameBlur = async () => {
    if (watchedName) {
      const isDuplicate = isProductNameDuplicate(watchedName);
      if (isDuplicate) {
        form.setError('name', { type: 'manual', message: '이미 등록된 상품명입니다.' });
        return;
      } else {
        form.clearErrors('name'); // 중복이 아니고 값이 있음
        return;
      }
    } else {
      form.setError('name', { type: 'manual', message: '상품 이름은 필수 입력입니다.' });
      return;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', renameFileWithExtension(file));
        const response = await uploadImageMutation.mutateAsync(formData);
        setImageUrl(response.url);
        form.setValue('image', response.url);
        form.clearErrors('image');
      } catch (error) {
        toast.error('이미지 업로드 중 오류가 발생했습니다.');
      }
    }
  };

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {
      const { name, desc, image, categoryId } = formData;

      const updatedData = { name, description: desc, image, categoryId };
      const response = await createProduct(updatedData);
      toast.success('상품이 성공적으로 업데이트되었습니다.');
      router.push(`/product/${response.id}`); // 상품 상세 페이지로 이동

      // 폼 리셋
      form.reset();
      setImageUrl('');
      setDescLength(0);
      setIsOpen(false);
    } catch (error) {
      if (isServerError(error)) {
        const errorData = error.response.data;

        let errorMessage = '상품 추가 중 오류가 발생했습니다.';

        if (errorData.details) {
          const fieldErrors = Object.values(errorData.details);
          if (fieldErrors.length > 0 && fieldErrors[0].message) {
            errorMessage = fieldErrors[0].message;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        toast.error(errorMessage);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              {/* 상품 이미지 */}
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
                              backgroundImage: imageUrl ? `url(${imageUrl})` : field.value,
                            }}
                          >
                            {!imageUrl && (
                              <div className="text-gray-600 text-[24px] md:text-[25px] lg:text-[34px]">
                                <BiImageAdd />
                              </div>
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
                {/* 상품명 */}
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
                {/* 카테고리 */}
                <FormField
                  control={form.control}
                  name="categoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CategorySelector
                          initialValue={
                            form.getValues('categoryName')
                              ? {
                                  name: form.getValues('categoryName'),
                                  id: form.getValues('categoryId'),
                                }
                              : undefined
                          }
                          onChange={(value) => {
                            form.setValue('categoryId', value.id);
                            form.setValue('categoryName', value.name);
                          }}
                          onSelectOption={() => {
                            form.clearErrors('categoryName');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* 상품 설명 */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="상품 설명을 입력해 주세요"
                        className="h-[120px] smd:h-[160px]"
                        maxLength={500}
                        onChange={(e) => {
                          field.onChange(e);
                          setDescLength(e.target.value.length);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="absolute bottom-5 right-5 text-sm text-gray-600">
                      {descLength}/500
                    </FormDescription>
                  </div>
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
              disabled={isCreating}
            >
              {isCreating ? '저장 중..' : '추가하기'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
