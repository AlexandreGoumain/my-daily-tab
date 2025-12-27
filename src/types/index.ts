export interface RSSFeed {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  feeds: RSSFeed[];
  isCustom: boolean;
  enabled: boolean;
}

export interface Article {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  sourceUrl: string;
  categoryId: string;
  image?: string;
  isRead: boolean;
  isBookmarked: boolean;
  isFavorite: boolean;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  layout: 'grid' | 'list' | 'compact';
  searchEngine: 'google' | 'duckduckgo' | 'bing';
  refreshInterval: number; // in minutes
}

export interface Shortcut {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export type ActiveCategory = 'all' | string;
