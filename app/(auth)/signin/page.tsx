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
import { useSignIn } from '@/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiEyeSlashLight, PiEyeThin } from 'react-icons/pi';
import { z } from 'zod';
import SocialLogin from '../_components/social-login';

const FormSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});
type FormValues = z.infer<typeof FormSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInMutation = useSignIn({
    onSuccess: () => {
      console.log('로그인 성공:');
    },
    onError: () => {
      console.error('로그인 실패:');
    },
  });

  const onSubmit = (values: FormValues) => {
    signInMutation.mutate(values);
  };

  return (
    <div className="relative">
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
        </form>
      </Form>
      <Button variant="default" className="mt-[60px]" onClick={form.handleSubmit(onSubmit)}>
        로그인
      </Button>
      <SocialLogin />
    </div>
  );
}
