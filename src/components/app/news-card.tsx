'use client';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '@/lib/types';
import { useNewsStore } from '@/store/use-news-store';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const { isArticleSaved, toggleSaveArticle } = useNewsStore();
  const saved = isArticleSaved(article.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveArticle(article);
  };

  return (
    <Link href={article.id} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
            <Image
              src={article.imageUrl}
              alt={article.headline}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={article.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
             <div className="absolute top-3 right-3">
               <Badge variant="secondary">{article.category}</Badge>
             </div>
          </div>
          <div className="p-4 space-y-2 pb-2 absolute bottom-0">
            <CardTitle className="font-headline text-lg leading-tight text-white group-hover:underline">
              {article.headline}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{article.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="font-medium">{article.source}</span> &middot;{' '}
            <time dateTime={article.publishedAt}>
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </time>
          </div>
          <div className='flex items-center gap-1'>
             <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Read more <ExternalLink className="h-3 w-3" />
             </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkClick}
              aria-label={saved ? 'Unsave article' : 'Save article'}
              className={cn('text-muted-foreground hover:text-primary', saved && 'text-primary')}
            >
              <Bookmark className={cn('h-5 w-5', saved && 'fill-current')} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
