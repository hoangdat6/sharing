# Reusable slide components

Choose the layout that best expresses the slide's claim. These are composable CSS classes and markup patterns, not a requirement to use every component.

CSS for every class below ships in [the HTML starter](../assets/slide-starter.html) (second `<style>` block, `PIPELINE + CODE`). If the deck is not based on that starter, copy that block. A slide using these layouts is the class names in the table below plus that CSS.

Preview every layout in [the component demo deck](../assets/component-demo.html) (arrow keys / on-screen buttons).

## Shared conventions

Every slide begins with `slide` and usually has a small `eyebrow`, a `h1` or `h2`, and a short `deck` line. Keep structural labels in `font-mono` and prose in `font-sans`. Use `panel` only for a bounded unit of content, not as a default container around every element. Cards, panels, callouts, `three-col` articles, `agenda` items, and comparison articles never use `border-left` or `border-top` (or a matching edge stripe). Use gap, radius, fill, shadow, or an even `border: 1px solid var(--line)`.

```html
<section class="slide slide--default">
  <header class="slide__header">
    <p class="eyebrow">01 / Context</p>
    <div class="brand-lockup"><img src="assets/kaopiz-logo.svg" alt="Kaopiz"></div>
  </header>
  <h2>A specific, decision-oriented headline</h2>
  <p class="deck">One compact sentence that makes the headline easier to understand.</p>
</section>
```

## Brand lockup

Use `brand-lockup` once in the top header of **every** slide. Its job is brand presence, not decoration: align it consistently, keep it away from the title, and do not place it in the footer or repeat it in slide content. Use the bundled `assets/kaopiz-logo.svg` by default; replace it only with a supplied, approved logo for another company.

```html
<header class="slide__header">
  <div><p class="eyebrow">02 / Insight</p><h2>Slide headline</h2></div>
  <div class="brand-lockup">
    <img src="assets/kaopiz-logo.svg" alt="Kaopiz">
  </div>
</header>
```

## Cover metadata

Place a small `cover-meta` row below the cover summary. Include the actual presenter/author and presentation date; it is supporting context, so it must not compete with the title. Do not use a made-up name or date.

```html
<div class="cover-meta" aria-label="Thông tin trình bày">
  <span><b>Tác giả</b> Tên tác giả</span>
  <span><b>Trình bày</b> Ngày trình bày</span>
</div>
```

## Topic icons

Use an outline icon to make a real concept faster to scan. Pick it from the topic vocabulary, not a generic star, sparkle, or emoji. One strong icon beside a section label, step title, or callout is enough; do not add a matching icon to every card.

The starter uses Lucide 1.31.0 through a pinned CDN script. For a standalone deck, include the script once before the deck script and replace each marker with SVG:

```html
<i class="topic-icon" data-lucide="shield-check" aria-hidden="true"></i>
<script src="https://unpkg.com/lucide@1.31.0"></script>
<script>lucide.createIcons();</script>
```

Use meaningful text alongside an `aria-hidden` icon. If an icon itself conveys information not already in text, give the SVG an accessible label instead. When no external dependency is acceptable, copy only the required SVGs into the delivered assets and preserve the same semantic treatment.

## Component selection

| Component | Use when the slide is | The output is |
| --- | --- | --- |
| `slide--title` | Opening a story | One decisive statement plus one visual anchor. |
| `slide--section` | Separating major chapters | A large chapter number and a single preview sentence. |
| `agenda` | Giving an overview | The actual chapters; highlight the current one only if useful. |
| `two-col` | Two ideas, before/after, or narrative plus evidence | A deliberate 45/55, 40/60, or 60/40 split. |
| `three-col` | Three distinct stages or categories | Labels and content hierarchy, not three identical icon boxes. |
| `pipeline` | 3–5 named stages with a short sentence each | Horizontal cards plus arrows. |
| `pipeline-anatomy` | A timeline: icons, a related-code branch, CI vs CD groups | One spine, node dots, labels, optional dashed zones. |
| `pipeline-stack` | A numbered job list that will be cropped and reused | A vertical stack with a `GATE` as the last item. |
| `pipeline-stack--cut` | The same stack, now split CI ↔ CD | That stack plus a labeled horizontal cut. |
| `pipeline-converge` | Two actors must share one mandatory gate | Two inflows, one `GATE`, one outflow. |
| `pipeline-parallel` | Jobs that fan out then join | One in, a dashed parallel group, one out. |
| `code-block` | Source or YAML is the evidence | Filename + language chrome, live text, optional highlight. |
| `code-block--diff` | What changed | Unified diff lines (`is-del` / `is-add`). |
| `code-block--term` | What ran | Prompt + output (`is-ok` / `is-fail`). |
| `data-table` | Exact values or decisions | One emphasized row or column. |
| `comparison` | A trade-off or before/after | Like-for-like criteria and a decision. |
| `media-frame` | A screenshot, product, or concept image | One large visual and a caption. |
| `quote` | An attributed source | The actual source; no fabricated testimonials. |
| `closing` | Ending the presentation | The conclusion and a next action. |

