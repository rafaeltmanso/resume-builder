import type { Experience } from '../../types/resume';

interface Props {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm transition-colors";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

export default function ExperienceForm({ experiences, onAdd, onUpdate, onRemove }: Props) {
  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Work Experience
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
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Experience #{experiences.indexOf(exp) + 1}</span>
              <button
                type="button"
                onClick={() => onRemove(exp.id)}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Company</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={exp.company}
                  onChange={e => onUpdate(exp.id, 'company', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Position</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={exp.position}
                  onChange={e => onUpdate(exp.id, 'position', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={e => onUpdate(exp.id, 'startDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={e => onUpdate(exp.id, 'endDate', e.target.value)}
                  disabled={exp.currentlyWorking}
                  className={inputClass + " disabled:opacity-50"}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={e => onUpdate(exp.id, 'currentlyWorking', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-500"
              />
              I currently work here
            </label>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                placeholder="Describe your achievements, responsibilities, and impact..."
                value={exp.description}
                onChange={e => onUpdate(exp.id, 'description', e.target.value)}
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">
            No experience added yet. Click "Add" to start.
          </p>
        )}
      </div>
    </section>
  );
}