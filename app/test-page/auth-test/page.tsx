'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSignIn, useSignUp } from '@/hooks/auth';
import { SignUpRequest, SignInRequest } from '@/types/data';
import { setCookie } from '@/utils/cookieUtils';
import { Toaster, toast } from 'sonner';

interface FormFieldProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  rules?: object;
}

const FormField: React.FC<FormFieldProps> = ({ name, control, label, type = 'text', rules }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <div>
        <label htmlFor={name} className="block mb-1">
          {label}:
        </label>
        <input {...field} id={name} type={type} className="w-full px-3 py-2 border rounded" />
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    )}
  />
);

const AuthTestPage: React.FC = () => {
  const signIn = useSignIn({
    onSuccess: (data) => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken, 7);
        toast.success('Successfully signed in!');
      }
    },
  });

  const signUp = useSignUp({
    onSuccess: (data) => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken, 7);
        toast.success('Successfully signed up!');
      }
    },
  });

  const { control: controlSignIn, handleSubmit: handleSubmitSignIn } = useForm<SignInRequest>();
  const {
    control: controlSignUp,
    handleSubmit: handleSubmitSignUp,
    watch: watchSignUp,
  } = useForm<SignUpRequest>();

  const onSignInSubmit: SubmitHandler<SignInRequest> = (data) => {
    signIn.mutate(data);
  };

  const onSignUpSubmit: SubmitHandler<SignUpRequest> = (data) => {
    signUp.mutate(data);
  };

  const password = watchSignUp('password');

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Sign In</h2>
        <form onSubmit={handleSubmitSignIn(onSignInSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={controlSignIn}
            label="Email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            }}
          />
          <FormField
            name="password"
            control={controlSignIn}
            label="Password"
            type="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={signIn.isPending}
          >
            {signIn.isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
        <form onSubmit={handleSubmitSignUp(onSignUpSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={controlSignUp}
            label="Email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            }}
          />
          <FormField
            name="nickname"
            control={controlSignUp}
            label="Nickname"
            rules={{ required: 'Nickname is required' }}
          />
          <FormField
            name="password"
            control={controlSignUp}
            label="Password"
            type="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
          />
          <FormField
            name="passwordConfirmation"
            control={controlSignUp}
            label="Confirm Password"
            type="password"
            rules={{
              required: 'Please confirm your password',
              validate: (value: string) => value === password || 'The passwords do not match',
            }}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={signUp.isPending}
          >
            {signUp.isPending ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthTestPage;
