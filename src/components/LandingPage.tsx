import { lazy, Suspense } from 'react';
import BrandLogo, { BrandMark } from './BrandLogo';
import { useTheme } from '../hooks/useTheme';
import { sampleData } from '../utils/sampleData';

const MinimalTemplate = lazy(() => import('./templates/MinimalTemplate'));

interface Props {
  onGetStarted: () => void;
}

const workflow = [
  { title: 'Write once', copy: 'Add profile, work, education, and skills in a focused editor.' },
  { title: 'Preview live', copy: 'Keep the export view visible while you make changes.' },
  { title: 'Export cleanly', copy: 'Download a polished PDF or standalone HTML file.' },
];

const principles = [
  'Local autosave',
  'No account required',
  'PDF and HTML export',
  'Import and export JSON',
  'Template lock states',
  'Dark mode workspace',
];

function ProductPreview() {
  return (
    <div
      className="pointer-events-none w-full overflow-hidden rounded-xl border border-stone-300 bg-stone-100 shadow-[0_24px_80px_rgba(28,25,23,0.16)] dark:border-neutral-800 dark:bg-neutral-900"
      aria-hidden="true"
    >
      <div className="flex h-11 items-center justify-between border-b border-stone-300 bg-stone-50 px-4 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center gap-3">
          <BrandMark className="h-7 w-7" />
          <div>
            <div className="h-2 w-24 rounded-full bg-stone-800 dark:bg-stone-200" />
            <div className="mt-1.5 h-1.5 w-32 rounded-full bg-stone-300 dark:bg-neutral-700" />
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-7 w-16 rounded-md border border-stone-300 bg-white dark:border-neutral-700 dark:bg-neutral-900" />
          <div className="h-7 w-16 rounded-md bg-cyan-700 dark:bg-cyan-400" />
        </div>
      </div>
      <div className="grid min-h-[320px] grid-cols-1 overflow-hidden sm:min-h-[380px] md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:min-h-[420px]">
        <div className="hidden min-w-0 border-r border-stone-300 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 md:block">
          <div className="rounded-lg border border-stone-300 p-3 dark:border-neutral-800">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="h-2 w-16 rounded-full bg-cyan-700 dark:bg-cyan-400" />
                <div className="mt-3 h-4 w-full max-w-36 rounded-full bg-stone-900 dark:bg-stone-100" />
              </div>
              <div className="h-8 w-20 shrink-0 rounded-full bg-stone-200 dark:bg-neutral-800" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map(item => (
                <div key={item} className="h-12 rounded-md border border-stone-200 bg-stone-50 dark:border-neutral-800 dark:bg-neutral-950" />
              ))}
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {[0, 1, 2].map(item => (
              <div key={item} className="rounded-md border border-stone-200 bg-stone-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="h-2 w-20 rounded-full bg-stone-300 dark:bg-neutral-700" />
                <div className="mt-2 h-7 rounded-md border border-stone-300 bg-white dark:border-neutral-700 dark:bg-neutral-900" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden bg-stone-200/70 dark:bg-neutral-950">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-stone-300/80 px-4 py-3 dark:border-neutral-800">
            <div>
              <div className="h-2 w-14 rounded-full bg-stone-400 dark:bg-neutral-600" />
              <div className="mt-2 h-3 w-24 rounded-full bg-stone-500 dark:bg-neutral-500" />
            </div>
            <div className="h-8 w-24 shrink-0 rounded-md bg-cyan-700 dark:bg-cyan-400" />
          </div>
          <div className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-5">
            <div className="relative h-[min(52vw,420px)] w-full max-w-[340px] overflow-hidden rounded-sm bg-white shadow-2xl sm:h-[400px] sm:max-w-[380px]">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 origin-top scale-[0.42] sm:scale-[0.48]"
                style={{ width: 800 }}
              >
                <Suspense fallback={<div className="h-[1056px] bg-white" />}>
                  <MinimalTemplate data={sampleData} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ onGetStarted }: Props) {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-neutral-50 text-stone-950 dark:bg-neutral-950 dark:text-stone-100">
      <header className="sticky top-0 z-50 border-b border-stone-300/80 bg-stone-50/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <BrandLogo size="md" />
          <nav className="flex items-center gap-2" aria-label="Primary">
            <a href="#templates" className="hidden rounded-md px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800 sm:inline-flex">
              Templates
            </a>
            <a href="#privacy" className="hidden rounded-md px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800 sm:inline-flex">
              Privacy
            </a>
            <button
              type="button"
              onClick={toggle}
              className="rounded-md p-2 text-stone-600 transition hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-md bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200"
            >
              Open builder
            </button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-stone-300 dark:border-neutral-800">
          <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="max-w-xl lg:max-w-none">
                <p className="font-display text-sm font-semibold text-cyan-800 dark:text-cyan-400">Resume Builder</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]" style={{ textWrap: 'balance' }}>
                  Build a resume without leaving the browser.
                </h1>
                <p className="mt-5 text-lg leading-8 text-stone-600 dark:text-stone-300">
                  A focused editor, live A4 preview, local autosave, and clean exports. No account flow, no dashboard sprawl, no data sent to a server.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={onGetStarted}
                    className="inline-flex justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500"
                  >
                    Start editing
                  </button>
                  <a
                    href="#workflow"
                    className="inline-flex justify-center rounded-md border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-100 dark:hover:bg-neutral-800"
                  >
                    See workflow
                  </a>
                </div>
              </div>
              <div className="min-w-0 lg:justify-self-end">
                <ProductPreview />
              </div>
            </div>
          </div>
        </section>

        <section id="workflow" className="border-b border-stone-300 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50" style={{ textWrap: 'balance' }}>Designed for finishing, not fiddling.</h2>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">Three steps from blank page to export.</p>
              </div>
              <ol className="grid gap-3 sm:grid-cols-3">
                {workflow.map((item, index) => (
                  <li key={item.title} className="rounded-lg border border-stone-300 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950">
                    <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Step {index + 1}</span>
                    <h3 className="mt-3 text-base font-semibold text-stone-950 dark:text-stone-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">{item.copy}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="templates" className="border-b border-stone-300 py-16 dark:border-neutral-800">
          <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50" style={{ textWrap: 'balance' }}>Three export styles, one editor.</h2>
              <p className="mt-4 text-sm leading-6 text-stone-600 dark:text-stone-400">
                Minimal is available by default. Modern and Professional remain available behind the existing premium unlock flow.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Minimal', 'Modern', 'Professional'].map((template, index) => (
                <div key={template} className="flex h-full flex-col rounded-lg border border-stone-300 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="h-32 rounded-md border border-stone-200 bg-stone-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className={`h-2 rounded-full ${index === 1 ? 'bg-cyan-700 dark:bg-cyan-400' : 'bg-stone-800 dark:bg-stone-200'} w-3/4`} />
                    <div className="mt-2 h-1.5 w-1/2 rounded-full bg-stone-300 dark:bg-neutral-700" />
                    <div className="mt-6 space-y-2">
                      <div className="h-1.5 rounded-full bg-stone-300 dark:bg-neutral-700" />
                      <div className="h-1.5 w-5/6 rounded-full bg-stone-200 dark:bg-neutral-800" />
                      <div className="h-1.5 w-2/3 rounded-full bg-stone-200 dark:bg-neutral-800" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-stone-950 dark:text-stone-50">{template}</h3>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{index === 0 ? 'Included' : 'Premium template'}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="privacy" className="bg-white py-16 dark:bg-neutral-900">
          <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950 dark:text-stone-50" style={{ textWrap: 'balance' }}>Small surface area. Clear behavior.</h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {principles.map(item => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-stone-300">
                  <span className="h-2 w-2 rounded-full bg-cyan-700 dark:bg-cyan-400" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-300 bg-stone-50 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm text-stone-500 dark:text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            <span className="font-display font-medium text-stone-600 dark:text-stone-300">Resume Builder</span>
            <span className="text-stone-400 dark:text-stone-500"> v2</span>
          </span>
          <div className="flex gap-4">
            <a href="/privacy.html" className="hover:underline" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="/terms.html" className="hover:underline" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="https://github.com/rafaeltmanso/resume-builder" className="hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