## Markup patterns

### Agenda

```html
<ol class="agenda" aria-label="Nội dung">
  <li><span>01</span><strong>Bối cảnh</strong><p>Điều gì đang thay đổi?</p></li>
  <li><span>02</span><strong>Hướng đi</strong><p>Cách tiếp cận đề xuất.</p></li>
  <li><span>03</span><strong>Hành động</strong><p>Bước tiếp theo có thể làm ngay.</p></li>
</ol>
```

### Two columns

```html
<div class="two-col two-col--40-60">
  <div><p class="eyebrow">Vấn đề</p><h3>Nguyên nhân cốt lõi</h3></div>
  <div class="panel"><p>Evidence, diagram, screenshot, or compact explanation.</p></div>
</div>
```

### Three columns

```html
<div class="three-col three-col--sequence">
  <article><span class="step">01</span><h3>Chuẩn bị</h3><p>Điều kiện đầu vào.</p></article>
  <article><span class="step">02</span><h3>Thực thi</h3><p>Hành động chính.</p></article>
  <article><span class="step">03</span><h3>Kiểm chứng</h3><p>Kết quả hoặc tiêu chí.</p></article>
</div>
```

### Pipeline (linear cards)

A `pipeline` is a horizontal row of 3–5 `pipeline__step` cards joined by `pipeline__arrow`. Use it when each stage needs a sentence of copy. Direction, the current step, and the output stay explicit.

```html
<div class="pipeline" aria-label="Quy trình triển khai">
  <article class="pipeline__step"><span>01</span><h3>Build</h3><p>Biến source thành artifact.</p></article>
  <i class="pipeline__arrow" aria-hidden="true"></i>
  <article class="pipeline__step"><span>02</span><h3>Verify</h3><p>Chạy kiểm thử và kiểm tra.</p></article>
  <i class="pipeline__arrow" aria-hidden="true"></i>
  <article class="pipeline__step"><span>03</span><h3>Release</h3><p>Phát hành có kiểm soát.</p></article>
</div>
```

### Pipeline anatomy (spine + branch + CI/CD zones)

A `pipeline-anatomy` is one horizontal spine with node dots. In order: a start **box** (CODE) → optional **branch** column (RELATED CODE below a T-junction) → stations (optional Lucide icon above, dot on the spine, mono label below) → optional dashed `pipeline-anatomy__zone` groups (`data-zone` becomes the CI PIPELINE / CD PIPELINE caption). This is the GitLab-style teaching diagram.

```html
<div class="pipeline-anatomy" aria-label="Anatomy of a CI/CD pipeline">
  <i class="pipeline-anatomy__spine" aria-hidden="true"></i>

  <div class="pipeline-anatomy__col pipeline-anatomy__col--start">
    <span class="pipeline-anatomy__icon"></span>
    <span class="pipeline-anatomy__box pipeline-anatomy__box--ink">
      <i class="topic-icon" data-lucide="terminal" aria-hidden="true"></i>
    </span>
    <p class="pipeline-anatomy__label">CODE</p>
  </div>

  <div class="pipeline-anatomy__col pipeline-anatomy__col--branch">
    <span class="pipeline-anatomy__icon"></span>
    <span class="pipeline-anatomy__dot"></span>
    <p class="pipeline-anatomy__label"></p>
    <div class="pipeline-anatomy__related">
      <span class="pipeline-anatomy__box">
        <i class="topic-icon" data-lucide="terminal" aria-hidden="true"></i>
      </span>
      <p class="pipeline-anatomy__label">RELATED CODE</p>
    </div>
  </div>

  <div class="pipeline-anatomy__col">
    <i class="topic-icon pipeline-anatomy__icon" data-lucide="git-commit-horizontal" aria-hidden="true"></i>
    <span class="pipeline-anatomy__dot"></span>
    <p class="pipeline-anatomy__label">COMMIT</p>
  </div>

  <div class="pipeline-anatomy__zone" data-zone="CI PIPELINE">
    <div class="pipeline-anatomy__col">
      <span class="pipeline-anatomy__icon"></span>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">BUILD</p>
    </div>
    <div class="pipeline-anatomy__col">
      <i class="topic-icon pipeline-anatomy__icon" data-lucide="flask-conical" aria-hidden="true"></i>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">UNIT TEST</p>
    </div>
    <div class="pipeline-anatomy__col">
      <span class="pipeline-anatomy__icon"></span>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">INTEGRATION TESTS</p>
    </div>
  </div>

  <div class="pipeline-anatomy__zone" data-zone="CD PIPELINE">
    <div class="pipeline-anatomy__col">
      <i class="topic-icon pipeline-anatomy__icon" data-lucide="scan-search" aria-hidden="true"></i>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">REVIEW</p>
    </div>
    <div class="pipeline-anatomy__col">
      <i class="topic-icon pipeline-anatomy__icon" data-lucide="clipboard-check" aria-hidden="true"></i>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">STAGING</p>
    </div>
    <div class="pipeline-anatomy__col">
      <i class="topic-icon pipeline-anatomy__icon" data-lucide="rocket" aria-hidden="true"></i>
      <span class="pipeline-anatomy__dot"></span>
      <p class="pipeline-anatomy__label">PRODUCTION</p>
    </div>
  </div>
</div>
```

