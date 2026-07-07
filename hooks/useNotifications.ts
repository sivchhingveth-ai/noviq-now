'use client';

import { useState, useCallback } from 'react';

export function useNotifications(newCount: number) {
  const [, setUnseenCount] = useState(0);

  const markSeen = useCallback(() => {
    setUnseenCount(0);
  }, []);

  const currentCount = Math.max(0, newCount);

  return { unseenCount: currentCount, markSeen };
}
