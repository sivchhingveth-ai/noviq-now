'use client';

import { useState, useEffect, startTransition } from 'react';
import { Article, Category } from '@/lib/types';
import { fetchArticles } from '@/lib/api';
import { generateId } from '@/lib/utils';

export function useNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchArticles(category, searchQuery).then((data) => {
      if (!cancelled) {
        startTransition(() => {
          setArticles(data);
          setIsLoading(false);
        });
      }
    });
    return () => { cancelled = true; };
  }, [category, searchQuery]);

  useEffect(() => {
    if (category !== 'all' || searchQuery) return;

    const interval = setInterval(() => {
      setArticles((prev) => {
        const randomIdx = Math.floor(Math.random() * prev.length);
        const article = prev[randomIdx];
        if (!article || article.isNew) return prev;

        const updated = { ...article, isNew: true, id: generateId() };
        return [updated, ...prev.filter((a) => a.id !== article.id)];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [category, searchQuery]);

  const changeCategory = (cat: Category) => {
    setCategory(cat);
    setSearchQuery('');
  };

  const search = (query: string) => {
    setSearchQuery(query);
    if (query) setCategory('all');
  };

  const newCount = articles.filter((a) => a.isNew).length;

  return {
    articles,
    category,
    searchQuery,
    isLoading,
    newCount,
    changeCategory,
    search,
  };
}
