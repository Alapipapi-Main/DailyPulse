'use server';

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import {
  ArticleSummaryInputSchema,
  type ArticleSummaryInput,
  ArticleSummaryOutputSchema,
  type ArticleSummaryOutput,
} from '@/lib/types';


export async function summarizeArticle(input: ArticleSummaryInput): Promise<ArticleSummaryOutput> {
    return summarizeArticleFlow(input);
}

const prompt = ai.definePrompt(
  {
    name: 'summarizeArticlePrompt',
    input: { schema: ArticleSummaryInputSchema },
    output: { schema: ArticleSummaryOutputSchema },
    model: googleAI.model('gemini-1.5-flash'),
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
