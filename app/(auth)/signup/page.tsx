'use client';

import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PiEyeSlashLight, PiEyeThin } from 'react-icons/pi';
import { useState } from 'react';
import { z } from 'zod';
import { useSignUp } from '@/hooks/auth';

const FormSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
    password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    passwordConfirmation: z.string(),
    nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

type FormValues = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: '',
    },
  });

  const signUpMutation = useSignUp({
    onSuccess: () => {
      console.log('회원가입 성공:');
    },
    onError: () => {
      console.error('회원가입 실패:');
    },
  });

  const onSubmit = (values: FormValues) => {
    signUpMutation.mutate(values);
  };

  return (
    <div className="flex flex-col min-h-screen bg-BgBlack">
      <div className="bg-white fixed h-[70px] w-full z-10"></div>
      <div className="flex-grow flex items-center justify-center p-4 pt-[70px]">
        <div className="w-full max-w-[335px] relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px] pb-[120px]">
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
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input placeholder="닉네임을 입력해 주세요" {...field} />
                    </FormControl>
                    <FormDescription>최대 10자 가능</FormDescription>
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
                          <span className="absolute top-2.5 md:top-5 right-5">
                            {showPassword ? (
                              <PiEyeSlashLight
                                color={'#9FA6B2'}
                                size={22}
                                className="hover:fill-[#ddd]"
                              />
                            ) : (
                              <PiEyeThin
                                color={'#9FA6B2'}
                                size={22}
                                className="hover:fill-[#ddd]"
                              />
                            )}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>최소 8자 이상</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPasswordConfirmation ? 'text' : 'password'}
                          placeholder="비밀번호를 다시 입력해주세요"
                          {...field}
                        />
                        <Button
                          asChild
                          variant="icon"
                          size="auto"
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                          type="button"
                        >
                          <span className="absolute top-2.5 md:top-5 right-5">
                            {showPasswordConfirmation ? (
                              <PiEyeSlashLight
                                color={'#9FA6B2'}
                                size={22}
                                className="hover:fill-[#ddd]"
                              />
                            ) : (
                              <PiEyeThin
                                color={'#9FA6B2'}
                                size={22}
                                className="hover:fill-[#ddd]"
                              />
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
          <div className="fixed bottom-10 left-0 right-0 flex justify-center">
            <Button
              type="submit"
              variant="default"
              size="default"
              className="w-full max-w-[335px]"
              onClick={form.handleSubmit(onSubmit)}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
