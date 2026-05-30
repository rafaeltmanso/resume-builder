# Resume Builder - Developer Guide

## Commands

```bash
npm run dev      # Start dev server at localhost:5173 (switches port if busy)
npm run build    # tsc -b && vite build (both type-check + bundle)
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework**: React 19 + TypeScript (Vite 8)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **PDF Export**: jsPDF + html2canvas (captures `#resume-preview`)
- **State**: React useState/useCallback only (no external state lib)
- **Persistence**: `useLocalStorage` hook auto-saves resume data, template, and premium status
- **Dark Mode**: `useTheme` hook with `.dark` class on `<html>`, persisted to localStorage

## Key Files

- `src/types/resume.ts` - Core data types (`ResumeData`, `TemplateId`, `defaultResumeData`)
- `src/components/Builder.tsx` - Main app component (all form handlers, data flow)
- `src/components/templates/*.tsx` - Three resume templates: Minimal, Modern, Professional
- `src/components/forms/*.tsx` - Input forms (PersonalInfo, Experience, Education, Skills)
- `src/components/DownloadButton.tsx` - PDF/HTML export with multi-page support
- `src/components/DraggableList.tsx` - Generic sortable list using native HTML5 drag-and-drop API
- `src/hooks/useTheme.ts` - Dark mode with system preference fallback, persisted to localStorage
- `src/hooks/useLocalStorage.ts` - Generic localStorage-backed state hook
- `src/utils/sampleData.ts` - Demo data for quick testing

## Architecture Notes

- Templates receive `ResumeData` and render pure JSX (no external deps)
- `#resume-preview` div is the capture target for html2canvas
- Dark mode via `@custom-variant dark (&:where(.dark, .dark *));` in CSS
- Premium templates (`modern`, `professional`) require `isPremium=true` to unlock (test key: `premium-demo`)
- Free tier: `minimal` template only, download buttons disabled for locked templates
- PDF multi-page: splits image across pages if content overflows A4
- HTML export embeds page styles inline for standalone rendering
- JSON import/export in header (import via file picker, export as download)

## TypeScript

Uses `verbatimModuleSyntax` - import types with `import type { ... }`.