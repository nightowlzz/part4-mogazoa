import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full text-white rounded-lg resize-none border outline-none border-[#353542] focus:border-blue bg-[#252530] p-5 pb-12 text-sm ring-offset-background placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
