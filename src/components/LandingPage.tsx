import { lazy, Suspense, useMemo } from 'react';
import type { TemplateId } from '../types/resume';
import { useTheme } from '../hooks/useTheme';
import { sampleData } from '../utils/sampleData';

const MinimalPreview = lazy(() => import('./templates/MinimalTemplate'));
const ModernPreview = lazy(() => import('./templates/ModernTemplate'));
const ProfessionalPreview = lazy(() => import('./templates/ProfessionalTemplate'));

interface Props {
  onGetStarted: () => void;
}

const templates: { id: TemplateId; name: string; desc: string }[] = [
  { id: 'minimal', name: 'Minimal', desc: 'Clean, distraction-free layout' },
  { id: 'modern', name: 'Modern', desc: 'Bold accent colors, card-based' },
  { id: 'professional', name: 'Professional', desc: 'Traditional serif elegance' },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
    ),
    title: 'Multiple Templates',
    desc: 'Choose from three professionally designed layouts. Minimal, Modern, or Professional.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    ),
    title: 'Export as PDF & HTML',
    desc: 'Download your resume instantly. Perfect for job applications and online portfolios.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    ),
    title: 'Dark Mode',
    desc: 'Easy on the eyes. Built-in dark mode that respects your system preferences.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
    ),
    title: 'Auto-Save',
    desc: 'Never lose your work. Everything is saved automatically to your browser.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
    ),
    title: 'Drag & Drop',
    desc: 'Reorder your experience, education, and skills by dragging them into place.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    ),
    title: 'Privacy First',
    desc: 'Your data never leaves your device. No sign-up, no servers, no tracking.',
  },
];

function TemplatePreview({ templateId, name, desc }: { templateId: TemplateId; name: string; desc: string }) {
  const Template = useMemo(() => {
    const map: Record<TemplateId, React.LazyExoticComponent<React.ComponentType<{ data: typeof sampleData }>>> = {
      minimal: MinimalPreview,
      modern: ModernPreview,
      professional: ProfessionalPreview,
    };
    return map[templateId];
  }, [templateId]);

  return (
    <div className="group relative">
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div className="h-80 overflow-hidden p-4 scale-[0.45] origin-top-left" style={{ width: 'calc(100% / 0.45)', height: 'calc(320px / 0.45)' }}>
          <Suspense fallback={<div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />}>
            <Template data={sampleData} />
          </Suspense>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

export default function LandingPage({ onGetStarted }: Props) {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">Resume Builder</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rafaeltmanso/resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-pink-500/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 rounded-full">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Free · No sign-up · Open source
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Build Your{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Professional Resume
            </span>{' '}
            in Minutes
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Choose from three customizable templates, fill in your details, and download as PDF or HTML.
            No registration, no data stored — just your resume, your way.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
            >
              Get Started Free
            </button>
            <a
              href="#templates"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Templates
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Everything You Need
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
          A simple, fast, and private resume builder with all the essential features.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Choose Your Template
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
            Three distinct styles, each crafted to make your experience shine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map(t => (
              <TemplatePreview key={t.id} templateId={t.id} name={t.name} desc={t.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Simple Pricing
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
          Start for free. Upgrade when you need more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Free</h3>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-4">$0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Forever free</p>
            <ul className="mt-6 space-y-3">
              {['Minimal template', 'PDF & HTML export', 'Dark mode', 'Auto-save', 'Drag & drop'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onGetStarted}
              className="mt-8 w-full px-4 py-3 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </button>
          </div>
          <div className="p-8 rounded-2xl border-2 border-indigo-500 bg-white dark:bg-gray-900 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-indigo-500 text-white text-xs font-semibold rounded-full">
              Premium
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Premium</h3>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-4">$5</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">One-time purchase</p>
            <ul className="mt-6 space-y-3">
              {['All 3 templates', 'PDF & HTML export', 'Dark mode', 'Auto-save', 'Drag & drop', 'Priority updates'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onGetStarted}
              className="mt-8 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/25 transition-all"
            >
              Try Premium Free
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Create Your Resume?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
            No sign-up, no hassle. Start building your professional resume right now.
          </p>
          <button
            type="button"
            onClick={onGetStarted}
            className="px-8 py-3.5 text-base font-semibold text-indigo-600 bg-white rounded-xl hover:bg-indigo-50 shadow-lg transition-colors"
          >
            Launch Resume Builder
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Resume Builder. Open source.
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="/privacy.html" className="hover:underline" target="_blank">Privacy</a>
            <a href="/terms.html" className="hover:underline" target="_blank">Terms</a>
            <a href="https://github.com/rafaeltmanso/resume-builder" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}