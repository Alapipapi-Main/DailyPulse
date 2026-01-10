import { z } from 'zod';

export const categories = [
  "Technology",
  "AI",
  "Sports",
  "Business",
  "Gaming",
  "Education",
  "Health",
] as const;

export type Category = (typeof categories)[number];

export type Article = {
  id: string;
  headline: string;
  content: string;
  source: string;
  publishedAt: string; // ISO 8601 date string
  category: Category;
  imageUrl: string;
  imageHint: string;
};

export const ArticleSummaryInputSchema = z.object({
  content: z.string().describe('The full content of the news article to be summarized.'),
});
export type ArticleSummaryInput = z.infer<typeof ArticleSummaryInputSchema>;

export const ArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the article, around 3-4 sentences.'),
});
export type ArticleSummaryOutput = z.infer<typeof ArticleSummaryOutputSchema>;
