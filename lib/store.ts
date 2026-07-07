const BOOKMARKS_KEY = 'pulsefeed_bookmarks';
const READ_KEY = 'pulsefeed_read';
const SEEN_KEY = 'pulsefeed_seen';

export function getBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setBookmarks(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
}

export function toggleBookmark(id: string): string[] {
  const bookmarks = getBookmarks();
  const next = bookmarks.includes(id)
    ? bookmarks.filter((b) => b !== id)
    : [...bookmarks, id];
  setBookmarks(next);
  return next;
}

export function getReadIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(READ_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setReadIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(READ_KEY, JSON.stringify(ids));
}

export function markAsRead(id: string): string[] {
  const read = getReadIds();
  if (!read.includes(id)) {
    const next = [...read, id];
    setReadIds(next);
    return next;
  }
  return read;
}

export function getSeenIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setSeenIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
}
