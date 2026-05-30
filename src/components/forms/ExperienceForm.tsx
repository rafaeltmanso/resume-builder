import type { Experience } from '../../types/resume';

interface Props {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
}

export default function ExperienceForm({ experiences, onAdd, onUpdate, onRemove }: Props) {
  return (
    <section className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[var(--text-h)]">Work Experience</h2>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90"
        >
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-3 border border-[var(--border)] rounded space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onRemove(exp.id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={e => onUpdate(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={e => onUpdate(exp.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="month"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={e => onUpdate(exp.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
              <input
                type="month"
                placeholder="End Date"
                value={exp.endDate}
                onChange={e => onUpdate(exp.id, 'endDate', e.target.value)}
                disabled={exp.currentlyWorking}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)] disabled:opacity-50"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--text)]">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={e => onUpdate(exp.id, 'currentlyWorking', e.target.checked)}
                className="rounded"
              />
              Currently working here
            </label>
            <textarea
              placeholder="Description (achievements, responsibilities)"
              value={exp.description}
              onChange={e => onUpdate(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)] resize-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}