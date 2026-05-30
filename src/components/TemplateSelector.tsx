import type { TemplateId } from '../types/resume';

interface Props {
  selected: TemplateId;
  onSelect: (template: TemplateId) => void;
  isPremium: boolean;
}

const templates = [
  { id: 'minimal' as const, name: 'Minimal', description: 'Clean and simple' },
  { id: 'modern' as const, name: 'Modern', description: 'Bold accent colors' },
  { id: 'professional' as const, name: 'Professional', description: 'Traditional layout' },
];

export default function TemplateSelector({ selected, onSelect, isPremium }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`p-3 border rounded text-center transition ${
            selected === t.id
              ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
              : 'border-[var(--border)] hover:border-[var(--accent)]'
          }`}
        >
          <div className={`w-12 h-16 mx-auto mb-2 border rounded ${
            selected === t.id ? 'border-[var(--accent)]' : 'border-[var(--border)]'
          }`}>
            <div className="h-3 border-b border-[var(--border)]" />
            <div className="h-2 w-2/3 mx-auto mt-1" />
            <div className="h-1 w-1/2 mx-auto mt-1" />
          </div>
          <span className="text-sm font-medium text-[var(--text-h)]">{t.name}</span>
          {!isPremium && t.id !== 'minimal' && (
            <span className="block text-xs text-[var(--accent)] mt-1">Premium</span>
          )}
        </button>
      ))}
    </div>
  );
}