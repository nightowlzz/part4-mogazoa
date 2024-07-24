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
import { useUpdateMyInfo } from '@/hooks/user';
import { useUploadImage } from '@/hooks/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const FormSchema = z.object({
  nickname: z.string().min(1, { message: '이름은 필수 입력입니다.' }),
  description: z.string().min(10, { message: '최소 10자 이상 적어주세요.' }),
  image: z.string().nullable(),
});

export interface MyInfoData {
  nickname: string;
  description: string;
  image: string | null;
}

export default function Profile({ nickname, description, image }: MyInfoData) {
  const [descLength, setDescLength] = useState(description.length);
  const [isSaving, setIsSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { description, nickname, image },
    mode: 'onBlur',
  });

  const uploadImageMutation = useUploadImage();
  const updateMyInfo = useUpdateMyInfo();

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
      setIsSaving(true);
      const { description, nickname, image } = formData;
      const updatedData = {
        description,
        nickname,
        image,
      };
      await updateMyInfo.mutateAsync(updatedData);

      await queryClient.invalidateQueries({ queryKey: ['myInfo'] });

      setIsOpen(false);

      toast.success('프로필이 성공적으로 업데이트되었습니다.');
    } catch (error) {
      toast.error('프로필 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>프로필 편집</Button>
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
                        <Input
                          id="profilePicture"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {/* label bg로 image 보이게*/}
                        <FormLabel
                          htmlFor="profilePicture"
                          variant="file"
                          style={{
                            backgroundImage: imageUrl ? `url(${imageUrl})` : `url(${field.value})`,
                          }}
                        ></FormLabel>
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
                    <Input {...field} placeholder="닉네임을 입력해 주세요" />
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
                      {...field}
                      placeholder="프로필 설명을 입력해 주세요"
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
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid || isSaving}
            >
              {isSaving ? '저장 중..' : '저장하기'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
