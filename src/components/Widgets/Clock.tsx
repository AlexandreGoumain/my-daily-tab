import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="text-right">
      <div className="text-xl font-semibold text-gray-900 dark:text-white">
        {formatTime(time)}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {formatDate(time)}
      </div>
    </div>
  );
}
