'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const labelVariants = cva('', {
  variants: {
    variant: {
      default:
        'text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base',
      file: 'absolute right-[1px] top-[1px] w-full h-full flex items-center justify-center cursor-pointer rounded-lg bg-[#252530] border border-[#353542] bg-center bg-cover bg-no-repeat z-[1]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, style, variant, ...props }, ref) => {
  const combinedStyle =
    variant === 'file'
      ? { ...style, width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }
      : style;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant }), className)}
      style={combinedStyle}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
