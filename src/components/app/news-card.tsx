'use client';
import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/types';
import { useNewsStore } from '@/store/use-news-store';
import { summarizeArticleAction } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const { isArticleSaved, toggleSaveArticle } = useNewsStore();
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { toast } = useToast();

  const saved = isArticleSaved(article.id);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeArticleAction(article.content);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: result.error,
      });
    } else {
      setSummary(result.summary);
    }
    setIsSummarizing(false);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.headline}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={article.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 space-y-2 pb-2">
          <Badge variant="secondary">{article.category}</Badge>
          <CardTitle className="font-headline text-lg leading-tight">
            {article.headline}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        {summary ? (
          <p className="text-sm text-muted-foreground">{summary}</p>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="w-full"
          >
            {isSummarizing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4 text-accent-foreground" style={{ color: 'hsl(var(--accent))' }}/>
            )}
            Summarize with AI
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">{article.source}</span> &middot;{' '}
          <time dateTime={article.publishedAt}>
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </time>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleSaveArticle(article)}
          aria-label={saved ? 'Unsave article' : 'Save article'}
          className={cn('text-muted-foreground hover:text-primary', saved && 'text-primary')}
        >
          <Bookmark className={cn(saved && 'fill-current')} />
        </Button>
      </CardFooter>
    </Card>
  );
}
