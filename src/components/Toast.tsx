import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { subscribeToasts, removeToast, type Toast, type ToastType } from './toastStore';

const icons: Record<ToastType, ReactElement> = {
  success: (
    <svg className="w-4 h-4 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const bgColors: Record<ToastType, string> = {
  success: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800',
  error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
  info: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800',
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToasts(setToasts);
    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      role="region"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="alert"
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg text-sm text-gray-800 dark:text-gray-100 ${bgColors[t.type]} animate-toast-in`}
        >
          {icons[t.type]}
          <span className="flex-1">{t.message}</span>
          <button
            type="button"
            onClick={() => removeToast(t.id)}
            aria-label="Dismiss notification"
            className="ml-1 p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

