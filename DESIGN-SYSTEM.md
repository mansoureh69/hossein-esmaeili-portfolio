# Hossein Esameili design system

Live reference: `/design-system`, in Persian and English. Base component tokens
are in `src/styles/design-system.css`; the current editorial refinements are in
`src/styles/editorial.css`, loaded last.

| Role | Color | Usage |
|---|---|---|
| Warm ivory | #F4F1EA | Page background |
| Deep charcoal | #1D2326 | Text, primary controls |
| Concrete grey | #B8B7B1 | Technical separators |
| Copper | #B96648 | Active borders, rules, restrained accents |
| Technical blue-grey | #73858A | Diagrams and structural lines |
| Dark steel | #52646A | Readable secondary headings |
| Secondary text | #555E60 | Body text and metadata |

Onest and locally bundled Vazirmatn remain the fonts. Body text is 15–16px;
headings adapt to language and viewport. Keep copper away from long paragraphs.
Controls have visible focus and touch targets of at least 44px where practical.

The hero uses the existing conceptual image as a full background, with a soft pointer reveal and a persistent text scrim for readability. Projects retain the
shutter carousel, category filters, and two compact project selectors. Never
present the conceptual illustration as a completed project photo. Project names,
areas, contact details and qualifications come from the portfolio data.

Services are four open blocks; the process uses a horizontal desktop sequence
and vertical mobile timeline. Corners are restrained. Navigation stays visible,
marks the current section and accounts for its height when scrolling.

Reduced motion disables movement and uses immediate slide changes. Hover zoom is
limited to 1.03 on pointer devices. No autoplay is enabled for project slides.

The existing geometric brand marks are retained; use the dark mark on light
surfaces. Do not mirror the logo in RTL. Preserve `/` and `/design-system` routes.

