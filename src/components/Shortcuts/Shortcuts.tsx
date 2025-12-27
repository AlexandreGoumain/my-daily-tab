import { useAppStore } from '../../stores/appStore';

export function Shortcuts() {
  const { shortcuts } = useAppStore();

  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium shrink-0">
            🔗 Raccourcis
          </span>

          {shortcuts.map((shortcut) => (
            <a
              key={shortcut.id}
              href={shortcut.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              {shortcut.icon || '🔗'} {shortcut.name}
            </a>
          ))}

          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors whitespace-nowrap"
            title="Ajouter un raccourci"
          >
            ➕ Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
