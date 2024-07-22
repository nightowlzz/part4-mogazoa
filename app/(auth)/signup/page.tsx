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
import { useSignUp } from '@/hooks/auth';
import { useAuth } from '@/hooks/nextauth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiEyeSlashLight, PiEyeThin } from 'react-icons/pi';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { login } = useAuth();

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
    onSuccess: async () => {
      toast.success('회원가입에 성공했습니다.');
      try {
        const loginResult = await login(form.getValues('email'), form.getValues('password'));
        if (loginResult?.ok) {
          router.push('/');
        } else {
          router.push('/signin');
        }
      } catch (error) {
        router.push('/signin');
      }
    },
    onError: (error) => {
      toast.error((error.response?.data as any)?.message);
    },
  });

  const onSubmit = (values: FormValues) => {
    signUpMutation.mutate(values);
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
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임을 입력해 주세요" {...field} />
                </FormControl>
                {!form.formState.errors.nickname && (
                  <p className="text-xs md:text-sm text-gray-600 text-muted-foreground mt-0">
                    최대 10자 가능
                  </p>
                )}
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
                {!form.formState.errors.password && (
                  <p className="text-xs md:text-sm text-gray-600 text-muted-foreground mt-0">
                    최소 8자 이상
                  </p>
                )}
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
                      <span className="absolute top-2.5 md:top-5 right-4">
                        {showPasswordConfirmation ? (
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
        가입하기
      </Button>
    </div>
  );
}
