'use client';

import { cn } from '@/lib/utils';

export function PulsingDot({ className, color }: { className?: string; color?: string }) {
  const dotColor = color || 'bg-accent';
  return (
    <span className={cn('relative flex h-2.5 w-2.5', className)}>
      <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 pulse-live', dotColor)} />
      <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full', dotColor)} />
    </span>
  );
}
