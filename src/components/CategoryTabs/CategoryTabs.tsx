import { useAppStore } from '../../stores/appStore';
import type { ActiveCategory } from '../../types';

export function CategoryTabs() {
  const { categories, activeCategory, setActiveCategory } = useAppStore();

  const enabledCategories = categories.filter((cat) => cat.enabled);

  const handleCategoryClick = (categoryId: ActiveCategory) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {/* All button */}
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            🌐 Tout
          </button>

          {/* Category buttons */}
          {enabledCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}

          {/* Add category button */}
          <button
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-2 border-dashed border-gray-300 dark:border-gray-600"
            title="Gérer les catégories"
          >
            ➕ Catégories
          </button>
        </div>
      </div>
    </div>
  );
}
