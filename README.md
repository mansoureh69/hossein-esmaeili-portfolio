# Hossein Esmaeili Â· Electrical Engineering Portfolio

A complete React + TypeScript + Vite portfolio based on the supplied Lumora direction. Includes all requested sections, a canvas photo reveal, intro sequence, theme carousel, project case studies, expandable expertise, accessible dialogs, and a demonstration contact form.

## Run locally

Requires Node.js 20.19+ or 22.12+ (tested with Node 24).

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Unlike the earlier standalone HTML, this application must be served by Vite or a static web server after building; do not open its source `index.html` with a `file://` URL.

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. No server or secret credentials are required for the current demo.

## Edit personal content

`src/data/portfolio.ts` is the central content file. Supply:

- Confirmed specialization, location, current role/study, and interests.
- Real project descriptions, technical assets, methods, and outcomes.
- Professional experience, education, and certifications.
- Confirmed tools and skills.
- Email, professional profile URLs, and an optional rÃ©sumÃ© file URL.
- An optional contact endpoint that accepts JSON with `name`, `email`, and `message` and returns a successful HTTP response after delivery. The server must implement validation and spam protection. Do not place secret API keys in frontend code.

The 18 project records, biography, services, education, credentials and professional contact details are based on the supplied client questionnaire. Project-specific roles, dates, results and photos were not supplied; conceptual building diagrams are clearly labeled in project details. Unselected questionnaire examples are not treated as skills.

The contact form makes **no network request** until `profile.contact.endpoint` is set. Its demo success message explicitly says the message was not sent. Missing email, social links, and rÃ©sumÃ© links are omitted.

## Components and accessibility

All sections are in `src/components/`; design tokens and responsive rules are in `src/styles/global.css`. The app uses Motion for React, Lenis, and Lucide React. `App.tsx` coordinates the intro and overlay scroll locks. Native modal dialogs provide background inertness; explicit keyboard wrapping, Escape, backdrop dismissal, and focus restoration are handled by `Dialog.tsx`. Effects clean up under React Strict Mode.

The canvas effect uses the same photograph for both layers, with a technical grid treatment on the revealed layer. It is disabled for reduced motion and touch input. The site uses the visitorâ€™s timezone for the live clock.

## Verification

```sh
npm run test:e2e
```

Playwright is configured to use installed Google Chrome. To use bundled Chromium instead, remove `channel: 'chrome'` from `playwright.config.ts` and run `npx playwright install chromium`.

Checks cover 360, 768, 1024, and 1440px layouts, the loader, carousel wraparound, project dialog, expertise expansion, navigation, contact validation, demo submission without a POST request, focus restoration and wrapping, Escape/backdrop dismissal, and reduced motion.

## Assets

Hero artwork: supplied `hero.jpg`, preserved in `src/assets/hero-original.jpg`. The hero uses `public/images/hero.webp`, optimized to 2200 ? 1228 (about 145 KiB).

Typefaces: Onest Variable and Vazirmatn Variable are self-hosted through Fontsource packages and bundled by Vite. No external font service is required; CSS includes system fallbacks. Interface icons are from Lucide. Technical diagrams are authored specifically for this portfolio.

## Persian and English

Use the header or full-screen menu language button to switch between Persian and English. The choice is saved locally; first-time visitors with a Persian browser locale get Persian, otherwise English. Storage restrictions do not prevent switching.

Persian uses locally bundled Vazirmatn, RTL layout, localized labels, project descriptions, form validation, dialog content, clock and document metadata. Email input and technical diagrams retain their appropriate LTR direction. Language changes do not reload the app or restart the intro.

English source content remains in `src/data/portfolio.ts`. Persian translations are maintained in `src/i18n/fa.ts` and `src/i18n/questionnaire.ts`; add a matching translation when changing an English text. `src/i18n/LanguageContext.tsx` handles language state and translated content.

The browser suite also checks both directions at 360, 768, 1024 and 1440px, persistent language selection, Persian validation and demo submission, switching from the menu, and startup with unavailable local storage.

### Project carousel

The projects section uses the supplied Shutter Blinds Carousel in
`src/components/ui/shutter-blinds-carousel.tsx`. Category filters reset the slider;
project photos appear in order with name, location and area. Keyboard arrows,
swipe, RTL controls and reduced motion are supported. Autoplay is disabled.
The previous particle component remains available in the same UI folder.

Add photos to a project record in `src/data/portfolio.ts`:

```ts
images: [
  { src: '/images/projects/kaveh/01.webp', alt: 'Kaveh building exterior' },
  { src: '/images/projects/kaveh/02.webp', alt: 'Kaveh electrical installations' },
],
```

Store the corresponding files under `public/images/projects/kaveh/`.
Projects without photos show a labelled architectural illustration. The supplied
landscape demo is not used as project photography. Category membership is in
`categoryGroups` in `src/components/Projects.tsx`.

Reusable components are in `src/components/ui`, with portfolio styling in
`src/styles/global.css`. TypeScript is already configured. This component only
imports React and embeds its CSS, so no Tailwind or shadcn installation is needed.
