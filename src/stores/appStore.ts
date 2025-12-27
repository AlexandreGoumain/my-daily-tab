import { create } from 'zustand';
import type { Category, Article, Settings, Shortcut, ActiveCategory, RSSFeed } from '../types';
import { defaultCategories } from '../data/defaultCategories';
import {
  saveCategories,
  loadCategories,
  saveSettings,
  loadSettings,
  saveShortcuts,
  loadShortcuts,
  saveReadArticles,
  loadReadArticles,
  saveBookmarks,
  loadBookmarks,
  saveFavorites,
  loadFavorites,
} from '../services/storage';
import { fetchCategoryFeeds } from '../services/rssParser';

interface AppState {
  // Categories
  categories: Category[];
  activeCategory: ActiveCategory;

  // Articles
  articles: Article[];
  isLoading: boolean;
  lastFetch: number | null;

  // Settings
  settings: Settings;

  // Shortcuts
  shortcuts: Shortcut[];

  // Read/Bookmark/Favorite tracking
  readArticles: string[];
  bookmarkedArticles: string[];
  favoriteArticles: string[];

  // Actions - Categories
  setActiveCategory: (category: ActiveCategory) => void;
  toggleCategory: (categoryId: string) => void;
  toggleFeed: (categoryId: string, feedId: string) => void;
  addCustomCategory: (name: string, icon: string) => void;
  deleteCategory: (categoryId: string) => void;
  addFeedToCategory: (categoryId: string, feed: Omit<RSSFeed, 'id' | 'enabled'>) => void;
  removeFeedFromCategory: (categoryId: string, feedId: string) => void;

  // Actions - Articles
  fetchArticles: () => Promise<void>;
  markAsRead: (articleId: string) => void;
  toggleBookmark: (articleId: string) => void;
  toggleFavorite: (articleId: string) => void;

  // Actions - Settings
  updateSettings: (settings: Partial<Settings>) => void;

  // Actions - Shortcuts
  addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
  removeShortcut: (id: string) => void;
  updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;

  // Init
  initialize: () => void;
}

const defaultSettings: Settings = {
  theme: 'system',
  layout: 'grid',
  searchEngine: 'google',
  refreshInterval: 30,
};

