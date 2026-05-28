# Personal Blog Design Spec

**Date:** 2026-05-28
**Status:** Approved

## Overview

A minimalist personal blog built with Astro, supporting Markdown-based content authoring with a local visual admin panel. Deployed as static files to GitHub Pages.

## Architecture

```
my_blog/
├── src/
│   ├── pages/          # Page routes (home, post, tags, etc.)
│   │   └── admin/      # Admin panel pages (dev-only)
│   ├── components/     # UI components (nav, card, search, etc.)
│   ├── layouts/        # Page layout templates
│   ├── content/        # Markdown articles
│   │   └── blog/       # Blog posts
│   └── styles/         # Global styles
├── public/             # Static assets (images, favicon)
├── astro.config.mjs    # Astro config
└── package.json
```

**Core flow:**
1. Author edits Markdown files in `src/content/blog/` (via admin panel or directly)
2. `astro build` generates pure static HTML/CSS/JS
3. Deploy to GitHub Pages — visitors see static pages, extremely fast

The admin panel lives at `/admin` within the Astro app, accessible during `npm run dev`. It provides a visual editing interface that modifies the same Markdown files — no database involved. Admin pages and API routes are excluded from production builds.

## Content Structure

Each article is a Markdown file with YAML frontmatter:

```markdown
---
title: "My First Blog Post"
date: 2026-05-28
tags: ["notes", "life"]
category: diary
description: "Short summary shown on list pages"
cover: "/images/cover.jpg"  # optional
draft: false                 # drafts excluded from build
---
```

**Taxonomy:**
- `category`: one per post (e.g., tech, diary, projects)
- `tags`: multiple per post, supports filtering by tag
- Both declared in frontmatter, validated by Astro Content Collections

**Extended syntax:**
- Code block highlighting (Shiki, built into Astro)
- Math formulas (KaTeX)
- Callout blocks (`:::tip` / `:::warning`)
- Image lightbox (click to enlarge)

## Pages & Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Article list, reverse chronological, shows title/date/summary/tags |
| `/blog/[slug]` | Post detail | Full content, floating TOC on the right |
| `/tags` | Tags overview | Tag cloud, click to filter |
| `/tags/[tag]` | Tag filter | All posts with a specific tag |
| `/categories/[cat]` | Category filter | All posts in a category |
| `/about` | About | Personal introduction, Markdown editable |
| `/archives` | Archives | Timeline grouped by year/month |

**Global components:**
- Top nav: Home / Archives / Tags / About / Search icon
- Footer: copyright + social links
- Search: modal overlay triggered by search icon, full-text search on title and body (client-side, based on Pagefind, no backend)
- Dark mode: toggle button in nav, remembers preference via localStorage

## Admin Panel

Part of the Astro app, accessible at `http://localhost:4321/admin` during local development (`npm run dev`).

**Features:**
- **Post list:** view all posts with title, date, category, tags, draft status
- **Create/edit post:** form for frontmatter fields (title, category, tags, cover image), Markdown editor with preview below
- **Delete post:** confirmation then deletes the Markdown file
- **Media management:** upload images to `public/images/`, insert during editing

**Implementation:**
- Frontend: Astro pages under `src/pages/admin/` + React component for Markdown editor (`@uiw/react-md-editor`)
- Backend: Astro API routes under `src/pages/api/admin/`, directly reads/writes files in `src/content/blog/`
- API routes check `import.meta.env.DEV` — return 404 in production builds
- No database — all data is Markdown files

**Important:** The admin panel is dev-only. `astro build` excludes admin pages and API routes from the output, so the deployed static site has no admin functionality.

## Visual Style & Theme

**Design language:**
- Colors: black/white/gray primary, cool blue accent (`#3b82f6`) for links and interactive elements
- Typography: system default for Chinese (Microsoft YaHei/PingFang), Inter or similar sans-serif for English
- Layout: max-width 720px content area, generous whitespace, reading-focused

**Dark mode:**
- Light: white background, black text, gray borders
- Dark: deep gray background (`#1a1a2e`), light gray text, reduced contrast for eye comfort
- Sun/moon icon toggle in nav, localStorage persistence

**Post detail layout:**
```
┌─────────────────────────────────────┐
│  Nav (Home / Archives / Tags / About)│
├─────────────────────────────────────┤
│  Cover image (optional)              │
│  Title                               │
│  Date · Category · Tags              │
├──────────────────────┬──────────────┤
│                      │              │
│  Body content        │  TOC         │
│  (720px wide)        │  (floating)  │
│                      │              │
├──────────────────────┴──────────────┤
│  Previous / Next post               │
│  Footer                             │
└─────────────────────────────────────┘
```

## Tech Stack & Dependencies

| Purpose | Technology |
|---------|------------|
| Framework | Astro 5.x |
| Styling | Tailwind CSS 4.x |
| Markdown | Astro built-in (remark/rehype plugin chain) |
| Code highlighting | Shiki (Astro built-in) |
| Search | Pagefind (build-time index, client-side) |
| Admin editor | @uiw/react-md-editor |
| Dark mode | Tailwind dark variant + localStorage |
| Math formulas | rehype-katex |
| Image lightbox | lightgallery or simple custom |

**Scripts:**
```bash
npm run dev        # Local dev preview (includes admin panel at /admin)
npm run build      # Build static site (excludes admin)
npm run preview    # Preview build output
```

## Deployment (GitHub Pages)

1. Push code to GitHub repository
2. Add GitHub Actions workflow for automatic `astro build` + deploy
3. Configure `astro.config.mjs` `site` to GitHub Pages domain
4. Push to publish — zero manual steps

## SEO

- Auto-generated `<title>` and `<meta description>` per page
- Auto-generated `sitemap.xml`
- RSS feed (`/rss.xml`)
- Open Graph tags (social sharing cards)
