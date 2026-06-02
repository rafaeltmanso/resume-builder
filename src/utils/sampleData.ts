import type { ResumeData } from '../types/resume';

export const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'Jane Doe',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
    linkedIn: 'linkedin.com/in/alexchen',
    website: 'alexchen.dev',
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022-03',
      endDate: '',
      description: 'Led a team of 4 developers migrating a monolith to microservices. Improved deployment frequency by 60% through CI/CD optimization.',
      currentlyWorking: true,
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full-Stack Developer',
      startDate: '2019-07',
      endDate: '2022-02',
      description: 'Built the core product from MVP to 10K users. Architected the frontend in React and backend in Node.js.',
      currentlyWorking: false,
    },
    {
      id: '3',
      company: 'WebAgency Co.',
      position: 'Junior Developer',
      startDate: '2018-01',
      endDate: '2019-06',
      description: 'Developed responsive web applications for 15+ clients using React and Vue.js.',
      currentlyWorking: false,
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
    },
  ],
  skills: [
    { id: '1', name: 'TypeScript', level: 'advanced' },
    { id: '2', name: 'React', level: 'advanced' },
    { id: '3', name: 'Node.js', level: 'advanced' },
    { id: '4', name: 'Python', level: 'intermediate' },
    { id: '5', name: 'PostgreSQL', level: 'intermediate' },
    { id: '6', name: 'Docker', level: 'intermediate' },
    { id: '7', name: 'AWS', level: 'intermediate' },
    { id: '8', name: 'Figma', level: 'beginner' },
  ],
};