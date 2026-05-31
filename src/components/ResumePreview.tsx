import { lazy, Suspense } from 'react';
import type { ResumeData, TemplateId } from '../types/resume';

const MinimalTemplate = lazy(() => import('./templates/MinimalTemplate'));
const ModernTemplate = lazy(() => import('./templates/ModernTemplate'));
const ProfessionalTemplate = lazy(() => import('./templates/ProfessionalTemplate'));

interface Props {
  data: ResumeData;
  templateId: TemplateId;
}

function LoadingSkeleton() {
  return (
    <div className="rounded-sm bg-white p-8 text-black shadow-sm animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-100 rounded mb-6" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-3/4 bg-gray-100 rounded" />
        <div className="h-4 w-1/2 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

const templateComponents: Record<TemplateId, React.LazyExoticComponent<React.ComponentType<{ data: ResumeData }>>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
};

export default function ResumePreview({ data, templateId }: Props) {
  const Template = templateComponents[templateId];

  return (
    <div id="resume-preview" className="mx-auto min-h-[297mm] w-full max-w-[210mm] rounded-sm bg-white text-black shadow-[0_24px_80px_rgba(28,25,23,0.18)]">
      <Suspense fallback={<LoadingSkeleton />}>
        <Template data={data} />
      </Suspense>
    </div>
  );
}
