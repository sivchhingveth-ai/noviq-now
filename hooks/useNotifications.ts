'use client';

import { useState, useCallback } from 'react';

export function useNotifications(newCount: number) {
  const [seenCount, setSeenCount] = useState(0);

  const markSeen = useCallback(() => {
    setSeenCount(newCount);
  }, [newCount]);

  const unseenCount = Math.max(0, newCount - seenCount);

  return { unseenCount, markSeen };
}
