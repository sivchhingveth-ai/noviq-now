'use client';

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export function BookmarkButton({ isBookmarked, onToggle }: BookmarkButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-accent" />
      ) : (
        <Bookmark className="h-4 w-4 text-text-secondary" />
      )}
    </motion.button>
  );
}
