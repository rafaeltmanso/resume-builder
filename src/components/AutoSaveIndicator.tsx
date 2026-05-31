export type SaveState = 'saved' | 'saving' | 'error';

interface Props {
  state: SaveState;
}

export default function AutoSaveIndicator({ state }: Props) {
  // Never show anything when state is 'saved'
  if (state === 'saved') return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500"
    >
      {state === 'saving' && (
        <>
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Saving...</span>
        </>
      )}
      {state === 'error' && (
        <>
          <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-red-500">Save failed</span>
        </>
      )}
    </div>
  );
}
