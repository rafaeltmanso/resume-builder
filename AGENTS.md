# Resume Builder - Developer Guide

## Commands

```bash
npm run dev       # Vite dev server at localhost:5173
npm run build     # tsc -b && vite build (type-check + bundle)
npm run typecheck # tsc --noEmit (type-check only, faster)
npm run lint      # ESLint (flat config)
npm run preview   # Vite preview of production build
npm test          # Playwright (install browsers: npx playwright install)
```

## Architecture

- **SPA, no router**: `App.tsx` uses `useState<'landing'|'builder'>('landing')` to toggle between `LandingPage` and `Builder`. No URL changes.
- **Forms**: `Builder.tsx` centralizes all state + handlers. Form components (`forms/*.tsx`) are purely presentational.
- **Templates**: `templates/*.tsx` receive `ResumeData` props and render pure JSX. Lazy-loaded via `React.lazy` (~2.8 kB each).
- **Validation**: on-blur validation in form components for required fields, email format, and URL format.
- **Toast system**: `toastStore.ts` module (no context/state lib). `Toast.tsx` reads from it.

## Key Technical Details

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (PostCSS not used).
- **Dark mode**: `@custom-variant dark (&:where(.dark, .dark *));` in `index.css`. `useTheme` hook toggles `.dark` on `<html>`, persisted to localStorage.
- **Persistence**: `useLocalStorage` hook for resume data, selected template, and premium status. Initial load defaults to `sampleData`.
- **PDF export**: jsPDF + html2canvas captures `#resume-preview`. Splits image if content overflows A4. HTML export embeds page styles inline.
- **Premium**: test key `premium-demo` unlocks `modern` and `professional` templates. Free tier: `minimal` only.
- **Service Worker** (`public/sw.js`): stale-while-revalidate for navigation, cache-first for same-origin assets. Caches versioned (`v2`). PWA manifest in `public/manifest.json`.
- **TypeScript**: `verbatimModuleSyntax` — use `import type { ... }` for type-only imports. Also `erasableSyntaxOnly` (no enums, no namespaces).

## Files

| Path | Role |
|---|---|
| `src/App.tsx` | SPA toggle: landing vs builder |
| `src/components/Builder.tsx` | Main builder — state, handlers, layout |
| `src/components/LandingPage.tsx` | Marketing page (hero, features, pricing, template previews) |
| `src/components/ResumePreview.tsx` | Renders selected template inside `#resume-preview` |
| `src/components/DownloadButton.tsx` | PDF/HTML export with loading spinner |
| `src/components/DraggableList.tsx` | Native HTML5 drag-and-drop sortable list |
| `src/components/TemplateSelector.tsx` | Template picker with thumbnail previews |
| `src/components/PremiumSettings.tsx` | License key activation UI |
| `src/components/PremiumBadge.tsx` | Lock/unlock icon on template cards |
| `src/components/AutoSaveIndicator.tsx` | Save state indicator (saving/saved/error) |
| `src/components/Toast.tsx` + `toastStore.ts` | Toast notification system |
| `src/components/forms/*.tsx` | Presentational form components (PersonalInfo, Experience, Education, Skills) |
| `src/hooks/useTheme.ts` | Dark mode with system preference fallback |
| `src/hooks/useLocalStorage.ts` | Generic localStorage-backed state hook |
| `src/types/resume.ts` | `ResumeData`, `TemplateId`, `defaultResumeData`, sub-types |
| `src/utils/sampleData.ts` | Demo resume data for first visit |
| `public/sw.js` | Service worker (network-first nav, cache-first assets) |
| `public/manifest.json` | PWA manifest |

## Deployment (Vercel)

- Production URL: `https://resume-builder-zeta.vercel.app`
- Deploy: `npx vercel --prod --yes` (Vite auto-detected, output dir `dist`)
- No `vercel.json` needed for SPA (no URL-based routing)
