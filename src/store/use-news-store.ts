'use client';
import { create } from 'zustand';
import type { Article, Category } from '@/lib/types';

interface NewsState {
  interests: Category[];
  savedArticles: Article[];
  setInterests: (interests: Category[]) => void;
  isArticleSaved: (articleId: string) => boolean;
  toggleSaveArticle: (article: Article) => void;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  interests: ['Technology', 'AI'], // Default interests
  savedArticles: [],
  setInterests: (interests) => set({ interests }),
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
}));
