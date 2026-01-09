import { categories, type Article, type Category } from './types';

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

async function fetchNews(
  interests: Category[]
): Promise<Article[]> {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    console.error("News API key is missing. Please add it to your .env file.");
    return [];
  }

  const query = interests.length > 0 ? interests.join(' OR ') : categories.join(' OR ');

  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&pageSize=20&language=en&sortBy=publishedAt`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching news:', errorData.message);
      return [];
    }

    const data = await response.json();
    
    // The free developer plan on NewsAPI doesn't allow specifying categories in the query in a structured way for top-headlines.
    // So we fetch a broad query and then assign categories somewhat randomly for demonstration.
    // A real app with a paid plan could do this more robustly.
    return data.articles
      .map((article: any, index: number): Article | null => {
        // Filter out articles without essential data
        if (!article.title || !article.urlToImage || !article.content) {
          return null;
        }

        const category = interests.length > 0
          ? interests[index % interests.length]
          : categories[index % categories.length];

        return {
          id: article.url,
          headline: article.title,
          content: article.description || article.content,
          source: article.source.name,
          publishedAt: article.publishedAt,
          category: category,
          imageUrl: article.urlToImage,
          imageHint: category.toLowerCase(),
        };
      })
      .filter((article: Article | null): article is Article => article !== null); // Filter out the nulls

  } catch (error) {
    console.error('Failed to fetch news from API:', error);
    return [];
  }
}


export async function getNewsArticles(interests: Category[]): Promise<Article[]> {
  // In a real app, this would be an API call.
  return await fetchNews(interests);
}
