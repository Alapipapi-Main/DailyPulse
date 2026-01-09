'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Article, Category } from '@/lib/types';

interface NewsState {
  interests: Category[];
  isOnboarded: boolean;
  savedArticles: Article[];
  setInterests: (interests: Category[]) => void;
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
      setInterests: (interests) => set({ interests }),
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
