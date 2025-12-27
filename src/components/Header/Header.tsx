import { SearchBar } from './SearchBar';
import { Clock } from '../Widgets/Clock';

export function Header() {

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              My Daily Tab
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Widgets */}
          <div className="flex items-center gap-4">
            <Clock />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Settings"
            >
              <span className="text-xl">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
