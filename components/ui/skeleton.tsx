import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

/**
 * Reusable skeleton placeholder with customizable dimensions.
 * Uses CSS variables (--skeleton-bg, --skeleton-shimmer) for colors/animation.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.25rem',
  className = '',
  ...props
}) => {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius,
    background: 'var(--skeleton-bg, #e0e0e0)',
    animation: 'var(--skeleton-shimmer, pulse 1.5s ease-in-out infinite)'
  };
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      style={style}
      {...props}
    />
  );
};

export { Skeleton };
