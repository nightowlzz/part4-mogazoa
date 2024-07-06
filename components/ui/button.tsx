import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import styled from '@/components/ui/styles/button.module.scss';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center w-full whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradation text-[#f1f1f5] md:text-base lg:text-lg font-semibold hover:bg-gradation-hover hover:from-[#353542] hover:to-[#353542] hover:text-[#6E6E82]',
        outline:
          'border border-[#9FA6B2] text-[#9FA6B2] md:text-base lg:text-lg hover:bg-transparent font-semibold hover:border-[#353542] hover:text-[#6E6E82]',
        outlineBlue: `${styled['gradient-button']}`,
        outlineRed:
          'border border-[#FF2F9F] text-[#FF2F9F] font-semibold md:text-base lg:text-lg hover:border-[#b91d71] hover:text-[#b91d71]',
        circleBlue:
          'bg-gradation-secondary text-[#f1f1f5] rounded-[50em] w-[60px] h-[50px] hover:bg-gradation-secondary-hover',
        nav: 'border text-[#6E6E82] border-transparent text-sm hover:border-[#353542] hover:bg-[#252530] hover:text-[#F1F1F5] font-semibold lg:text-base',
        text: 'text-[#f1f1f5] hover:text-[#ccc]',
        icon: 'p-1 cursor-pointer',
        iconBg: 'p-[5px] rounded-md bg-[#252530] cursor-pointer hover:bg-[#353542]',
      },
      size: {
        default: 'h-[50px] px-4 py-2 md:h-[55px] lg:h-[65px]', // 기본
        sm: 'h-[50px] rounded-lg px-3', // nav
        auto: 'h-auto w-auto', // icon
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