const defaultShortcuts: Shortcut[] = [
  { id: 'github', name: 'GitHub', url: 'https://github.com' },
  { id: 'stackoverflow', name: 'Stack Overflow', url: 'https://stackoverflow.com' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com' },
];

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  categories: defaultCategories,
  activeCategory: 'all',
  articles: [],
  isLoading: false,
  lastFetch: null,
  settings: defaultSettings,
  shortcuts: defaultShortcuts,
  readArticles: [],
  bookmarkedArticles: [],
  favoriteArticles: [],

  // Category actions
  setActiveCategory: (category) => set({ activeCategory: category }),

  toggleCategory: (categoryId) => {
    const categories = get().categories.map((cat) =>
      cat.id === categoryId ? { ...cat, enabled: !cat.enabled } : cat
    );
    set({ categories });
    saveCategories(categories);
  },

  toggleFeed: (categoryId, feedId) => {
    const categories = get().categories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          feeds: cat.feeds.map((feed) =>
            feed.id === feedId ? { ...feed, enabled: !feed.enabled } : feed
          ),
        };
      }
      return cat;
    });
    set({ categories });
    saveCategories(categories);
  },

  addCustomCategory: (name, icon) => {
    const id = `custom-${Date.now()}`;
    const newCategory: Category = {
      id,
      name,
      icon,
      feeds: [],
      isCustom: true,
      enabled: true,
    };
    const categories = [...get().categories, newCategory];
    set({ categories });
    saveCategories(categories);
  },

  deleteCategory: (categoryId) => {
    const categories = get().categories.filter((cat) => cat.id !== categoryId);
    set({ categories });
    saveCategories(categories);
  },

  addFeedToCategory: (categoryId, feed) => {
    const categories = get().categories.map((cat) => {
      if (cat.id === categoryId) {
        const newFeed: RSSFeed = {
          ...feed,
          id: `feed-${Date.now()}`,
          enabled: true,
        };
        return { ...cat, feeds: [...cat.feeds, newFeed] };
      }
      return cat;
    });
    set({ categories });
    saveCategories(categories);
  },

  removeFeedFromCategory: (categoryId, feedId) => {
    const categories = get().categories.map((cat) => {
      if (cat.id === categoryId) {
        return { ...cat, feeds: cat.feeds.filter((f) => f.id !== feedId) };
      }
      return cat;
    });
    set({ categories });
    saveCategories(categories);
  },

  // Article actions
  fetchArticles: async () => {
    set({ isLoading: true });

    const { categories, readArticles, bookmarkedArticles, favoriteArticles } = get();
    const enabledCategories = categories.filter((cat) => cat.enabled);

    const allArticles: Article[] = [];

    for (const category of enabledCategories) {
      const articles = await fetchCategoryFeeds(category.feeds, category.id);
      allArticles.push(...articles);
    }

    // Apply read/bookmark/favorite status
    const articlesWithStatus = allArticles.map((article) => ({
      ...article,
      isRead: readArticles.includes(article.id),
      isBookmarked: bookmarkedArticles.includes(article.id),
      isFavorite: favoriteArticles.includes(article.id),
    }));

    // Sort by date
    articlesWithStatus.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    set({
      articles: articlesWithStatus,
      isLoading: false,
      lastFetch: Date.now(),
    });
  },

  markAsRead: (articleId) => {
    const readArticles = [...get().readArticles, articleId];
    set({
      readArticles,
      articles: get().articles.map((a) =>
        a.id === articleId ? { ...a, isRead: true } : a
      ),
    });
    saveReadArticles(readArticles);
  },

  toggleBookmark: (articleId) => {
    const current = get().bookmarkedArticles;
    const bookmarkedArticles = current.includes(articleId)
      ? current.filter((id) => id !== articleId)
      : [...current, articleId];

    set({
      bookmarkedArticles,
      articles: get().articles.map((a) =>
        a.id === articleId ? { ...a, isBookmarked: !a.isBookmarked } : a
      ),
    });
    saveBookmarks(bookmarkedArticles);
  },

  toggleFavorite: (articleId) => {
    const current = get().favoriteArticles;
    const favoriteArticles = current.includes(articleId)
      ? current.filter((id) => id !== articleId)
      : [...current, articleId];

    set({
      favoriteArticles,
      articles: get().articles.map((a) =>
        a.id === articleId ? { ...a, isFavorite: !a.isFavorite } : a
      ),
    });
    saveFavorites(favoriteArticles);
  },

  // Settings actions
  updateSettings: (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    saveSettings(settings);
  },

  // Shortcut actions
  addShortcut: (shortcut) => {
    const newShortcut: Shortcut = { ...shortcut, id: `shortcut-${Date.now()}` };
    const shortcuts = [...get().shortcuts, newShortcut];
    set({ shortcuts });
    saveShortcuts(shortcuts);
  },

  removeShortcut: (id) => {
    const shortcuts = get().shortcuts.filter((s) => s.id !== id);
    set({ shortcuts });
    saveShortcuts(shortcuts);
  },

  updateShortcut: (id, shortcut) => {
    const shortcuts = get().shortcuts.map((s) =>
      s.id === id ? { ...s, ...shortcut } : s
    );
    set({ shortcuts });
    saveShortcuts(shortcuts);
  },

  // Initialize
  initialize: () => {
    const savedCategories = loadCategories();
    const savedSettings = loadSettings();
    const savedShortcuts = loadShortcuts();
    const readArticles = loadReadArticles();
    const bookmarkedArticles = loadBookmarks();
    const favoriteArticles = loadFavorites();

    set({
      categories: savedCategories || defaultCategories,
      settings: savedSettings || defaultSettings,
      shortcuts: savedShortcuts || defaultShortcuts,
      readArticles,
      bookmarkedArticles,
      favoriteArticles,
    });
  },
}));
