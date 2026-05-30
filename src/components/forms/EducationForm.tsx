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

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm transition-colors";
const inputErrorClass = "w-full px-3 py-2 border border-red-400 dark:border-red-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-colors";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

export default function EducationForm({ education, onAdd, onUpdate, onRemove, onMove }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field));
  }, []);

  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
          Education
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
      {education.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No education added yet. Click "Add" to start.</p>
      ) : (
        <SortableList
          items={education}
          onReorder={onMove}
          keyExtractor={e => e.id}
          renderItem={(edu) => (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Education #{education.indexOf(edu) + 1}</span>
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