Drop `pipeline-anatomy__col--branch` when there is no related stream. Drop a zone when the claim is a single phase. Keep station count to 5–9; more belongs on a second slide.

### Pipeline stack (vertical jobs + gate)

A `pipeline-stack` is an `<ol>` of numbered jobs ending in `pipeline-stack__gate`. This is the crop-and-reuse backbone: later slides keep the same stack and add `pipeline-stack--cut`.

```html
<ol class="pipeline-stack" aria-label="CI skeleton">
  <li><span>1</span><code>npm ci</code></li>
  <li><span>2</span><code>lint</code></li>
  <li><span>3</span><code>typecheck</code></li>
  <li><span>4</span><code>unit test</code></li>
  <li><span>5</span><code>e2e</code></li>
  <li><span>6</span><code>build</code></li>
  <li class="pipeline-stack__gate"><span>GATE</span><p>all pass → PR mergeable</p></li>
</ol>
```

A `pipeline-stack--cut` is that stack plus a labeled separator. CI region holds jobs + artifact; CD region holds deploy / restart / health check.

```html
<div class="pipeline-stack pipeline-stack--cut">
  <div class="pipeline-stack__region" data-region="CI">
    <ol class="pipeline-stack">
      <li><span>1</span><code>npm ci</code></li>
      <li><span>6</span><code>build → artifact</code></li>
      <li class="pipeline-stack__gate"><span>GATE</span><p>all pass → PR mergeable</p></li>
    </ol>
  </div>
  <p class="pipeline-stack__cut" role="separator">CI / CD</p>
  <div class="pipeline-stack__region" data-region="CD">
    <ol class="pipeline-stack">
      <li><span>7</span><code>deploy</code></li>
      <li><span>8</span><code>restart</code></li>
      <li><span>9</span><code>health check</code></li>
    </ol>
  </div>
</div>
```

### Pipeline converge (two streams, one gate)

A `pipeline-converge` is two actor cards on top, one `pipeline-converge__gate` in the middle (`<code>` for the file name), one outflow. Optional `pipeline-converge__bypass` labels the blocked shortcut.

```html
<div class="pipeline-converge" aria-label="Mandatory pipeline">
  <div class="pipeline-converge__actors">
    <article><i class="topic-icon" data-lucide="user" aria-hidden="true"></i><h3>Developer</h3><p>Code nhìn có vẻ ổn…</p></article>
    <article><i class="topic-icon" data-lucide="bot" aria-hidden="true"></i><h3>AI Agent</h3><p>Test local pass…</p></article>
  </div>
  <p class="pipeline-converge__bypass">no bypass</p>
  <div class="pipeline-converge__gate"><span>GATE</span><code>ci-pipeline.yml</code></div>
  <p class="pipeline-converge__out">one path out</p>
</div>
```

### Pipeline parallel (fan-out / fan-in)

A `pipeline-parallel` is one inbound step, a dashed `pipeline-parallel__fan` (`data-label="parallel"`), one outbound step.

```html
<div class="pipeline-parallel" aria-label="Parallel jobs">
  <article class="pipeline-parallel__step"><span>01</span><h3>Checkout</h3></article>
  <div class="pipeline-parallel__fan" data-label="parallel">
    <article><h3>Lint</h3></article>
    <article><h3>Test</h3></article>
    <article><h3>Audit</h3></article>
  </div>
  <article class="pipeline-parallel__step"><span>02</span><h3>Build</h3></article>
</div>
```

