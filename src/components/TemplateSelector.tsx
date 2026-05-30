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
        <div className="h-2 w-3/4 bg-gray-800 dark:bg-gray-200 rounded-full" />
        <div className="h-1 w-1/2 bg-gray-400 rounded-full" />
        <div className="mt-2 w-full border-t border-dashed border-gray-300 dark:border-gray-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-1 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
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
        <div className="h-2 w-3/4 bg-indigo-500 rounded-full" />
        <div className="h-1 w-1/2 bg-indigo-300 rounded-full" />
        <div className="mt-2 w-full border-t border-gray-200 dark:border-gray-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-indigo-100 dark:bg-indigo-900/50 rounded" />
          <div className="h-1 w-2/3 bg-indigo-100 dark:bg-indigo-900/50 rounded" />
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
        <div className="h-2 w-2/3 bg-gray-800 dark:bg-gray-200 rounded-full" />
        <div className="h-1 w-1/3 bg-gray-400 rounded-full" />
        <div className="mt-2 w-full border-t border-gray-300 dark:border-gray-600 pt-1.5 space-y-1">
          <div className="h-1 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-1 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ),
  },
];

export default function TemplateSelector({ selected, onSelect, isPremium }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map(t => {
        const isLocked = !isPremium && t.id !== 'minimal';
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => !isLocked && onSelect(t.id)}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selected === t.id
                ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : isLocked
                  ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="mb-3 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              {t.preview}
            </div>
            <div className="text-sm font-medium">{t.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t.description}</div>
            {isLocked && (
              <div className="absolute top-2 right-2">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {selected === t.id && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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