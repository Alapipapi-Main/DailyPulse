'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ArticleSummaryInputSchema = z.object({
  content: z.string().describe('The full content of the news article to be summarized.'),
});
export type ArticleSummaryInput = z.infer<typeof ArticleSummaryInputSchema>;

export const ArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the article, around 3-4 sentences.'),
});
export type ArticleSummaryOutput = z.infer<typeof ArticleSummaryOutputSchema>;

export async function summarizeArticle(input: ArticleSummaryInput): Promise<ArticleSummaryOutput> {
    return summarizeArticleFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'summarizeArticlePrompt',
    input: { schema: ArticleSummaryInputSchema },
    output: { schema: ArticleSummaryOutputSchema },
    prompt: `You are a helpful assistant that summarizes news articles.
    
    Summarize the following article content into a clear and concise summary of about 3-4 sentences.
    
    Article Content:
    {{{content}}}
    `,
  }
);


const summarizeArticleFlow = ai.defineFlow(
  {
    name: 'summarizeArticleFlow',
    inputSchema: ArticleSummaryInputSchema,
    outputSchema: ArticleSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
