# Personal Portfolio

A responsive personal portfolio built to showcase selected web products, product thinking, and front-end implementation work.

## Overview

This site presents a concise portfolio for job applications and professional networking. It highlights selected projects, a short product-building approach, and a contact form powered by EmailJS.

## Featured Projects

- **MacBuddy** - A tiny buddy for your Mac.
- **RefurbRadar** - Smarter refurbished Apple tracking.
- **KiwiTrails** - AI travel planning for New Zealand.
- **Tech Trends** - Signals from real developer data.

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Framer Motion
- React Router
- EmailJS
- ESLint

## Features

- Responsive single-page portfolio layout
- Smooth scroll navigation
- English and Chinese interface copy
- Animated sections with reduced-motion support
- Project showcase with visual previews
- EmailJS contact form using environment variables
- Production build and lint scripts

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then fill in the EmailJS values:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Do not commit `.env.local` or any real API keys.

## Project Structure

```text
src/
  assets/       Project preview images
  components/   Reusable UI sections
  content/      Localized header and hero copy
  data/         Portfolio project and section data
  pages/        Page-level views
  routes/       App routing
```

## Deployment

The project can be deployed to any static hosting platform that supports Vite, such as Vercel, Netlify, or GitHub Pages. Add the EmailJS environment variables in the hosting provider's project settings before deploying.

## Author

Built by [klausss30](https://github.com/klausss30).
