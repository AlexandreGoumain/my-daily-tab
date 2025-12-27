import type { Category, Settings, Shortcut } from '../types';

const STORAGE_KEYS = {
  CATEGORIES: 'mydailytab_categories',
  SETTINGS: 'mydailytab_settings',
  SHORTCUTS: 'mydailytab_shortcuts',
  READ_ARTICLES: 'mydailytab_read',
  BOOKMARKS: 'mydailytab_bookmarks',
  FAVORITES: 'mydailytab_favorites',
} as const;

function getStorage(): Storage {
  // Use chrome.storage.local if available, otherwise localStorage
  return localStorage;
}

export function saveCategories(categories: Category[]): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

export function loadCategories(): Category[] | null {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : null;
}

export function saveSettings(settings: Settings): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function loadSettings(): Settings | null {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.SETTINGS);
  return data ? JSON.parse(data) : null;
}

export function saveShortcuts(shortcuts: Shortcut[]): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.SHORTCUTS, JSON.stringify(shortcuts));
}

export function loadShortcuts(): Shortcut[] | null {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.SHORTCUTS);
  return data ? JSON.parse(data) : null;
}

export function saveReadArticles(ids: string[]): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.READ_ARTICLES, JSON.stringify(ids));
}

export function loadReadArticles(): string[] {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.READ_ARTICLES);
  return data ? JSON.parse(data) : [];
}

export function saveBookmarks(ids: string[]): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(ids));
}

export function loadBookmarks(): string[] {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.BOOKMARKS);
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(ids: string[]): void {
  const storage = getStorage();
  storage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
}

export function loadFavorites(): string[] {
  const storage = getStorage();
  const data = storage.getItem(STORAGE_KEYS.FAVORITES);
  return data ? JSON.parse(data) : [];
}

export function exportConfig(): string {
  const config = {
    categories: loadCategories(),
    settings: loadSettings(),
    shortcuts: loadShortcuts(),
  };
  return JSON.stringify(config, null, 2);
}

export function importConfig(json: string): boolean {
  try {
    const config = JSON.parse(json);
    if (config.categories) saveCategories(config.categories);
    if (config.settings) saveSettings(config.settings);
    if (config.shortcuts) saveShortcuts(config.shortcuts);
    return true;
  } catch {
    return false;
  }
}
