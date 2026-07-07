'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-4 w-4 text-text-secondary pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search news..."
        className="h-10 w-48 rounded-xl bg-transparent border border-glass-border pl-9 pr-8 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all lg:w-64"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:text-text-primary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
