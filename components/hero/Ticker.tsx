'use client';

import { Zap } from 'lucide-react';

interface TickerProps {
  headlines: string[];
}

export function Ticker({ headlines }: TickerProps) {
  const duplicated = [...headlines, ...headlines];

  return (
    <div className="relative border-y border-glass-border bg-glass/50 py-3 overflow-hidden">
      <div className="absolute left-0 top-0 z-10 flex h-full w-16 items-center justify-center bg-gradient-to-r from-surface to-transparent">
        <Zap className="h-4 w-4 text-accent" />
      </div>

      <div className="flex whitespace-nowrap ticker-animate">
        {duplicated.map((headline, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-text-secondary inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            {headline}
          </span>
        ))}
      </div>

      <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-surface to-transparent" />
    </div>
  );
}
