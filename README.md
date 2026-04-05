# Guitar Alchemist — Public Showcase & Presentation Layer

The public-facing GitHub Pages site for [Guitar Alchemist](https://guitaralchemist.github.io). This repository is the **presentation layer only** — a static HTML/CSS/JavaScript showcase of interactive music theory demos.

## Status

**Active** — Maintenance & Demo Hosting

## Purpose

This is the **public showcase/presentation layer** for Guitar Alchemist. It hosts:

- **Interactive demos** with live music notation (VexFlow), audio playback (Web Audio API), and fretboard visualization
- **Responsive landing page** linking to demo applications
- **Static assets** (CSS, JavaScript utilities) for client-side rendering

The site is deployed to GitHub Pages and served at https://guitaralchemist.github.io.

## Content & Ownership Boundaries

### What Lives Here (Presentation Layer)

- Static HTML pages and demo shells
- Demo-specific client-side logic (audio engine, VexFlow rendering)
- Styling and responsive UI components
- Navigation and card-based landing page

### What Belongs in [`ga`](https://github.com/GuitarAlchemist/ga) (Product Layer)

- Music theory domain logic (scales, chords, modes, progressions)
- Advanced AI-powered features (analysis, generation, classification)
- Server APIs and backend services
- Core data structures and algorithms

**Key Principle:** This repo contains **presentation only**. Demo content is hand-authored here using simple, self-contained music theory implementations. No imports from the main `ga` repository.

## Technology Stack

- **VexFlow 4.x** — Music notation rendering (via CDN)
- **Web Audio API** — Sound synthesis and playback
- **Plain JavaScript** — No build step, no dependencies (standalone)
- **Dark theme CSS** — Responsive, accessible styling

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch.

- **Deployment target:** `https://guitaralchemist.github.io` (via GitHub Pages)
- **Branch:** `master` (production)

## Contributing

Content here is hand-authored demo material. For product logic, API integration, or advanced features, see the main [`ga`](https://github.com/GuitarAlchemist/ga) repository.

Keep presentation logic separate from domain logic. Demo content should work standalone without external dependencies.

## Links

- **GitHub org:** https://github.com/GuitarAlchemist
- **Main repository:** https://github.com/GuitarAlchemist/ga
- **Governance:** Governed by [Demerzel](https://github.com/GuitarAlchemist/Demerzel)
- **Live site:** https://guitaralchemist.github.io
