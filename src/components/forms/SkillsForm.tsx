import type { Skill } from '../../types/resume';

interface Props {
  skills: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
}

export default function SkillsForm({ skills, onAdd, onUpdate, onRemove }: Props) {
  return (
    <section className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[var(--text-h)]">Skills</h2>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90"
        >
          + Add
        </button>
      </div>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={e => onUpdate(skill.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
            />
            <select
              value={skill.level}
              onChange={e => onUpdate(skill.id, 'level', e.target.value)}
              className="px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(skill.id)}
              className="px-2 py-2 text-red-500 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}