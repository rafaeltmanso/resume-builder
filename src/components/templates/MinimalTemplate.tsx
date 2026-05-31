import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: Props) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="mx-auto max-w-[800px] p-10 font-sans leading-relaxed">
      {personalInfo.fullName && (
        <h1 className="mb-1 text-4xl font-semibold tracking-tight text-stone-950">{personalInfo.fullName}</h1>
      )}
      <div className="mb-8 border-b border-stone-300 pb-5 text-sm text-stone-600">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span> · {personalInfo.phone}</span>}
        {personalInfo.location && <span> · {personalInfo.location}</span>}
        {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
      </div>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase text-stone-500">Summary</h2>
          <p className="text-stone-800">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-stone-500">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-stone-950">{exp.position || 'Position'}</h3>
                  <p className="text-stone-700">{exp.company || 'Company'}</p>
                </div>
                <span className="text-sm text-stone-500">
                  {exp.startDate || 'Start'} – {exp.currentlyWorking ? 'Present' : exp.endDate || 'End'}
                </span>
              </div>
              {exp.description && (
                <p className="mt-2 whitespace-pre-wrap text-stone-800">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase text-stone-500">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-stone-950">{edu.institution || 'Institution'}</h3>
                  <p className="text-stone-700">
                    {edu.degree || 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                  </p>
                </div>
                <span className="text-sm text-stone-500">
                  {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase text-stone-500">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="rounded-sm bg-stone-100 px-3 py-1 text-sm text-stone-700">
                {skill.name}
                {skill.level !== 'intermediate' && (
                  <span className="ml-1 text-stone-400">({skill.level})</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
