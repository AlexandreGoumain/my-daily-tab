import type { Article } from '../../types';
import { useAppStore } from '../../stores/appStore';

interface ArticleCardProps {
  article: Article;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { markAsRead, toggleBookmark, toggleFavorite, categories } = useAppStore();

  const category = categories.find((c) => c.id === article.categoryId);

  const handleClick = () => {
    markAsRead(article.id);
    window.open(article.link, '_blank');
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(article.id);
  };

  return (
    <article
      onClick={handleClick}
      className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer ${
        article.isRead ? 'opacity-70' : ''
      }`}
    >
      {/* Image */}
      {article.image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Category & Source */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {category && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                {category.icon} {category.name}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatRelativeTime(article.pubDate)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
            {article.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {article.source}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                article.isBookmarked ? 'text-blue-500' : 'text-gray-400'
              }`}
              title="Sauvegarder"
            >
              🔖
            </button>
            <button
              onClick={handleFavorite}
              className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                article.isFavorite ? 'text-yellow-500' : 'text-gray-400'
              }`}
              title="Favori"
            >
              ⭐
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
