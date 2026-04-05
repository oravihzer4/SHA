# SHA — Studio landing

Luxury interior design landing page for **SHA** (Shani Shay). Built with **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Prerequisites

- Node.js 18+

## Setup

```bash
cd /Users/oravihzer/Desktop/SHA
npm install
```

## Run (development)

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

`preview` serves the `dist/` folder locally.

## Media & branding

- Raster assets live in **`/media`** at the project root. They are discovered via `import.meta.glob` in `src/config/assets.ts` and imported explicitly where needed (e.g. logos in `src/config/branding.ts`).
- Update **`WHATSAPP_NUMBER`** in `src/config/branding.ts` with your business number (country code, no `+`).
- The contact form is a **front-end demo**; wire `onSubmit` to your API, [Formspree](https://formspree.io), or email service.
- Some JPEGs/PNGs in `media` are very large. For faster loads, compress exports (e.g. Squoosh, `sharp`, or CDN image optimization) and optionally add **WebP** URLs to `OptimizedImage` via the `modernSrc` prop.

## Project structure

```
SHA/
├── media/                 # Brand assets (unchanged)
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── config/
│   │   ├── assets.ts      # Glob registry for /media
│   │   └── branding.ts    # Logos + WhatsApp
│   ├── data/
│   │   └── services.ts    # Services + testimonials copy
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Portfolio.tsx
│       ├── Services.tsx
│       ├── Testimonials.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       ├── Button.tsx
│       ├── Reveal.tsx
│       └── OptimizedImage.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## PDF guidelines

`Studio SHA Brand Guidelines.pdf` in `media` is not loaded by the app; use it as the source of truth for print and extended brand rules.
