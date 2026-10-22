# CHISA.dev 

Production-ready developer portfolio for **Chisanupong Kongchang**, built with
Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
Optimized for zero-config deployment on Vercel.

## Quick start

```bash
npm install     # install dependencies
npm run dev     # start at http://localhost:3000
npm run build   # production build
npm run typecheck && npm run lint
```

## Stack

- Next.js 15 App Router · React 19 · TypeScript (strict)
- Tailwind CSS v3 (CSS-variable theme tokens)
- Framer Motion · Lucide React
- No server dependencies, no env vars required

## Public assets checklist (`/public`)

| Path | Used by |
| --- | --- |
| `profile/profile1.jpg` | Hero portrait |
| `Chisanupong_Kongchang_CV_Resume.pdf` | Hero "Download CV" button (**add your CV**) |
| `images/pic2.png` | Python Essentials 1 thumbnail (Cisco) |
| `images/pic3.png` | NCSA MOOC 1 thumbnail |
| `images/pic4.png` | Fortinet CyberNet Pro thumbnail |
| `images/cert1.pdf` | Python Essentials 1 certificate PDF |
| `images/cert2.pdf` | NCSA MOOC 1 certificate PDF |
| `images/cert3.pdf` | Fortinet CyberNet Pro certificate PDF |
| `images/dropdoii1.jpg` | DROPDOII live music card |
| `images/smo1.jpg` | Smo Techno student union card |
| `images/lanner/lanner1.jpg` `lanner2.jpg` `lanner3.jpg` | Lanner article lightbox (thumb = `lanner3.jpg`) |
| `images/cyber/cyber1.jpg` `cyber2.jpg` | Cyber Net Pro workshop lightbox |
| `images/converse/converse1.jpg` `converse2.jpg` | CPE PSRU co-op seminar lightbox |
| `chatbot/chatbot1.png` … `chatbot4.png` | CPE AI CHAT BOT showcase carousel |
| `rome/rome1.png` … `rome3.png` | Item Spawner ROMESTEAD showcase carousel |
| `dormi/dormi1.png` … `dormi3.png` | Dormi showcase carousel |
| `fx-gaze/fxgaze1.png` … `fxgaze3.png` | FxGaze showcase carousel |

Note: `images/pic2.png`, `pic3.png`, `pic4.png`, and `images/dropdoii1.jpg` ship
as **generated gradient placeholders** — replace them with the real certificate
thumbnails and band photo. The CV PDF is not included; drop yours at
`public/Chisanupong_Kongchang_CV_Resume.pdf`.

## Customization

- **All copy** (bilingual TH/EN) lives in [`data/content.ts`](data/content.ts) —
  edit there, never inside components.
- Theme tokens (obsidian / alabaster) live at the top of
  [`app/globals.css`](app/globals.css).
- Accent palette: `violet #8b5cf6`, `magenta #ec4899`, `cyan #06b6d4`.
- Update `siteMetadata.canonicalUrl` in `data/content.ts` before deploying to
  your real domain (feeds metadata, sitemap, robots, and JSON-LD).

## Deploy

Zero-config Vercel deploy: import the repo at
[vercel.com/new](https://vercel.com/new) → Next.js preset → Deploy. No
environment variables, no adapters, no server dependencies.

## Features

- Interactive guitar-signal waveform canvas ("DROPDOII // OPEN D" toggle in the
  navbar pauses it; persisted, disabled under reduced-motion)
- 3D tilt cards with radial violet/magenta spotlight borders
- Bilingual TH/EN switching (persisted, blur/opacity swap transition)
- Dark / light themes (persisted, no flash — boot script paints before hydration)
- Animated project category filtering, carousels, and a keyboard-accessible
  fullscreen lightbox with swipe + focus trap
- Full SEO: metadata, Open Graph, Twitter cards, JSON-LD `Person`, sitemap, robots
