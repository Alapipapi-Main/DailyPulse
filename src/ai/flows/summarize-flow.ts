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

    // Clean the content: remove NewsAPI's truncation marker, e.g., " ... [+1234 chars]"
    let cleanedContent = input.content.replace(/\s*\[\+\d+\s+chars\]$/, '').trim();

    // If the text ends with '...', remove it and add a period to ensure it's a complete sentence.
    if (cleanedContent.endsWith('...')) {
      cleanedContent = cleanedContent.slice(0, -3).trim() + '.';
    }

    // A regex to split sentences, handling different punctuation.
    const sentences = cleanedContent.match(/[^.!?]+[.!?]+/g);

    if (!sentences || sentences.length === 0) {
        // No sentences found, return the original content.
        return { summary: cleanedContent };
    }
    
    // Take the first 3 sentences, join them, and trim any leading/trailing space.
    const summary = sentences.slice(0, 3).join(' ').trim();

    return {
        summary,
    };
}
