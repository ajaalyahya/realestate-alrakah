# برج الراقي — Real Estate Landing Page

A premium Arabic real estate landing page for **برج الراقي** (Al Raki Tower), located in Al Rakah, Al Khobar, Saudi Arabia.

## Tech Stack

- **React 18** + **Vite** (fast dev & build)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (smooth animations)
- **Lucide React** (icons)
- **Cairo** font (Arabic typography via Google Fonts)

## Features

- ✅ Full RTL (right-to-left) Arabic layout
- ✅ Responsive — mobile-first design
- ✅ Smooth scroll between sections
- ✅ Framer Motion fade-in & staggered animations
- ✅ Parallax hero effect
- ✅ Lightbox gallery with keyboard navigation
- ✅ Contact form with validation
- ✅ Floating WhatsApp button
- ✅ Lazy loading for all images
- ✅ Code-split lazy sections (performance)
- ✅ Dark luxury aesthetic with gold accents
- ✅ Google Maps embed (dark style)

## Sections

1. **Hero** — Full-screen parallax with CTA buttons
2. **About** — Project description + highlights
3. **Features** — 12-item grid of amenities
4. **Units** — Studio / 1BR / 2BR cards
5. **Gallery** — Masonry grid with lightbox
6. **Location** — Embedded map + nearby services
7. **Contact** — Validated form + contact info
8. **CTA** — Full-width conversion section
9. **Footer** — Links, address, copyright

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Customization

### WhatsApp Number
In `src/App.jsx`:
```js
const WHATSAPP_NUMBER = '966XXXXXXXXX'  // Saudi number without +
```

### Colors
In `tailwind.config.js` — adjust the `gold` color palette.

### Images
Replace Unsplash URLs in each section with your own project photos.

### Map
In `src/sections/Location.jsx` — update `MAP_LAT` and `MAP_LNG` with the exact building coordinates.

### Contact Form
Currently simulates submission. To wire up email:
- Use **EmailJS**, **Formspree**, or a backend API
- Replace the `setTimeout` in `Contact.jsx` `handleSubmit` with your fetch call

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── FloatingWhatsApp.jsx
│   ├── SectionTitle.jsx
│   ├── LazyImage.jsx
│   └── LoadingSpinner.jsx
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Features.jsx
│   ├── Units.jsx
│   ├── Gallery.jsx
│   ├── Location.jsx
│   ├── Contact.jsx
│   ├── CTA.jsx
│   └── Footer.jsx
├── hooks/
│   └── useScrollAnimation.js
├── utils/
│   └── animations.js
├── App.jsx
├── main.jsx
└── index.css
```
