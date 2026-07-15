'use client';

import { useState, useCallback } from 'react';
import { Article, ChatMessage } from '@/lib/types';

export function useAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string, article?: Article) => {
      setError(null);
      const userMsg: ChatMessage = { role: 'user', text };

      // Show the clean text in the UI, but send the model the article context too.
      let promptText = text;
      if (article) {
        promptText = `[Article Context]\nTitle: ${article.title}\nSource: ${article.source}\nCategory: ${article.category}\nSummary: ${article.summary}\nFull Content: ${article.fullContent}\n\n[User Question]\n${text}`;
      }

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Send the conversation history so the assistant has context.
        const payload = [...messages, { role: 'user' as const, text: promptText }];

        const res = await fetch('/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to get response');

        setMessages((prev) => [...prev, { role: 'assistant', text: data.response }]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  const summarizeArticle = useCallback(
    async (article: Article) => {
      await sendMessage(
        [
          'Summarize this article in plain, easy-to-read language for a general reader. Use this exact structure:',
          '',
          'Start with one short line: **TL;DR:** followed by a single simple sentence.',
          'Then leave a blank line and give 4-6 bullet points (each starting with "- ").',
          'Each bullet should be ONE short, clear sentence covering a key fact, name, number, or piece of context.',
          'Use simple everyday words. If a technical or financial term is needed, explain it briefly in plain English.',
          'Do not leave out important points, but keep every sentence short and easy to follow.',
        ].join('\n'),
        article
      );
    },
    [sendMessage]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, summarizeArticle, clearChat };
}
