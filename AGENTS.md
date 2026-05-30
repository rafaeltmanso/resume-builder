# Resume Builder - Developer Guide

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Type-check + production build to dist/
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **PDF Export**: jsPDF + html2canvas
- **State**: React useState/useCallback (no external state library)

## Key Files

- `src/types/resume.ts` - Core data types (`ResumeData`, `TemplateId`)
- `src/components/Builder.tsx` - Main app component with form logic
- `src/components/templates/*.tsx` - Three resume templates
- `src/components/DownloadButton.tsx` - PDF/HTML export
- `src/components/forms/*.tsx` - Input forms for each section

## Architecture Notes

- Templates receive `ResumeData` and render pure JSX (no external deps)
- PDF export uses html2canvas to capture `#resume-preview` element
- Premium templates (`modern`, `professional`) require `isPremium=true` to unlock
- Free tier: `minimal` template only with PDF export

## TypeScript

Uses `verbatimModuleSyntax` - import types with `import type { ... }`.