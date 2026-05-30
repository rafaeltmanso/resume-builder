import { useCallback } from 'react';
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

export default function Builder() {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('resumeData', sampleData);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<TemplateId>('selectedTemplate', 'minimal');
  const [isPremium, setIsPremium] = useLocalStorage('isPremium', false);
  const { isDark, toggle } = useTheme();

  const loadSample = useCallback(() => {
    setResumeData(sampleData);
  }, [setResumeData]);

  const clearAll = useCallback(() => {
    setResumeData(defaultResumeData);
  }, [setResumeData]);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  }, [setResumeData]);

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
  }, [setResumeData]);

  const updateExperience = useCallback((id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, [setResumeData]);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }, [setResumeData]);

  const moveExperience = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.experience];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, experience: items };
    });
  }, [setResumeData]);

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
  }, [setResumeData]);

  const updateEducation = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, [setResumeData]);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, [setResumeData]);

  const moveEducation = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.education];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, education: items };
    });
  }, [setResumeData]);

  const addSkill = useCallback(() => {
    const newSkill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate' as const,
    };
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  }, [setResumeData]);

  const updateSkill = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  }, [setResumeData]);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, [setResumeData]);

  const moveSkill = useCallback((fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const items = [...prev.skills];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { ...prev, skills: items };
    });
  }, [setResumeData]);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName || 'resume'}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
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
        } catch {
          alert('Invalid JSON file. Please select a valid resume data file.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setResumeData]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">Resume Builder</h1>
            {!isPremium && <PremiumBadge />}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadSample}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Clear
            </button>
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600" />
            <button
              type="button"
              onClick={importData}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Import resume data from JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </button>
            <button
              type="button"
              onClick={exportData}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Export resume data as JSON"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:max-h-[calc(100vh-56px)] lg:overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-5">
            <PremiumSettings
              isPremium={isPremium}
              onActivate={() => setIsPremium(true)}
              onDeactivate={() => setIsPremium(false)}
            />
            <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Template
              </h2>
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
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
            <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pb-4">
              <a href="/privacy.html" className="hover:underline" target="_blank">Privacy</a>
              <span className="mx-2">·</span>
              <a href="/terms.html" className="hover:underline" target="_blank">Terms</a>
              <span className="mx-2">·</span>
              <span>Resume Builder v1</span>
            </footer>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:overflow-y-auto bg-gray-100 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Preview
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
    </div>
  );
}