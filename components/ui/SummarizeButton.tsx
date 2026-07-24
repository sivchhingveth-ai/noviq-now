'use client';

import Image from 'next/image';

interface SummarizeButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md';
}

export function SummarizeButton({ onClick, size = 'sm' }: SummarizeButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`active:scale-90 inline-flex items-center gap-1.5 rounded-lg bg-accent/10 text-accent transition-colors hover:bg-accent/20 ${
        size === 'sm' ? 'px-2.5 py-1 text-[11px] font-medium' : 'px-3 py-1.5 text-xs font-medium'
      }`}
    >
      <Image src="/icons/chat-ai.jpg" alt="AI" width={14} height={14} className={`rounded ${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} unoptimized />
      Summarize
    </button>
  );
}
