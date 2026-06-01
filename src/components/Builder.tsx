import { useCallback, useEffect, useRef, useState } from 'react';
import type { ResumeData, TemplateId } from '../types/resume';
import { defaultResumeData } from '../types/resume';
import { useTheme } from '../hooks/useTheme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleData } from '../utils/sampleData';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './ResumePreview';
import DownloadButton from './DownloadButton';
import PremiumSettings from './PremiumSettings';
import PremiumBadge from './PremiumBadge';
import ToastContainer from './Toast';
import { toast } from './toastStore';
import type { SaveState } from './AutoSaveIndicator';
import AutoSaveIndicator from './AutoSaveIndicator';
import { BrandMark, BrandWordmark } from './BrandLogo';

interface Props {
  onGoHome?: () => void;
}

export default function Builder({ onGoHome }: Props) {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', sampleData);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<TemplateId>('selectedTemplate', 'minimal');
  const [isPremium, setIsPremium] = useLocalStorage('isPremium', false);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const { isDark, toggle } = useTheme();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track save state on data changes
  const triggerSave = useCallback(() => {
    setSaveState('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveState('saved');
    }, 800);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S — force save feedback
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setSaveState('saved');
        toast.success('Resume saved');
      }
      // Ctrl/Cmd + E — export PDF
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        document.getElementById('download-pdf-btn')?.click();
      }
      // Ctrl/Cmd + L — toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggle();
      }
      // ? — show keyboard shortcuts
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          toast.info('Ctrl+S: save · Ctrl+E: export PDF · Ctrl+L: toggle dark mode · ?: show shortcuts');
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggle]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const loadSample = useCallback(() => {
    setResumeData(sampleData);
    triggerSave();
    toast.success('Sample data loaded');
  }, [setResumeData, triggerSave]);

  const clearAll = useCallback(() => {
    if (window.confirm('Clear all resume data? This cannot be undone.')) {
      setResumeData(defaultResumeData);
      triggerSave();
      toast.info('Resume cleared');
    }
  }, [setResumeData, triggerSave]);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    triggerSave();
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  }, [setResumeData, triggerSave]);

  const addExperience = useCallback(() => {
    const newExp = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorking: false,
    };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const updateExperience = useCallback((id: string, field: string, value: string | boolean) => {
    triggerSave();
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, [setResumeData, triggerSave]);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const moveExperience = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.experience];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, experience: items };
    });
    triggerSave();
  }, [setResumeData, triggerSave]);

  const addEducation = useCallback(() => {
    const newEdu = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const updateEducation = useCallback((id: string, field: string, value: string) => {
    triggerSave();
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, [setResumeData, triggerSave]);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const moveEducation = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.education];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, education: items };
    });
    triggerSave();
  }, [setResumeData, triggerSave]);

  const addSkill = useCallback(() => {
    const newSkill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate' as const,
    };
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const updateSkill = useCallback((id: string, field: string, value: string) => {
    triggerSave();
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  }, [setResumeData, triggerSave]);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
    triggerSave();
  }, [setResumeData, triggerSave]);

  const moveSkill = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.skills];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, skills: items };
    });
    triggerSave();
  }, [setResumeData, triggerSave]);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'resume'}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported');
  }, [resumeData]);

  const importData = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string) as ResumeData;
          setResumeData(data);
          toast.success('Data imported successfully');
        } catch {
          toast.error('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setResumeData]);

  const hasContact = Boolean(resumeData.personalInfo.email || resumeData.personalInfo.phone || resumeData.personalInfo.location);
  const completedSections = [
    Boolean(resumeData.personalInfo.fullName && hasContact),
    Boolean(resumeData.personalInfo.summary),
    resumeData.experience.length > 0,
    resumeData.education.length > 0,
    resumeData.skills.length > 0,
  ].filter(Boolean).length;
  const completion = Math.round((completedSections / 5) * 100);
  const completionLabel = `${completedSections} of 5 sections`;

  const scrollToPreview = useCallback(() => {
    document.getElementById('resume-preview-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  return (
    <div className="min-h-screen bg-neutral-50 text-stone-950 transition-colors dark:bg-neutral-950 dark:text-stone-100">
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-300/80 bg-stone-50/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onGoHome?.()}
            className="flex min-w-0 items-center gap-4 rounded-md text-left transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400"
            aria-label="Back to home"
          >
            <BrandMark className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-sm">
                  <BrandWordmark />
                </h1>
                {!isPremium && <PremiumBadge />}
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span title={`${completion}% complete`}>{completionLabel}</span>
                <span aria-hidden="true">/</span>
                <AutoSaveIndicator state={saveState} />
                {saveState === 'saved' && <span>Saved locally</span>}
              </div>
            </div>
          </button>
          <nav className="flex items-center gap-1.5" aria-label="Toolbar">
            <button
              type="button"
              onClick={loadSample}
              className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-200 dark:hover:bg-neutral-800"
              title="Load sample data"
              aria-label="Load sample resume data"
            >
              Sample
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-200 dark:hover:bg-neutral-800"
              title="Clear all data"
              aria-label="Clear all resume data"
            >
              Clear
            </button>
            <div className="mx-1 h-6 w-px bg-stone-300 dark:bg-neutral-800" aria-hidden="true" />
            <button
              type="button"
              onClick={importData}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-stone-600 transition hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800"
              aria-label="Import resume data from JSON file"
              title="Import JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden sm:inline">Import</span>
            </button>
            <button
              type="button"
              onClick={exportData}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-stone-600 transition hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800"
              aria-label="Export resume data as JSON file"
              title="Export JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              type="button"
              onClick={toggle}
              className="rounded-md p-2 text-stone-600 transition hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-neutral-800"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode (Ctrl+L)' : 'Dark mode (Ctrl+L)'}
            >
              {isDark ? (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[minmax(420px,0.9fr)_minmax(520px,1.1fr)]" id="main-content">
        {/* Editor Panel */}
        <div
          className="p-4 pb-24 sm:p-6 lg:max-h-[calc(100vh-64px)] lg:overflow-y-auto lg:pb-6"
          role="main"
          aria-label="Resume editor"
        >
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="flex items-center justify-end lg:hidden">
              <button
                type="button"
                onClick={scrollToPreview}
                className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-stone-200"
              >
                Jump to preview
              </button>
            </div>

            <section
              className="rounded-lg border border-stone-300 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5"
              aria-labelledby="template-heading"
            >
              <h2 id="template-heading" className="mb-4 text-sm font-semibold text-stone-800 dark:text-stone-200">
                Template
              </h2>
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={(t) => { setSelectedTemplate(t); }}
                isPremium={isPremium}
              />
            </section>

            <PersonalInfoForm
              data={resumeData.personalInfo}
              onChange={updatePersonalInfo}
            />

            <ExperienceForm
              experiences={resumeData.experience}
              onAdd={addExperience}
              onUpdate={updateExperience}
              onRemove={removeExperience}
              onMove={moveExperience}
            />

            <EducationForm
              education={resumeData.education}
              onAdd={addEducation}
              onUpdate={updateEducation}
              onRemove={removeEducation}
              onMove={moveEducation}
            />

            <SkillsForm
              skills={resumeData.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onRemove={removeSkill}
              onMove={moveSkill}
            />

            <PremiumSettings
              isPremium={isPremium}
              onActivate={() => { setIsPremium(true); toast.success('Premium activated!'); }}
              onDeactivate={() => setIsPremium(false)}
            />

            <footer className="pb-4 text-center text-xs text-stone-500 dark:text-stone-500">
              <div className="flex items-center justify-center gap-2">
                <a href="/privacy.html" className="hover:underline" target="_blank" rel="noopener noreferrer">Privacy</a>
                <span aria-hidden="true">·</span>
                <a href="/terms.html" className="hover:underline" target="_blank" rel="noopener noreferrer">Terms</a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://github.com/rafaeltmanso/resume-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
              <p>Resume Builder v2 — 100% private. Your data never leaves your browser.</p>
            </footer>
          </div>
        </div>

        {/* Preview Panel */}
        <div
          id="resume-preview-panel"
          className="border-t border-stone-300 bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/60 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:overflow-y-auto lg:border-l lg:border-t-0"
          aria-label="Resume preview"
          role="complementary"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Preview
                </h2>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                  A4 export view
                </p>
              </div>
              <div className="hidden lg:block">
                <DownloadButton
                  templateId={selectedTemplate}
                  resumeData={resumeData}
                  isPremium={isPremium}
                />
              </div>
            </div>
            <ResumePreview
              data={resumeData}
              templateId={selectedTemplate}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-300 bg-stone-50/95 px-4 py-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 lg:hidden">
        <DownloadButton
          templateId={selectedTemplate}
          resumeData={resumeData}
          isPremium={isPremium}
        />
      </div>

      <ToastContainer />
    </div>
  );
}
