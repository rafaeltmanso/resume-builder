import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export default function ModernTemplate({ data }: Props) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans bg-gray-50">
      {personalInfo.fullName && (
        <h1 className="text-3xl font-bold text-indigo-600 mb-1">{personalInfo.fullName}</h1>
      )}
      <div className="text-sm text-gray-600 space-y-0.5 mb-6">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span> · {personalInfo.phone}</span>}
        {personalInfo.location && <span> · {personalInfo.location}</span>}
        {personalInfo.linkedIn && <div>{personalInfo.linkedIn}</div>}
      </div>

      {personalInfo.summary && (
        <section className="mb-6 p-4 bg-white border-l-4 border-indigo-500">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4 bg-white p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                  <p className="text-indigo-600">{exp.company || 'Company'}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {exp.startDate || 'Start'} – {exp.currentlyWorking ? 'Present' : exp.endDate || 'End'}
                </span>
              </div>
              {exp.description && (
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3 bg-white p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.institution || 'Institution'}</h3>
                  <p className="text-indigo-600">
                    {edu.degree || 'Degree'}{edu.field ? `, ${edu.field}` : ''}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}