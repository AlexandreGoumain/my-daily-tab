import { useEffect } from 'react';
import { useAppStore } from '../../stores/appStore';
import { ArticleCard } from '../ArticleCard/ArticleCard';

export function Feed() {
  const {
    articles,
    isLoading,
    activeCategory,
    fetchArticles,
    categories,
  } = useAppStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter articles by active category
  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter((article) => article.categoryId === activeCategory);

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin text-4xl mb-4">🔄</div>
        <p className="text-gray-500 dark:text-gray-400">
          Chargement des articles...
        </p>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-6xl mb-4">📭</span>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun article
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {activeCategory === 'all'
            ? 'Activez des catégories pour voir des articles.'
            : 'Aucun article trouvé pour cette catégorie.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Refresh indicator */}
      {isLoading && articles.length > 0 && (
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="animate-spin">🔄</span>
          Actualisation...
        </div>
      )}

      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
        {activeCategory !== 'all' && (
          <span>
            {' '}
            dans{' '}
            {categories.find((c) => c.id === activeCategory)?.name || 'cette catégorie'}
          </span>
        )}
      </div>
    </div>
  );
}
