import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { ResumeData, TemplateId } from '../types/resume';

interface Props {
  templateId: TemplateId;
  resumeData: ResumeData;
  isPremium: boolean;
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function DownloadButton({ templateId, resumeData, isPremium }: Props) {
  const [loading, setLoading] = useState<'pdf' | 'html' | null>(null);

  const handleDownload = async (format: 'pdf' | 'html') => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setLoading(format);
    try {
      if (format === 'html') {
        const style = document.querySelector('style')?.innerHTML || '';
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${style}</style></head>
<body>${element.outerHTML}</body>
</html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
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
        if (pdfHeight > pdf.internal.pageSize.getHeight()) {
          const pageHeight = pdf.internal.pageSize.getHeight();
          let heightLeft = pdfHeight;
          let position = 0;
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
          while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
          }
        } else {
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }
        pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      }
    } finally {
      setLoading(null);
    }
  };

  const isLocked = !isPremium && templateId !== 'minimal';

  return (
    <div className="flex gap-2">
      <button
        id="download-pdf-btn"
        onClick={() => handleDownload('pdf')}
        disabled={isLocked || loading !== null}
        aria-label="Download resume as PDF"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          isLocked
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-70'
        }`}
      >
        {loading === 'pdf' ? <Spinner /> : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        )}
        {loading === 'pdf' ? 'Exporting...' : 'PDF'}
      </button>
      <button
        onClick={() => handleDownload('html')}
        disabled={isLocked || loading !== null}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          isLocked
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50'
        }`}
      >
        {loading === 'html' ? <Spinner /> : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
        )}
        {loading === 'html' ? 'Exporting...' : 'HTML'}
      </button>
    </div>
  );
}