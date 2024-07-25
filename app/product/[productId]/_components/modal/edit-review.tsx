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
import { useUpdateReview } from '@/hooks/review';
import { UpdateReviewRequest } from '@/types/data';
import { limitText, limitTextLength } from '@/utils/textLimitUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import ImageUpload from './components/image-upload';
import StarRating from './components/star-rating';

type images = { id?: number; source?: string };

interface ReviewProps {
  children: React.ReactNode;
  productId: number;
  reviewId: number;
  categoryName: string;
  categoryId: number;
  productName: string;
  reviewImages?: images[];
  content: string;
  rating: number;
}

const FormSchema = z.object({
  rating: z.number(),
  content: z
    .string()
    .min(MIN_TEXTAREA_LENGTH, { message: `최소 ${MIN_TEXTAREA_LENGTH}자 이상 적어주세요` }),
  images: z.array(
    z.object({
      id: z.number().optional(),
      source: z.string().url().optional(),
    }),
  ),
});

export default function EditReview({
  children,
  reviewId,
  categoryName,
  categoryId,
  productName,
  reviewImages,
  content,
  rating,
}: ReviewProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: rating,
      content: content,
      images: reviewImages ? reviewImages : [],
    },
  });

  const uploadImage = useUploadImage();
  const reviewMutation = useUpdateReview(reviewId, {
    onSuccess: () => {
      toast.success('리뷰가 수정되었습니다');
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
    onError: () => {
      toast.error('리뷰 수정에 실패하였습니다. 다시 시도해 주세요.');
    },
  });

  // 이미지 파일 선택 핸들러
  const handlerImageFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const nowFile = e.target.files;
    const prevFile = form.getValues('images').filter((img) => img.source);
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

    const files: File[] = Array.from(nowFile).slice(0, MAX_REVIEW_IMAGES_LENGTH - prevFileLength);
    const views: { id?: number; source: string }[] = files.map((_, i) => ({
      source: URL.createObjectURL(files[i]),
    }));
    form.setValue('images', [...prevFile, ...views]);
    setSelectedFiles((prev) => (prev ? [...prev, ...files] : files));
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (id: number) => {
    console.log('id', id);

    const currentImages = form.getValues('images');
    const updatedImages = currentImages.filter((img) => img.id !== id);

    const updatedFiles = selectedFiles.filter((file, index) => {
      const image = currentImages[index];
      return image.id !== id;
    });

    form.setValue('images', updatedImages);
    setSelectedFiles(updatedFiles);
  };

  // 선택된 이미지를 업로드하는 함수
  const uploadSelectedImages = async () => {
    const uploadedUrls: { id?: number; source: string }[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await uploadImage.mutateAsync(formData);
        uploadedUrls.push({ source: res.url });
      } catch (err) {
        console.error(err);
      }
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const uploadedUrls = await uploadSelectedImages();
    const existingImages = data.images.filter((img) => img.id).map((img) => ({ id: img.id }));
    console.log('idList', existingImages);
    console.log('uploadedUrls', uploadedUrls);

    let finalImages = [...existingImages, ...uploadedUrls];

    const result: UpdateReviewRequest = {
      images: finalImages,
      content: data.content,
      rating: data.rating,
    };

    try {
      reviewMutation.mutate(result);
      form.reset();
      setSelectedFiles([]);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[660px]">
        <DialogDescription className="hidden">review form content</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-[10px]">
            <CategoryTag categoryName={categoryName} categoryId={categoryId} />
            {productName}
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
