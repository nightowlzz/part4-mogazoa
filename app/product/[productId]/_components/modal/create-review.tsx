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

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import CategoryTag from '@/components/ui/tags/CategoryTag';
import { Textarea } from '@/components/ui/textarea';
import {
  MAX_REVIEW_IMAGES_LENGTH,
  MAX_TEXTAREA_LENGTH,
  MIN_TEXTAREA_LENGTH,
} from '@/constants/limit';
import { useUploadImage } from '@/hooks/image';
import { usePostReview } from '@/hooks/review';
import { PostReviewRequest } from '@/types/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import ImageUpload from './components/image-upload';
import StarRating from './components/star-rating';
import { limitText, limitTextLength, renameFileWithExtension } from '@/utils/textUtils';

interface ReviewProps {
  children: React.ReactNode;
  productId: number;
  categoryName: string;
  categoryId: number;
  name: string;
}
const FormSchema = z.object({
  rating: z.number(),
  content: z
    .string()
    .min(MIN_TEXTAREA_LENGTH, { message: `최소 ${MIN_TEXTAREA_LENGTH}자 이상 적어주세요` }),
  images: z.array(z.string()),
});

export default function CreateReview({
  productId,
  children,
  categoryName,
  categoryId,
  name,
}: ReviewProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const uploadImage = useUploadImage();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: 5,
      content: '',
      images: [],
    },
  });

  const reviewMutation = usePostReview({
    onSuccess: () => {
      toast.success('리뷰가 작성 되었습니다');
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: () => {
      toast.error('리뷰가 작성에 실패하였습니다. 다시 작성해 주세요.');
    },
  });

  // 멀티이미지 등록
  const handlerImageFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const nowFile = e.target.files;
    const prevFile = form.getValues('images');
    const nowFileLength = nowFile.length;
    const prevFileLength = prevFile.length;

    if (prevFileLength === 0 && nowFileLength > MAX_REVIEW_IMAGES_LENGTH) {
      toast.warning(`최대 ${MAX_REVIEW_IMAGES_LENGTH}장 까지만 가능합니다.`);
    }

    if (prevFileLength > 0 && prevFileLength + nowFileLength > MAX_REVIEW_IMAGES_LENGTH) {
      toast.warning(
        `선택하신 파일 중 ${MAX_REVIEW_IMAGES_LENGTH - prevFileLength}개 이미지만 추가 됩니다.`,
      );
    }

    const InputFiles: File[] = Array.from(nowFile).slice(
      0,
      MAX_REVIEW_IMAGES_LENGTH - prevFileLength,
    );
    const ScreenViews: string[] = InputFiles.map((_, i) => URL.createObjectURL(InputFiles[i]));
    form.setValue('images', [...prevFile, ...ScreenViews]);
    setSelectedFiles((prev) => (prev ? [...prev, ...InputFiles] : InputFiles));
  };

  // 멀티이미지 삭제
  const handleImageDelete = ({ index }: { index: string }) => {
    const InputFiles = selectedFiles.filter((_, i) => String(i) !== index);
    const ScreenViews = form.getValues('images').filter((_, i) => String(i) !== index);
    form.setValue('images', ScreenViews);
    setSelectedFiles(InputFiles);
  };

  // image api
  const uploadSelectedImages = async () => {
    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('image', renameFileWithExtension(file));

      try {
        const res = await uploadImage.mutateAsync(formData);
        uploadedUrls.push(res.url);
      } catch (err) {
        console.error(err);
      }
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const uploadedUrls = await uploadSelectedImages();

    const result: PostReviewRequest = {
      productId: Number(productId),
      images: uploadedUrls,
      content: data.content,
      rating: data.rating,
    };

    // POST
    try {
      reviewMutation.mutate(result);
      form.reset();
      setSelectedFiles([]);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogDescription className="hidden">review form content</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-[10px]">
            <CategoryTag categoryName={categoryName} categoryId={categoryId} />
            {name}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-hidden">
          <Form {...form}>
            <form
              className="w-full space-y-2 md:space-y-4 lg:space-y-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <StarRating
                        rating={field.value}
                        onStarClick={(index: number) => form.setValue('rating', index + 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder={`최소 ${MIN_TEXTAREA_LENGTH}자 이상 작성해 주세요`}
                          {...field}
                          onChange={(e) => {
                            const trimmedText = limitText({ text: e.target.value });
                            field.onChange(trimmedText);
                          }}
                        />
                        <span className="absolute bottom-5 right-5 text-sm text-gray-600 bg-black-450 px-1">
                          {`${limitTextLength({ text: form.getValues().content })}/${MAX_TEXTAREA_LENGTH}`}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        preview={form.getValues('images')}
                        handlerImageFiles={handlerImageFiles}
                        handleImageDelete={handleImageDelete}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={form.handleSubmit(onSubmit)}
              aria-label="Close"
            >
              저장하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
