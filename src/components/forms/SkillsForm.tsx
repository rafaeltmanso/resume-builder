import type { Skill } from '../../types/resume';
import SortableList from '../DraggableList';

interface Props {
  skills: Skill[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const inputClass = "w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 placeholder-stone-400 transition focus:border-cyan-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-700/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-stone-100 dark:placeholder-stone-600 dark:focus:border-cyan-400 dark:focus:bg-neutral-900";

const levelColors: Record<string, string> = {
  beginner: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  advanced: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

export default function SkillsForm({ skills, onAdd, onUpdate, onRemove, onMove }: Props) {
  return (
    <section className="rounded-lg border border-stone-300 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-500 dark:text-stone-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          Skills
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-md bg-stone-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
          Add
        </button>
      </div>
      {skills.length === 0 ? (
        <p className="py-6 text-center text-sm text-stone-500 dark:text-stone-400">No skills added yet.</p>
      ) : (
        <SortableList
          items={skills}
          onReorder={onMove}
          keyExtractor={s => s.id}
          renderItem={(skill) => (
            <div className="flex items-center gap-2 rounded-md border border-stone-200 bg-stone-50 p-2 dark:border-neutral-800 dark:bg-neutral-950">
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
          )}
        />
      )}
    </section>
  );
}
