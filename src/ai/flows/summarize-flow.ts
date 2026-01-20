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

    const sentences = input.content.split('. ');
    let summary = sentences.slice(0, 3).join('. ');

    // Ensure the summary ends with a period if it's not empty and was truncated.
    if (sentences.length > 3 && summary) {
        summary += '.';
    } else if (summary && !summary.endsWith('.')) {
        // If there are 3 or fewer sentences, it might not end with a period.
        const lastChar = input.content.trim().slice(-1);
        if (lastChar === '.' || lastChar === '?' || lastChar === '!') {
          // a complete sentence
        } else if (input.content.length > summary.length) {
          summary += '...';
        }
    }
    
    // Handle cases where content is very short or has no periods.
    if (!summary) {
        summary = input.content;
    }

    return {
        summary,
    };
}
