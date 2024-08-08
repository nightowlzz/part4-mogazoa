'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/nextauth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiEyeSlashLight, PiEyeThin } from 'react-icons/pi';
import { z } from 'zod';
import SocialLogin from '../_components/social-login';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});
type FormValues = z.infer<typeof FormSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await login(values.email, values.password);
      if (result?.ok) {
        toast.success('로그인에 성공했습니다.');
        router.push('/');
      } else {
        toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="relative py-[60px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full items- justify-between md:justify-start gap-[30px] md:gap-[40px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 입력해주세요"
                      {...field}
                    />
                    <Button
                      asChild
                      variant="icon"
                      size="auto"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="absolute top-2.5 md:top-5 right-4">
                        {showPassword ? (
                          <PiEyeSlashLight
                            color={'#9FA6B2'}
                            size={22}
                            className="hover:fill-[#ddd]"
                          />
                        ) : (
                          <PiEyeThin color={'#9FA6B2'} size={22} className="hover:fill-[#ddd]" />
                        )}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="default" className="mt-[60px]">
            로그인
          </Button>
        </form>
      </Form>
      <SocialLogin />
    </div>
  );
}
