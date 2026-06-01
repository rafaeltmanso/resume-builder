import { useState, useCallback } from 'react';
import type { Experience } from '../../types/resume';
import SortableList from '../DraggableList';

interface Props {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const inputClass = "w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 placeholder-stone-400 transition focus:border-cyan-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-700/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-stone-100 dark:placeholder-stone-600 dark:focus:border-cyan-400 dark:focus:bg-neutral-900";
const inputErrorClass = "w-full rounded-md border border-red-400 bg-white px-3 py-2 text-sm text-stone-950 placeholder-stone-400 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-red-500 dark:bg-neutral-950 dark:text-stone-100";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300";

export default function ExperienceForm({ experiences, onAdd, onUpdate, onRemove, onMove }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field));
  }, []);

  return (
    <section className="rounded-lg border border-stone-300 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 id="experience-heading" className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Work Experience
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-md bg-stone-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
          Add experience
        </button>
      </div>
      {experiences.length === 0 ? (
        <p className="py-6 text-center text-sm text-stone-500 dark:text-stone-400">No experience added yet.</p>
      ) : (
        <SortableList
          items={experiences}
          onReorder={onMove}
          keyExtractor={e => e.id}
          itemLabel="experience entry"
          renderItem={(exp) => (
            <div className="space-y-4 rounded-md border border-stone-200 bg-stone-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Experience {experiences.indexOf(exp) + 1}</span>
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
                  <label className={labelClass}>Company <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={exp.company}
                    onChange={e => onUpdate(exp.id, 'company', e.target.value)}
                    onBlur={() => handleBlur('company-' + exp.id)}
                    className={touched.has('company-' + exp.id) && !exp.company.trim() ? inputErrorClass : inputClass}
                  />
                  {touched.has('company-' + exp.id) && !exp.company.trim() && <p className="mt-1 text-xs text-red-500">Company name is required</p>}
                </div>
                <div>
                  <label className={labelClass}>Position <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={exp.position}
                    onChange={e => onUpdate(exp.id, 'position', e.target.value)}
                    onBlur={() => handleBlur('position-' + exp.id)}
                    className={touched.has('position-' + exp.id) && !exp.position.trim() ? inputErrorClass : inputClass}
                  />
                  {touched.has('position-' + exp.id) && !exp.position.trim() && <p className="mt-1 text-xs text-red-500">Position is required</p>}
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
              <label className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.currentlyWorking}
                  onChange={e => onUpdate(exp.id, 'currentlyWorking', e.target.checked)}
                  className="rounded border-stone-300 text-cyan-700 focus:ring-cyan-700 dark:border-neutral-600"
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
          )}
        />
      )}
    </section>
  );
}
