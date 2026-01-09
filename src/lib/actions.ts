'use server';

import { summarizeArticle } from '@/ai/flows/summarize-news-articles';

export async function summarizeArticleAction(articleContent: string) {
  try {
    const result = await summarizeArticle({ articleContent });
    return { summary: result.summary, error: null };
  } catch (e) {
    console.error(e);
    return { summary: null, error: 'Failed to summarize the article. Please try again later.' };
  }
}
