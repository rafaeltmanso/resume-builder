import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: Props) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-8 max-w-[800px] mx-auto font-serif">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        {personalInfo.fullName && (
          <h1 className="text-3xl font-bold text-black mb-1">{personalInfo.fullName}</h1>
        )}
        <div className="text-sm text-gray-700 space-y-0.5">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> · {personalInfo.phone}</span>}
          {personalInfo.location && <span> · {personalInfo.location}</span>}
          {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-gray-800">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-black">{exp.position || 'Position'}</h3>
                  <p className="text-gray-800 italic">{exp.company || 'Company'}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {exp.startDate || 'Start'} – {exp.currentlyWorking ? 'Present' : exp.endDate || 'End'}
                </span>
              </div>
              {exp.description && (
                <p className="mt-2 text-gray-800 whitespace-pre-wrap">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-black">{edu.institution || 'Institution'}</h3>
                  <p className="text-gray-800 italic">
                    {edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                </div>
                <span className="text-sm text-gray-600">
                  {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-black uppercase tracking-wide mb-3 border-b border-gray-300 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}