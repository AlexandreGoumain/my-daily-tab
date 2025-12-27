import { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { Shortcuts } from './components/Shortcuts';
import { Feed } from './components/Feed';

function App() {
  const { initialize, settings } = useAppStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [settings.theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header />
      <CategoryTabs />
      <Shortcuts />
      <main>
        <Feed />
      </main>
    </div>
  );
}

export default App;
