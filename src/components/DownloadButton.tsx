import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { ResumeData, TemplateId } from '../types/resume';

interface Props {
  templateId: TemplateId;
  resumeData: ResumeData;
  isPremium: boolean;
}

export default function DownloadButton({ templateId, resumeData, isPremium }: Props) {
  const handleDownload = async (format: 'pdf' | 'html') => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    if (format === 'html') {
      const blob = new Blob([element.innerHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName || 'resume'}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);
    }
  };

  if (!isPremium && templateId !== 'minimal') {
    return (
      <button
        disabled
        className="px-4 py-2 text-sm bg-[var(--border)] text-[var(--text)] rounded cursor-not-allowed"
      >
        Premium Only
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleDownload('pdf')}
        className="px-4 py-2 text-sm bg-[var(--accent)] text-white rounded hover:opacity-90"
      >
        PDF
      </button>
      <button
        onClick={() => handleDownload('html')}
        className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text-h)] rounded hover:bg-[var(--social-bg)]"
      >
        HTML
      </button>
    </div>
  );
}