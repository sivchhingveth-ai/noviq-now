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
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
        isBookmarked
          ? 'bg-accent/20 hover:bg-accent/30'
          : 'bg-black/40 hover:bg-black/60 backdrop-blur-sm'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4.5 w-4.5 text-accent" />
      ) : (
        <Bookmark className="h-4.5 w-4.5 text-white" />
      )}
    </motion.button>
  );
}
