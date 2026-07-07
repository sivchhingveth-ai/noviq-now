'use client';

import { Category } from '@/lib/types';
import { motion } from 'framer-motion';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tech', label: 'Tech' },
  { value: 'world', label: 'World' },
  { value: 'business', label: 'Business' },
  { value: 'sports', label: 'Sports' },
  { value: 'science', label: 'Science' },
  { value: 'war', label: 'War & Conflict' },
  { value: 'health', label: 'Health' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'politics', label: 'Politics' },
  { value: 'climate', label: 'Climate' },
];

interface CategoryTabsProps {
  active: Category;
  onChange: (cat: Category) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className="relative px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors"
          style={{ color: active === cat.value ? 'var(--text-primary)' : 'var(--text-secondary)' }}
        >
          {active === cat.value && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 rounded-lg bg-white/10"
              style={{ background: 'var(--glass)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
