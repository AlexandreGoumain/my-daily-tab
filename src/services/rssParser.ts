import type { Article, RSSFeed } from '../types';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function extractImageFromContent(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch?.[1];
}

function parseRSSItem(item: Element, source: string, sourceUrl: string, categoryId: string): Article {
  const title = item.querySelector('title')?.textContent || 'Untitled';
  const link = item.querySelector('link')?.textContent || '';
  const description = item.querySelector('description')?.textContent ||
                      item.querySelector('content\\:encoded')?.textContent || '';
  const pubDate = item.querySelector('pubDate')?.textContent ||
                  item.querySelector('published')?.textContent ||
                  item.querySelector('updated')?.textContent ||
                  new Date().toISOString();

  // Try to extract image from various sources
  let image = item.querySelector('enclosure[type^="image"]')?.getAttribute('url') ||
              item.querySelector('media\\:content')?.getAttribute('url') ||
              item.querySelector('media\\:thumbnail')?.getAttribute('url') ||
              extractImageFromContent(description);

  // Clean description from HTML
  const cleanDescription = description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim()
    .slice(0, 300);

  return {
    id: `${categoryId}-${link}-${pubDate}`,
    title: title.trim(),
    link,
    description: cleanDescription,
    pubDate,
    source,
    sourceUrl,
    categoryId,
    image,
    isRead: false,
    isBookmarked: false,
    isFavorite: false,
  };
}

function parseAtomItem(item: Element, source: string, sourceUrl: string, categoryId: string): Article {
  const title = item.querySelector('title')?.textContent || 'Untitled';
  const link = item.querySelector('link')?.getAttribute('href') ||
               item.querySelector('link')?.textContent || '';
  const description = item.querySelector('summary')?.textContent ||
                      item.querySelector('content')?.textContent || '';
  const pubDate = item.querySelector('published')?.textContent ||
                  item.querySelector('updated')?.textContent ||
                  new Date().toISOString();

  const cleanDescription = description
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, 300);

  return {
    id: `${categoryId}-${link}-${pubDate}`,
    title: title.trim(),
    link,
    description: cleanDescription,
    pubDate,
    source,
    sourceUrl,
    categoryId,
    image: extractImageFromContent(description),
    isRead: false,
    isBookmarked: false,
    isFavorite: false,
  };
}

export async function fetchRSSFeed(feed: RSSFeed, categoryId: string): Promise<Article[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(feed.url)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/xml');

    // Check for parsing errors
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Failed to parse RSS feed');
    }

    // Detect feed type (RSS or Atom)
    const isAtom = doc.querySelector('feed') !== null;

    if (isAtom) {
      const entries = doc.querySelectorAll('entry');
      return Array.from(entries).map(entry =>
        parseAtomItem(entry, feed.name, feed.url, categoryId)
      );
    } else {
      const items = doc.querySelectorAll('item');
      return Array.from(items).map(item =>
        parseRSSItem(item, feed.name, feed.url, categoryId)
      );
    }
  } catch (error) {
    console.error(`Error fetching feed ${feed.name}:`, error);
    return [];
  }
}

export async function fetchCategoryFeeds(
  feeds: RSSFeed[],
  categoryId: string
): Promise<Article[]> {
  const enabledFeeds = feeds.filter(feed => feed.enabled);
  const results = await Promise.allSettled(
    enabledFeeds.map(feed => fetchRSSFeed(feed, categoryId))
  );

  const articles: Article[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  // Sort by date (newest first)
  return articles.sort((a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );
}
