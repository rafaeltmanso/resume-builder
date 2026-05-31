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

export default function Builder() {
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">Resume Builder</h1>
            {!isPremium && <PremiumBadge />}
            <AutoSaveIndicator state={saveState} />
          </div>
          <nav className="flex items-center gap-1" aria-label="Toolbar">
            <button
              type="button"
              onClick={loadSample}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Load sample data"
              aria-label="Load sample resume data"
            >
              Sample
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Clear all data"
              aria-label="Clear all resume data"
            >
              Clear
            </button>
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" aria-hidden="true" />
            <button
              type="button"
              onClick={importData}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Import resume data from JSON file"
              title="Import JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button
              type="button"
              onClick={exportData}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Export resume data as JSON file"
              title="Export JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode (Ctrl+L)' : 'Dark mode (Ctrl+L)'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row" id="main-content">
        {/* Editor Panel */}
        <div
          className="w-full lg:w-1/2 p-4 sm:p-6 lg:max-h-[calc(100vh-56px)] lg:overflow-y-auto"
          role="main"
          aria-label="Resume editor"
        >
          <div className="max-w-2xl mx-auto space-y-5">
            <PremiumSettings
              isPremium={isPremium}
              onActivate={() => { setIsPremium(true); toast.success('Premium activated!'); }}
              onDeactivate={() => setIsPremium(false)}
            />

            <section
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 sm:p-5"
              aria-labelledby="template-heading"
            >
              <h2 id="template-heading" className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Template
              </h2>
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={(t) => { setSelectedTemplate(t); }}
                isPremium={isPremium}
              />
            </section>

            <section aria-labelledby="personal-heading">
              <PersonalInfoForm
                data={resumeData.personalInfo}
                onChange={updatePersonalInfo}
              />
            </section>

            <section aria-labelledby="experience-heading">
              <ExperienceForm
                experiences={resumeData.experience}
                onAdd={addExperience}
                onUpdate={updateExperience}
                onRemove={removeExperience}
                onMove={moveExperience}
              />
            </section>

            <section aria-labelledby="education-heading">
              <EducationForm
                education={resumeData.education}
                onAdd={addEducation}
                onUpdate={updateEducation}
                onRemove={removeEducation}
                onMove={moveEducation}
              />
            </section>

            <section aria-labelledby="skills-heading">
              <SkillsForm
                skills={resumeData.skills}
                onAdd={addSkill}
                onUpdate={updateSkill}
                onRemove={removeSkill}
                onMove={moveSkill}
              />
            </section>

            {/* Keyboard shortcuts reference */}
            <details className="text-xs text-gray-400 dark:text-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-900/50">
              <summary className="cursor-pointer select-none font-medium">Keyboard shortcuts</summary>
              <ul className="mt-2 space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <li><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+S</kbd> Save (show toast)</li>
                <li><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+E</kbd> Export PDF</li>
                <li><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+L</kbd> Toggle dark mode</li>
                <li><kbd className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">?</kbd> Show shortcuts</li>
              </ul>
            </details>

            <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pb-4 space-y-1">
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
          className="w-full lg:w-1/2 lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:overflow-y-auto bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
          aria-label="Resume preview"
          role="complementary"
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sr-only">
                Resume Preview
              </h2>
              <DownloadButton
                templateId={selectedTemplate}
                resumeData={resumeData}
                isPremium={isPremium}
              />
            </div>
            <ResumePreview
              data={resumeData}
              templateId={selectedTemplate}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
