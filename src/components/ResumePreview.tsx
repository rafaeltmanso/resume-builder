import type { ResumeData, TemplateId } from '../types/resume';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

interface Props {
  data: ResumeData;
  templateId: TemplateId;
}

export default function ResumePreview({ data, templateId }: Props) {
  const Template = templateId === 'modern' ? ModernTemplate
    : templateId === 'professional' ? ProfessionalTemplate
    : MinimalTemplate;

  return (
    <div id="resume-preview" className="bg-white text-black shadow-lg rounded">
      <Template data={data} />
    </div>
  );
}