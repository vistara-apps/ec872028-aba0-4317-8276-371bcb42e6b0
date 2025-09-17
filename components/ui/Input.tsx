'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'text' | 'number' | 'email';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'text', type, ...props }, ref) => {
    const baseClasses = 'flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';

    return (
      <input
        type={type || variant}
        className={cn(baseClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
