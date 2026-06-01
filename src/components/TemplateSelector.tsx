import type { TemplateId } from '../types/resume';

interface Props {
  selected: TemplateId;
  onSelect: (template: TemplateId) => void;
  isPremium: boolean;
}

const templates = [
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Clean and simple',
    preview: (
      <div className="flex flex-col items-start gap-1">
        <div className="h-2 w-3/4 bg-slate-800 dark:bg-slate-200 rounded-full" />
        <div className="h-1 w-1/2 bg-slate-400 dark:bg-slate-600 rounded-full" />
        <div className="mt-2 w-full border-t border-dashed border-slate-300 dark:border-slate-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-1 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Bold accent colors',
    preview: (
      <div className="flex flex-col items-start gap-1">
        <div className="h-2 w-3/4 bg-slate-800 dark:bg-slate-200 rounded-full" />
        <div className="h-1 w-1/2 bg-slate-400 rounded-full" />
        <div className="mt-2 w-full border-t border-slate-200 dark:border-slate-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-1 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'professional' as const,
    name: 'Professional',
    description: 'Traditional layout',
    preview: (
      <div className="flex flex-col items-center gap-1">
        <div className="h-2 w-2/3 bg-slate-800 dark:bg-slate-200 rounded-full" />
        <div className="h-1 w-1/3 bg-slate-400 rounded-full" />
        <div className="mt-2 w-full border-t border-slate-300 dark:border-slate-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-slate-300 dark:bg-slate-700 rounded" />
          <div className="h-1 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    ),
  },
];

export default function TemplateSelector({ selected, onSelect, isPremium }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {templates.map(t => {
        const isLocked = !isPremium && t.id !== 'minimal';
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => !isLocked && onSelect(t.id)}
            className={`relative rounded-md border p-4 text-left transition ${
              selected === t.id
                ? 'border-cyan-700 bg-cyan-50/70 shadow-sm dark:border-cyan-400 dark:bg-cyan-950/20'
                : isLocked
                  ? 'cursor-not-allowed border-stone-200 opacity-50 dark:border-neutral-800'
                  : 'border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-white dark:border-neutral-700 dark:bg-neutral-950 dark:hover:bg-neutral-900'
            }`}
          >
            <div className="mb-3 rounded-md border border-stone-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900">
              {t.preview}
            </div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">{t.name}</div>
            <div className="text-xs text-stone-500 dark:text-stone-400">{t.description}</div>
            {isLocked && (
              <div className="absolute top-2 right-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {selected === t.id && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-700 dark:bg-cyan-600">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