### Code block (source, YAML, diff, terminal)

A `code-block` is a `<figure>`: chrome (filename + language) then a `<pre>` of `.code-block__line` rows. Highlight the line being discussed with `is-highlight`. Keep 8–16 lines; more belongs in an appendix or a live demo. IBM Plex Mono only. A dark code surface on a light slide is the intended contrast exception — do not darken the whole slide, screenshot an editor, or dump YAML into `panel` / `media-frame`.

```html
<figure class="code-block" aria-label="ci.yml">
  <figcaption class="code-block__chrome">
    <span class="code-block__file">ci.yml</span>
    <span class="code-block__lang">YAML</span>
  </figcaption>
  <pre class="code-block__body"><code><span class="code-block__line">name: ci</span>
<span class="code-block__line">on: [push, pull_request]</span>
<span class="code-block__line">jobs:</span>
<span class="code-block__line is-highlight">  test:</span>
<span class="code-block__line">    runs-on: ubuntu-latest</span>
<span class="code-block__line">    steps:</span>
<span class="code-block__line">      - uses: actions/checkout@v4</span>
<span class="code-block__line">      - run: npm ci</span>
<span class="code-block__line">      - run: npm test</span></code></pre>
</figure>
```

A `code-block--diff` is the same chrome with `is-del` / `is-add` lines. A `code-block--term` uses a prompt marker and `is-ok` / `is-fail`. Pair them with `two-col` when both belong on one slide.

```html
<div class="two-col two-col--60-40">
  <figure class="code-block code-block--diff">
    <figcaption class="code-block__chrome">
      <span class="code-block__file">index.html</span>
      <span class="code-block__lang">diff</span>
    </figcaption>
    <pre class="code-block__body"><code><span class="code-block__line is-del">- Hello World</span>
<span class="code-block__line is-add">+ Hello from AI-powered CI/CD</span></code></pre>
  </figure>
  <figure class="code-block code-block--term">
    <figcaption class="code-block__chrome">
      <span class="code-block__file">terminal</span>
      <span class="code-block__lang">sh</span>
    </figcaption>
    <pre class="code-block__body"><code><span class="code-block__line"><span class="code-block__prompt">$</span> npm test</span>
<span class="code-block__line is-ok">PASS  src/app.test.ts</span></code></pre>
  </figure>
</div>
```

Do not run a syntax-highlighter library. Color only the line that is the point of the slide (`is-highlight`, `is-del`, `is-add`, `is-ok`, `is-fail`).

### Table

```html
<table class="data-table">
  <thead><tr><th scope="col">Tiêu chí</th><th scope="col">Phương án A</th><th scope="col">Phương án B</th></tr></thead>
  <tbody>
    <tr><th scope="row">Phù hợp khi</th><td>Điều kiện thực tế A</td><td>Điều kiện thực tế B</td></tr>
    <tr class="is-highlighted"><th scope="row">Khuyến nghị</th><td colspan="2">Kết luận có điều kiện, dựa trên nội dung đã cung cấp.</td></tr>
  </tbody>
</table>
```

Keep tables to 3–6 rows and 2–5 columns on a normal slide. Move exhaustive detail to an appendix rather than reducing type size.

### Media with caption

```html
<figure class="media-frame">
  <img src="assets/architecture.png" alt="Sơ đồ luồng dữ liệu từ ứng dụng tới kho dữ liệu">
  <figcaption><span>Điểm cần lưu ý</span> Caption explains why this visual matters.</figcaption>
</figure>
```

Use a source line in the caption where an external image, figure, or screenshot requires attribution.

## Common mistakes

| Slide claim | Use | Wrong fit |
| --- | --- | --- |
| Anatomy / GitLab-style timeline with a related-code branch and CI vs CD boxes | `pipeline-anatomy` | 3-card `pipeline`, `three-col`, Mermaid |
| Crop-and-reuse numbered jobs + GATE | `pipeline-stack` | Flattening to three cards |
| CI ↔ CD on the same backbone | `pipeline-stack--cut` | A second unrelated diagram |
| Developer and AI must share one gate | `pipeline-converge` | Two `comparison` cards with no join |
| YAML / source / diff / terminal as evidence | `code-block` (+ modifier) | `media-frame` screenshot, unstyled `<pre>`, `panel` dump |
| A screenshot of a running product | `media-frame` | Recreating the UI in CSS |
| A card, panel, callout, or column item | Even `border: 1px solid var(--line)`, fill, or shadow | `border-left` / `border-top` accent bar, colored status stripe |
