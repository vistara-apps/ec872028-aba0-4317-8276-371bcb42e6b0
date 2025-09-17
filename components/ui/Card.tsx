'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'flat';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', ...props }, ref) => {
    const baseClasses = 'bg-surface border border-border rounded-lg';
    
    const variants = {
      elevated: 'shadow-card',
      flat: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
