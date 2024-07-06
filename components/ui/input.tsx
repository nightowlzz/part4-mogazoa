import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const fileInput =
  'file:absolute file:border-0 file:bg-transparent file:text-sm  file:w-full file:p-0 file:md:h-full';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `${fileInput} flex w-full rounded-md border border-[#353542] focus:border-[#5097FA] focus:outline-none  bg-[#252530] px-5 py-2 text-sm text-white ring-offset-background placeholder:text-[#6E6E82] disabled:cursor-not-allowed disabled:opacity-50 md:text-base`,
          {
            'h-[50px] md:h-[70px]': type !== 'file',
            'md:h-full': type === 'file',
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
