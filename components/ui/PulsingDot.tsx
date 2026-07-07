'use client';

import { cn } from '@/lib/utils';

export function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative flex h-2.5 w-2.5', className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 pulse-live" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
    </span>
  );
}
