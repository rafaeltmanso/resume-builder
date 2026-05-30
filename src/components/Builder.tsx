import { useState, useCallback } from 'react';
import type { ResumeData, TemplateId } from '../types/resume';
import { defaultResumeData } from '../types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import TemplateSelector from './TemplateSelector';
import ResumePreview from './ResumePreview';
import DownloadButton from './DownloadButton';
import PremiumBadge from './PremiumBadge';

export default function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('minimal');
  const [isPremium] = useState(false);

  const updatePersonalInfo = useCallback((field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  }, []);

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
  }, []);

  const updateExperience = useCallback((id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }, []);

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
  }, []);

  const updateEducation = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, []);

  const addSkill = useCallback(() => {
    const newSkill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'intermediate' as const,
    };
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  }, []);

  const updateSkill = useCallback((id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[var(--bg)]">
      <div className="w-full lg:w-1/2 p-6 overflow-y-auto max-h-screen">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Resume Builder</h1>
          {!isPremium && <PremiumBadge />}
        </div>

        <div className="space-y-6">
          <section className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-4">
            <h2 className="text-lg font-medium text-[var(--text-h)] mb-4">Template</h2>
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
          />

          <EducationForm
            education={resumeData.education}
            onAdd={addEducation}
            onUpdate={updateEducation}
            onRemove={removeEducation}
          />

          <SkillsForm
            skills={resumeData.skills}
            onAdd={addSkill}
            onUpdate={updateSkill}
            onRemove={removeSkill}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-[var(--social-bg)] p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-[var(--text-h)]">Preview</h2>
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
  );
}