import type { Education } from '../../types/resume';

interface Props {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
}

export default function EducationForm({ education, onAdd, onUpdate, onRemove }: Props) {
  return (
    <section className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[var(--text-h)]">Education</h2>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90"
        >
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="p-3 border border-[var(--border)] rounded space-y-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onRemove(edu.id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={e => onUpdate(edu.id, 'institution', e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={e => onUpdate(edu.id, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={e => onUpdate(edu.id, 'field', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="month"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={e => onUpdate(edu.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
              <input
                type="month"
                placeholder="End Date"
                value={edu.endDate}
                onChange={e => onUpdate(edu.id, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}