# Artifact templates

Copy these headings. Fill every required field. Write `unknown` when a value is missing; do not invent facts, dates, authors, metrics, quotes, logos, or licenses.

---

## `sources/research.md`

```markdown
# Research — <topic>

## Meta
- Topic:
- Retrieval date:
- Audience (known / unknown):
- Duration (known / unknown):
- Goal (known / unknown):
- Existing source files inspected:

## Source inventory
- Title — URL — why it matters

## Verified facts
- Fact — citation (title, URL)

## Useful examples and visuals
- Example or visual — source — local file or `reference-only`

## Contradictions or uncertainty
- Claim A vs claim B — sources — question for the user

## Missing information
- What is unknown — why it blocks or does not block this gate

## Questions for the user
- One question per line (audience, duration, goal, depth, demos, constraints)
```

---

## `sources/resources.md`

One row (or one block) per resource. Keep unknown-rights rows; set `Used on slides` to `no`.

```markdown
# Resources — <topic>

| Title | URL | Publisher / author | Type | License / status | Local file | Intended use | Retrieval date | Used on slides |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | docs / article / image / diagram / video / other | known: <name + URL> / unknown / incompatible / unchecked | `assets/<file>` or — | section or slide | YYYY-MM-DD | yes / no |
```

Per-resource block when a row is not enough:

```markdown
### <Title>
- URL:
- Publisher / author:
- Type:
- License / status:
- Local file:
- Intended use (section or slide):
- Retrieval date:
- Used on slides: yes / no
- Notes:
```

`License / status` values:

- `known:` plus license name and license URL
- `unknown` — reuse rights not established
- `incompatible` — known, but cannot be used on the deck
- `unchecked` — not reviewed yet (treat as `unknown` for slide use)

Only `known` and compatible licenses may be `Used on slides: yes`. Download those files into `sources/assets/`. All other resources stay URL references.

---

## `sources/content.md`

```markdown
# Content — <topic>

## Talk thesis
One sentence.

## Audience and outcome
- Audience:
- Duration:
- Outcome the audience can do afterward:

## Narrative arc
Approved story flow name and the beat sequence.

## Sections and transitions
### Section
- Teaching point
- Transition to next section

## Detailed teaching content
Facts, explanations, and citations.

## Demos and examples
- Demo or example — setup — fallback if live demo fails

## Facts with citations
- Fact — source

## Speaker material
Cues, asides, and time boxes that do not belong on slides.

## Closing action
What the audience should do next.
```

---

## `sources/slide-outline.md`

```markdown
# Slide outline — <topic>

## Budget
- Total slides:
- Total duration:
- Section pacing:

## Visual inventory
- Asset — source — `sources/assets/` file — used on slide N

## Reusable diagrams
- Diagram — named html-slides component

## Live-demo fallback
- If the demo fails, show slide N / appendix N

## Appendix candidates
- Extra slides parked here, not in the timed talk

---

### Slide N — <title>
- Purpose:
- Key message:
- On-slide content:
- Component / visual: (named html-slides component or original diagram)
- Source:
- Demo / code:
- Speaker notes:
- Duration:
```
