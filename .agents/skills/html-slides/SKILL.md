---
name: html-slides
description: "Use when creating or editing HTML slide decks for sharing, demos, reports, or technical talks; when a slide needs on-screen source (YAML, GitHub Actions, GitLab CI, diff, terminal) or a CI/CD process diagram (anatomy timeline, related-code branch, CI/CD zones, vertical stack, gate, converge, parallel jobs); not for scrolling web pages."
---

# HTML Slides

Create a single self-contained HTML deck designed as a live presentation, not a web document.

## Output contract

- Make the deck a 1920 x 1080 stage that scales to the viewport. It must not become a vertically scrolling page.
- Put one slide at a time on the stage; include keyboard (arrow keys / space) and on-screen navigation only when interaction is useful.
- Use semantic, maintainable HTML and CSS. Build repeated layouts from named classes or custom elements instead of rewriting near-identical markup per slide.
- Use Vietnamese when the source content is Vietnamese; otherwise preserve the source language. Keep every slide scannable: one message, a short headline, and only the content needed to support it.
- On the cover, include the presenter/author and the presentation date in a compact `cover-meta` row. Use values supplied by the requester or source materials; if either is absent, ask for it before finalizing rather than guessing a name or date.
- Deliver the `.html` file and any local visual assets together. Do not invent data, percentages, customer logos, quotes, or other metrics. Mark missing facts as a question or use a qualitative visual instead.

## Visual system

Use these defaults unless the requester supplies a brand system:

```css
:root {
  --paper: #F3F6F9;
  --ink: #0B1B2B;
  --accent: #3C9CD7;
  --line: #C9D5DC;
  --muted: #52636F;
  --radius: 10px;
  --font-sans: "Be Vietnam Pro", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

- Prefer a bright, calm background with strong ink contrast and a restrained blue accent. Use dark surfaces only when they materially improve a diagram or contrast.
- Use **Be Vietnam Pro** for prose and headings; use **IBM Plex Mono** for code, labels, IDs, and compact technical metadata. Never substitute Inter or Poppins.
- Keep titles compact and horizontally legible: write a 3–9-word title that targets one line and uses two lines only when unavoidable. Do not insert manual `<br>` line breaks in titles; tighten the wording before reducing the type below the deck's minimum readable size. Use the starter's smaller `h1`/`h2` scale and reduced stage padding as the default.
- Use images, diagrams, screenshots, or simple data visualizations that advance the message. A full-bleed or large editorial image is usually more effective than small decoration. If source material does not provide visuals, create or source a topic-relevant visual with permission appropriate to the task; do not use decorative emoji. Put YAML, source, diffs, and terminal output in `code-block` (live text with filename chrome). A dark code surface on a light slide is the intended contrast exception; do not darken the whole slide or screenshot an editor.
- Use concise outline icons only when they identify a real topic, state, or action (for example: `shield-check` for verification, `package` for an artifact, `rocket` for release). Lucide is the default library for standalone HTML: pin the CDN version, call `lucide.createIcons()`, and use icons as visual labels rather than decoration. Do not use an icon merely to make a card look complete.
- Use the bundled Kaopiz logo at `assets/kaopiz-logo.svg` in the `brand-lockup` header of every slide, including title and closing slides. Keep it small and unobtrusive; preserve its aspect ratio and do not redraw it. Replace it only when the requester supplies another approved company identity and its logo asset.
- Avoid purple/indigo gradients, glassmorphism, and generic collections of three equal icon-cards. A three-column layout is fine when it represents a real sequence, comparison, or categorization with meaningful content.
- Give the deck rhythm: vary title, visual, process, comparison, and summary layouts rather than repeating the same card grid.

## Workflow

1. Distill the requested story into a short slide outline. Put the audience's takeaway first; collapse supporting detail into notes, appendices, or a handout where appropriate.
2. Choose a component for each slide. Read [the component catalog](references/components.md) before implementing the layouts, including `brand-lockup`, `code-block`, and the pipeline variants (`pipeline`, `pipeline-anatomy`, `pipeline-stack`, `pipeline-converge`, `pipeline-parallel`). Preview layouts in [the component demo deck](assets/component-demo.html). Copy CSS from the starter when the deck is not based on it.
3. Start from [the HTML starter](assets/slide-starter.html) when it fits, or preserve its stage/scaling and token conventions in an existing deck.
4. Use real visuals and verify every image has an intentional crop, descriptive `alt` text, and sufficient contrast with adjacent type.
5. Preview at both full-slide and reduced viewport sizes. Check for overflow, clipped text, tiny type, broken image URLs, invalid claims, and titles that wrap unnecessarily. Keep a reduced but safe margin around all stage edges.

## Editing an existing deck

Preserve its established brand, aspect ratio, and working navigation unless the requester asks for a redesign. Apply these defaults only where the deck has no stronger existing visual direction.
