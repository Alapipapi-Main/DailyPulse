export const categories = [
  "Technology",
  "AI",
  "Sports",
  "Business",
  "Gaming",
  "Education",
  "Health",
] as const;

export type Category = (typeof categories)[number];

export type Article = {
  id: string;
  headline: string;
  content: string;
  source: string;
  publishedAt: string; // ISO 8601 date string
  category: Category;
  imageUrl: string;
  imageHint: string;
};
