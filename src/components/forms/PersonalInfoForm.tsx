import { useState, useCallback } from 'react';
import type { PersonalInfo } from '../../types/resume';

interface Props {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  website?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateUrl(url: string): boolean {
  if (!url) return true;
  return /^https?:\/\/.+\..+/.test(url) || /^[a-z0-9]+\.[a-z]+\/.+/.test(url);
}

function validate(data: PersonalInfo): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = 'Name is required';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email format';
  if (data.linkedIn && !validateUrl(data.linkedIn)) errors.linkedIn = 'Invalid URL';
  if (data.website && !validateUrl(data.website)) errors.website = 'Invalid URL';
  return errors;
}

const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent text-sm transition-colors";
const inputErrorClass = "w-full px-3 py-2 border border-red-400 dark:border-red-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-colors";
const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

export default function PersonalInfoForm({ data, onChange }: Props) {
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const errors = validate(data);

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field));
  }, []);

  return (
    <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        Personal Information
      </h2>
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={data.fullName}
            onChange={e => onChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            className={touched.has('fullName') && errors.fullName ? inputErrorClass : inputClass}
          />
          {touched.has('fullName') && errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={e => onChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={touched.has('email') && errors.email ? inputErrorClass : inputClass}
            />
            {touched.has('email') && errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={data.phone}
              onChange={e => onChange('phone', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            placeholder="e.g. New York, NY"
            value={data.location}
            onChange={e => onChange('location', e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              type="url"
              placeholder="linkedin.com/in/..."
              value={data.linkedIn || ''}
              onChange={e => onChange('linkedIn', e.target.value)}
              onBlur={() => handleBlur('linkedIn')}
              className={touched.has('linkedIn') && errors.linkedIn ? inputErrorClass : inputClass}
            />
            {touched.has('linkedIn') && errors.linkedIn && <p className="mt-1 text-xs text-red-500">{errors.linkedIn}</p>}
          </div>
          <div>
            <label className={labelClass}>Website / Portfolio</label>
            <input
              type="url"
              placeholder="yourwebsite.com"
              value={data.website || ''}
              onChange={e => onChange('website', e.target.value)}
              onBlur={() => handleBlur('website')}
              className={touched.has('website') && errors.website ? inputErrorClass : inputClass}
            />
            {touched.has('website') && errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
          </div>
        </div>
        <div>
          <label className={labelClass}>Professional Summary</label>
          <textarea
            placeholder="Brief overview of your experience and career goals..."
            value={data.summary}
            onChange={e => onChange('summary', e.target.value)}
            rows={4}
            className={inputClass + " resize-none"}
          />
        </div>
      </div>
    </section>
  );
}