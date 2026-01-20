'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, Category } from '@/lib/types';

interface NewsState {
  interests: Category[];
  isOnboarded: boolean;
  savedArticles: Article[];
  articles: Article[];
  lastFetched: number | null;
  lastFetchedInterests: Category[];
  setInterests: (interests: Category[]) => void;
  setArticles: (articles: Article[], interests: Category[]) => void;
  finishOnboarding: () => void;
  isArticleSaved: (articleId: string) => boolean;
  toggleSaveArticle: (article: Article) => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      interests: [],
      isOnboarded: false,
      savedArticles: [],
      articles: [],
      lastFetched: null,
      lastFetchedInterests: [],
      setInterests: (interests) => set({ interests }),
      setArticles: (articles, interests) =>
        set({
          articles,
          lastFetched: Date.now(),
          lastFetchedInterests: interests,
        }),
      finishOnboarding: () => set({ isOnboarded: true }),
      isArticleSaved: (articleId) => {
        return get().savedArticles.some((a) => a.id === articleId);
      },
      toggleSaveArticle: (article) =>
        set((state) => {
          const isSaved = state.savedArticles.some((a) => a.id === article.id);
          const newSavedArticles = isSaved
            ? state.savedArticles.filter((a) => a.id !== article.id)
            : [...state.savedArticles, article];
          return { savedArticles: newSavedArticles };
        }),
    }),
    {
      name: 'news-storage', // unique name
    }
  )
);
