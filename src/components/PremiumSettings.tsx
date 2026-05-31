import { useState } from 'react';

interface Props {
  isPremium: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function PremiumSettings({ isPremium, onActivate, onDeactivate }: Props) {
  const [key, setKey] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  const handleActivate = () => {
    if (key.trim().toLowerCase() === 'premium-demo') {
      onActivate();
      setShowInput(false);
      setKey('');
      setError('');
    } else {
      setError('Invalid key. Try "premium-demo" to test.');
    }
  };

  if (isPremium) {
    return (
      <section className="rounded-lg border border-amber-300 bg-amber-50 p-4 shadow-sm dark:border-amber-900/80 dark:bg-amber-950/20 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Premium Active</span>
          </div>
          <button
            type="button"
            onClick={onDeactivate}
            className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 font-medium"
          >
            Deactivate
          </button>
        </div>
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
          All templates and features unlocked.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-stone-300 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Free Plan</span>
      </div>
      {showInput ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter license key"
            value={key}
            onChange={e => { setKey(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleActivate()}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-stone-100"
            autoFocus
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleActivate}
              className="flex-1 rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700"
            >
              Activate
            </button>
            <button
              type="button"
              onClick={() => { setShowInput(false); setError(''); setKey(''); }}
              className="rounded-md border border-stone-300 px-3 py-1.5 text-sm transition hover:bg-stone-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-stone-400">Test key: <code className="rounded bg-stone-100 px-1 dark:bg-neutral-800">premium-demo</code></p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Upgrade to unlock Modern and Professional templates.
          </p>
          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="w-full rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-700"
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </section>
  );
}
