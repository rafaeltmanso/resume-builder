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
      <section
        aria-labelledby="premium-heading"
        className="flex items-center justify-between gap-3 rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2.5 dark:border-amber-900/60 dark:bg-amber-950/20"
      >
        <h2 id="premium-heading" className="sr-only">Premium</h2>
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-4 h-4 shrink-0 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-medium text-amber-800 dark:text-amber-300">Premium active — all templates unlocked</span>
        </div>
        <button
          type="button"
          onClick={onDeactivate}
          className="shrink-0 text-xs font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400"
        >
          Deactivate
        </button>
      </section>
    );
  }

  if (showInput) {
    return (
      <section
        aria-labelledby="premium-heading"
        className="rounded-md border border-stone-200 bg-stone-50/80 p-3 dark:border-neutral-800 dark:bg-neutral-900/80"
      >
        <h2 id="premium-heading" className="sr-only">Unlock premium templates</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter license key"
            value={key}
            onChange={e => { setKey(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleActivate()}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-950 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-stone-100"
            autoFocus
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleActivate}
              className="rounded-md bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-900 dark:bg-stone-200 dark:text-stone-950"
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
          <p className="text-xs text-stone-500">Test key: <code className="rounded bg-stone-200/80 px-1 dark:bg-neutral-800">premium-demo</code></p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="premium-heading"
      className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-stone-50/80 px-3 py-2.5 dark:border-neutral-800 dark:bg-neutral-900/80"
    >
      <h2 id="premium-heading" className="sr-only">Premium templates</h2>
      <div className="flex items-center gap-2 min-w-0">
        <svg className="w-4 h-4 shrink-0 text-stone-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-stone-600 dark:text-stone-400">Modern and Professional templates require premium</p>
      </div>
      <button
        type="button"
        onClick={() => setShowInput(true)}
        className="shrink-0 text-xs font-medium text-stone-700 underline-offset-2 hover:underline dark:text-stone-300"
      >
        Unlock
      </button>
    </section>
  );
}
