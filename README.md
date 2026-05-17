# Guitar Alchemist — Public Showcase & Presentation Layer

The public-facing GitHub Pages site for [Guitar Alchemist](https://guitaralchemist.github.io). This repository is the **presentation layer only** — a static HTML/CSS/JavaScript site that showcases interactive music-theory demos and visualizations of the wider GA ecosystem.

## Status

**Active** — maintenance and demo hosting. Deploys automatically from `master` to GitHub Pages.

## Repo Layout

```
index.html        # Landing page (manifesto, ecosystem dashboard, navigation)
dashboard/        # D3.js Compounding Metrics dashboard (D_c)
demos/            # Interactive demos:
                  #   scales/ chords/ progressions/ fretboard/ circle-of-fifths/
                  #   beliefs/ compounding/ constitution/ grammars/ mcp/
                  #   roadmap/ (Poincaré-disk) streeling/
showcase/         # Reserved for additional showcase pages
docs/             # research/ + specs/ (issues #1-#7 specs & exploration notes)
css/ js/          # Shared styling and client-side utilities
```

## Purpose

This is the **public showcase / presentation layer** for the four-repo GA ecosystem (`ga`, `ix`, `Demerzel`, `tars`). It hosts:

- **Interactive music demos** — live notation (VexFlow), audio (Web Audio API), fretboard visualization
- **Ecosystem visualizations** — D3.js dashboards, Poincaré-ball roadmap, BS Detector, IxQL pipeline showcase, Compounding Metrics
- **Manifesto & narrative** — landing-page articulation of AI-age development principles

## Content & Ownership Boundaries

### Lives here (presentation only)
- Static HTML pages and demo shells
- Demo-specific client-side logic (audio engine, VexFlow, D3.js)
- Styling, responsive UI, navigation

### Lives in [`ga`](https://github.com/GuitarAlchemist/ga) (product layer)
- Music-theory domain logic (scales, chords, modes, progressions)
- AI features (OPTIC-K embeddings, agents, MCP server)
- Server APIs and backend services

**Key principle:** demo content here is hand-authored and self-contained. No imports from the main `ga` repository at build time.

## Technology Stack

- **VexFlow 4.x** — music notation rendering (via CDN)
- **D3.js** — interactive visualizations and dashboards
- **Web Audio API** — sound synthesis and playback
- **Plain JavaScript** — no build step, no bundler

## Deployment

Pushes to `master` deploy automatically to [https://guitaralchemist.github.io](https://guitaralchemist.github.io) via GitHub Pages.

## Contributing

Hand-authored demos and visualizations only. For product logic, API integration, or AI features, work in the main [`ga`](https://github.com/GuitarAlchemist/ga) repo. Keep demo content standalone — no external runtime dependencies on sibling repos.

## Links

- **Live site:** https://guitaralchemist.github.io
- **GitHub org:** https://github.com/GuitarAlchemist
- **Main repository:** https://github.com/GuitarAlchemist/ga
- **Governance:** [Demerzel](https://github.com/GuitarAlchemist/Demerzel)
