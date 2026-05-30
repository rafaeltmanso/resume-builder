import type { Skill } from '../../types/resume';

interface Props {
  skills: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm transition-colors";

const levelColors: Record<string, string> = {
  beginner: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  advanced: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

export default function SkillsForm({ skills, onAdd, onUpdate, onRemove }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          Skills
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add
        </button>
      </div>
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <input
              type="text"
              placeholder="Skill name"
              value={skill.name}
              onChange={e => onUpdate(skill.id, 'name', e.target.value)}
              className={inputClass + " flex-1"}
            />
            <span className={"px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap " + (levelColors[skill.level] || '')}>
              {skill.level}
            </span>
            <select
              value={skill.level}
              onChange={e => onUpdate(skill.id, 'level', e.target.value)}
              className={inputClass + " w-auto"}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(skill.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove skill"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No skills added yet. Click "Add" to start.
          </p>
        )}
      </div>
    </section>
  );
}