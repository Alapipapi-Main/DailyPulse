'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Newspaper } from 'lucide-react';
import { Article } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { summarizeArticle } from '@/ai/flows/summarize-flow';

interface SummarizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article;
}

export function SummarizeDialog({ open, onOpenChange, article }: SummarizeDialogProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const getSummary = async () => {
        setIsLoading(true);
        setError('');
        setSummary('');
        try {
          // The new summarizeArticle function is very fast, but we keep the async structure.
          const result = await summarizeArticle({ content: article.content });
          setSummary(result.summary);
        } catch (err) {
          console.error(err);
          setError('Failed to generate summary.');
        } finally {
          setIsLoading(false);
        }
      };
      getSummary();
    }
  }, [open, article]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            Article Summary
          </DialogTitle>
          <DialogDescription>
            A quick summary of the article.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex items-start gap-4 rounded-lg border bg-card p-4">
                <Newspaper className="h-6 w-6 text-muted-foreground mt-1" />
                <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{article.headline}</h3>
                    <p className="text-sm text-muted-foreground">{article.source}</p>
                </div>
            </div>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {summary && <p className="text-base leading-relaxed text-foreground">{summary}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
