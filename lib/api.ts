import { Article, Category } from './types';
import { mockArticles } from './mockData';

// TODO: Replace mock data with real API call
// import { NEWS_API_KEY } from './config';
// const API_BASE = 'https://newsapi.org/v2';

export async function fetchArticles(
  category?: Category,
  query?: string
): Promise<Article[]> {
  // --- MOCK IMPLEMENTATION ---
  // When a real API key is available, replace this block with:
  //   const params = new URLSearchParams({ apiKey: NEWS_API_KEY, q: query, category, ... });
  //   const res = await fetch(`${API_BASE}/top-headlines?${params}`);
  //   const data = await res.json();
  //   return data.articles.map(mapApiToArticle);

  let articles = [...mockArticles];

  if (category && category !== 'all') {
    articles = articles.filter((a) => a.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
    );
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function fetchBreakingHeadlines(): Promise<Article[]> {
  return mockArticles
    .filter((a) => a.isLive)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
