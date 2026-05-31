import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: Props) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="mx-auto max-w-[800px] p-10 font-serif leading-relaxed">
      <div className="mb-7 border-b-2 border-stone-950 pb-5 text-center">
        {personalInfo.fullName && (
          <h1 className="mb-1 text-4xl font-bold text-stone-950">{personalInfo.fullName}</h1>
        )}
        <div className="space-y-0.5 text-sm text-stone-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> · {personalInfo.phone}</span>}
          {personalInfo.location && <span> · {personalInfo.location}</span>}
          {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="mb-2 border-b border-stone-300 pb-1 text-xs font-bold uppercase text-stone-950">Professional Summary</h2>
          <p className="text-stone-800">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-xs font-bold uppercase text-stone-950">Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-stone-950">{exp.position || 'Position'}</h3>
                  <p className="italic text-stone-800">{exp.company || 'Company'}</p>
                </div>
                <span className="text-sm text-stone-600">
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
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-xs font-bold uppercase text-stone-950">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-stone-950">{edu.institution || 'Institution'}</h3>
                  <p className="italic text-stone-800">
                    {edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                </div>
                <span className="text-sm text-stone-600">
                  {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-xs font-bold uppercase text-stone-950">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="rounded-sm bg-stone-200 px-3 py-1 text-sm text-stone-800">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
