import type { PersonalInfo } from '../../types/resume';

interface Props {
  data: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  return (
    <section className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4">
      <h2 className="text-lg font-medium text-[var(--text-h)] mb-4">Personal Information</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={data.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={data.phone}
            onChange={e => onChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
          />
        </div>
        <input
          type="text"
          placeholder="Location (e.g., New York, NY)"
          value={data.location}
          onChange={e => onChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.linkedIn || ''}
            onChange={e => onChange('linkedIn', e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
          />
          <input
            type="url"
            placeholder="Website/Portfolio"
            value={data.website || ''}
            onChange={e => onChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)]"
          />
        </div>
        <textarea
          placeholder="Professional Summary"
          value={data.summary}
          onChange={e => onChange('summary', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--bg)] text-[var(--text-h)] resize-none"
        />
      </div>
    </section>
  );
}