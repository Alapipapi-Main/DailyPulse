'use server';

import { type Article, type Category } from './types';
import { summarizeArticle } from '@/ai/flows/summarize-flow';
import { PlaceHolderImages } from './placeholder-images';

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// Map our app's categories to valid NewsAPI categories where possible
const categoryMapping: Partial<Record<Category, string>> = {
  Technology: 'technology',
  Sports: 'sports',
  Business: 'business',
  Health: 'health',
};

async function fetchNewsForCategory(category: Category): Promise<Article[]> {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("News API key is missing. Please add it to your .env file for local development, or configure it in your deployment environment.");
    return [];
  }

  // Use the specific category endpoint if available, otherwise use the general query
  const apiCategory = categoryMapping[category];
  const endpoint = apiCategory ? `top-headlines?category=${apiCategory}` : `everything?q=${encodeURIComponent(category)}`;
  const url = `${BASE_URL}/${endpoint}&apiKey=${API_KEY}&pageSize=10&language=en`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching news for ${category}:`, errorData.message);
      return [];
    }

    const data = await response.json();
    const placeholder = PlaceHolderImages[0];

    const articles: Article[] = data.articles
      .map((article: any, index: number): Article | null => {
        if (!article.title || !article.content || !article.url) {
          return null;
        }

        return {
          id: article.url,
          headline: article.title,
          content: article.description || article.content,
          source: article.source.name,
          publishedAt: article.publishedAt,
          category: category,
          imageUrl: article.urlToImage
            ? article.urlToImage.replace(/^http:/, 'https:')
            : placeholder.imageUrl,
          imageHint: article.urlToImage ? category.toLowerCase() : placeholder.imageHint,
        };
      })
      .filter((article: Article | null): article is Article => article !== null);

      const summarizedArticles = await Promise.all(
        articles.map(async (article) => {
            const summaryData = await summarizeArticle({ content: article.content });
            return {
                ...article,
                content: summaryData.summary
            };
        })
    );
    
    return summarizedArticles;

  } catch (error) {
    console.error(`Failed to fetch news for ${category} from API:`, error);
    return [];
  }
}

export async function getNewsArticles(interests: Category[]): Promise<Article[]> {
    if (interests.length === 0) {
        return [];
    }

    const allArticlePromises = interests.map(fetchNewsForCategory);
    const articlesByCategory = await Promise.all(allArticlePromises);

    const flattenedArticles = articlesByCategory.flat();

    // De-duplicate articles using a Map to ensure unique IDs (URLs). This is the robust way.
    const uniqueArticles = Array.from(
        flattenedArticles.reduce((map, article) => map.set(article.id, article), new Map<string, Article>()).values()
    );

    // Shuffle the unique articles to mix categories in the feed
    return uniqueArticles.sort(() => 0.5 - Math.random());
}
