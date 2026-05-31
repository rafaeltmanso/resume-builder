# Resume Builder

**Free, open-source, privacy-first resume and CV builder. No sign-up, no tracking, no servers.**

Open the app directly into a focused editing workspace, choose from 3 templates, fill in your details, and export as PDF or HTML. Your data never leaves your browser.

Live at [resume-builder-zeta.vercel.app](https://resume-builder-zeta.vercel.app/)

---

## Features

| Feature | Description |
|---|---|
| **3 Templates** | Minimal (clean), Modern (card-based), Professional (serif) |
| **PDF Export** | High-resolution A4 PDF via html2canvas + jsPDF, multi-page aware |
| **HTML Export** | Standalone HTML with embedded styles |
| **Auto-Save** | Saves to localStorage automatically on every change |
| **Dark Mode** | System preference detection + manual toggle |
| **Drag & Drop** | Reorder experience, education, and skills sections |
| **Import / Export** | Load and save resume data as JSON files |
| **Keyboard Shortcuts** | Ctrl+S save, Ctrl+E export PDF, Ctrl+L toggle dark mode |
| **Offline Support** | Service worker caches the app after first load |
| **Privacy First** | Zero servers, zero tracking, 100% client-side |
| **Open Source** | MIT licensed, built by [Rafael Manso](https://github.com/rafaeltmanso) |

## Templates

### Minimal
Clean, distraction-free layout. Best for: developers, engineers, academics.

### Modern
Bold accent colors with card-based sections. Best for: product managers, designers, marketers.

### Professional
Traditional serif typography with strong hierarchy. Best for: finance, consulting, legal.

---

## Quick Start

```bash
git clone https://github.com/rafaeltmanso/resume-builder.git
cd resume-builder
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Production Build

```bash
npm run build    # Type-check + Vite production bundle
npm run preview  # Preview the production build locally
```

---

## Project Structure

```
src/
  components/
    Builder.tsx           # Editor-first workspace and preview layout
    ResumePreview.tsx     # Live template preview renderer
    DownloadButton.tsx    # PDF & HTML export
    TemplateSelector.tsx  # Template picker
    DraggableList.tsx     # Drag-and-drop reorder wrapper
    Toast.tsx             # Toast notification system
    AutoSaveIndicator.tsx # Save state indicator
    PremiumBadge.tsx      # Free plan badge
    PremiumSettings.tsx   # Premium key activation
    forms/
      PersonalInfoForm.tsx
      ExperienceForm.tsx
      EducationForm.tsx
      SkillsForm.tsx
    templates/
      MinimalTemplate.tsx
      ModernTemplate.tsx
      ProfessionalTemplate.tsx
  hooks/
    useLocalStorage.ts    # localStorage persistence hook
    useTheme.ts           # Dark mode hook
  types/
    resume.ts             # TypeScript types & defaults
  utils/
    sampleData.ts         # Sample resume for preview
  index.css               # Tailwind + custom styles
  main.tsx                # App entry + SW registration
  App.tsx                 # Page router (landing / builder)

public/
  manifest.json           # PWA manifest
  sw.js                   # Service worker (offline caching)
  favicon.svg             # App favicon
  og-image.png            # Social share image
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+S` | Show save confirmation toast |
| `Ctrl+E` | Trigger PDF export |
| `Ctrl+L` | Toggle dark/light mode |
| `?` | Show shortcuts help |

---

## Privacy

- **No servers.** All data is stored in your browser's `localStorage`.
- **No tracking.** Analytics use [GoatCounter](https://goatcounter.com/) which is privacy-respecting and cookie-free.
- **No sign-up.** You can use the app immediately.
- **Open source.** Audit the code at [github.com/rafaeltmanso/resume-builder](https://github.com/rafaeltmanso/resume-builder).

---

## Tech Stack

- **React 19** + TypeScript (verbatimModuleSyntax)
- **Vite 8** — build tool
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin
- **jsPDF** + **html2canvas** — PDF generation
- **Playwright** — E2E smoke tests
- **GitHub Actions** — CI pipeline (type-check, lint, build, tests)

---

## Deploy

The app deploys automatically to **Vercel** on push to `main`.

For other hosts:

```bash
npm run build
# Upload the `dist/` folder
```

The service worker handles offline caching automatically.

---

## Running Tests

```bash
npm install
npx playwright install --with-deps chromium  # Install browsers
npm run build
npm run test
```

---

## License

MIT — use it however you want. Attribution appreciated.
