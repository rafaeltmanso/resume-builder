import { useState, useCallback } from 'react';
import type { Education } from '../../types/resume';
import SortableList from '../DraggableList';

interface Props {
  education: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const inputClass = "w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-950 placeholder-stone-400 transition focus:border-cyan-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-700/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-stone-100 dark:placeholder-stone-600 dark:focus:border-cyan-400 dark:focus:bg-neutral-900";
const inputErrorClass = "w-full rounded-md border border-red-400 bg-white px-3 py-2 text-sm text-stone-950 placeholder-stone-400 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-red-500 dark:bg-neutral-950 dark:text-stone-100";
const labelClass = "mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300";

export default function EducationForm({ education, onAdd, onUpdate, onRemove, onMove }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field));
  }, []);

  return (
    <section className="rounded-lg border border-stone-300 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 id="education-heading" className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
          Education
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-md bg-stone-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
          Add education
        </button>
      </div>
      {education.length === 0 ? (
        <p className="py-6 text-center text-sm text-stone-500 dark:text-stone-400">No education added yet.</p>
      ) : (
        <SortableList
          items={education}
          onReorder={onMove}
          keyExtractor={e => e.id}
          itemLabel="education entry"
          renderItem={(edu) => (
            <div className="space-y-4 rounded-md border border-stone-200 bg-stone-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Education {education.indexOf(edu) + 1}</span>
                <button
                  type="button"
                  onClick={() => onRemove(edu.id)}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
              <div>
                <label className={labelClass}>Institution <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Stanford University"
                  value={edu.institution}
                  onChange={e => onUpdate(edu.id, 'institution', e.target.value)}
                  onBlur={() => handleBlur('institution-' + edu.id)}
                  className={touched.has('institution-' + edu.id) && !edu.institution.trim() ? inputErrorClass : inputClass}
                />
                {touched.has('institution-' + edu.id) && !edu.institution.trim() && <p className="mt-1 text-xs text-red-500">Institution name is required</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Degree</label>
                  <input
                    type="text"
                    placeholder="e.g. B.S., M.S., Ph.D."
                    value={edu.degree}
                    onChange={e => onUpdate(edu.id, 'degree', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Field of Study</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={edu.field}
                    onChange={e => onUpdate(edu.id, 'field', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={e => onUpdate(edu.id, 'startDate', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={e => onUpdate(edu.id, 'endDate', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}
        />
      )}
    </section>
  );
}
