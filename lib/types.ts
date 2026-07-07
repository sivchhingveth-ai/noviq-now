export type Category =
  | 'all'
  | 'tech'
  | 'world'
  | 'business'
  | 'sports'
  | 'science'
  | 'war'
  | 'health'
  | 'entertainment'
  | 'politics'
  | 'climate';

export interface Article {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  source: string;
  sourceLogo: string;
  category: Category;
  imageUrl: string;
  publishedAt: string;
  url: string;
  isLive: boolean;
  isNew: boolean;
}
