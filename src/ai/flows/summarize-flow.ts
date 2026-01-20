'use server';

import {
  type ArticleSummaryInput,
  type ArticleSummaryOutput,
} from '@/lib/types';

export async function summarizeArticle(input: ArticleSummaryInput): Promise<ArticleSummaryOutput> {
    // This is a non-AI summarization. It takes the first 3 sentences of the content.
    if (!input.content) {
        return { summary: "No content available to summarize." };
    }

    // A regex to split sentences, handling different punctuation.
    const sentences = input.content.match(/[^.!?]+[.!?]+/g);

    if (!sentences || sentences.length === 0) {
        // No sentences found, return the original content.
        return { summary: input.content };
    }
    
    // Take the first 3 sentences, join them, and trim any leading/trailing space.
    const summary = sentences.slice(0, 3).join(' ').trim();

    return {
        summary,
    };
}
