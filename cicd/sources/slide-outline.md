# Slide outline — CI/CD trong thời đại AI

## Budget

- **Total slides:** 26
- **Total duration:** ~100 phút (1h40) + 10 phút Q&A
- **Section pacing:**

| Section | Slide | Thời lượng |
| --- | --- | --- |
| A — Mở đầu: tình huống thực tế | 1–4 | 8 phút |
| B — CI là gì | 5–6 | 10 phút |
| C — Công cụ CI | 7 | 6 phút |
| D — Deploy trước khi có CD | 8 | 7 phút |
| E — CD là gì | 9–10 | 7 phút |
| F — Hai loại CD | 11–12 | 6 phút |
| G — Demo | 13–17 | 25 phút |
| H — Vấn đề phát sinh | 18–20 | 10 phút |
| I — Cách chặn | 21–23 | 10 phút |
| J — Tổng kết | 24–26 | 6 phút |
| Q&A (tích hợp slide 26) | — | 10 phút |
| **Tổng** | **26** | **≈ 105 phút** |

## Visual inventory

| Asset | Source | `sources/assets/` | Dùng ở slide |
| --- | --- | --- | --- |
| Logo Kaopiz | `cicd/sources/logo.svg` | ✅ có | Mọi slide (brand-lockup) |
| Terminal typecheck pass | Dựng CSS | — | 3 |
| Terminal test pass | Dựng CSS | — | 3 |
| GitHub Actions UI đỏ | Dựng CSS | — | 3 |
| Rubber stamp animation | CSS animation | — | 4 |
| Pyramid 3 tầng | CSS/SVG | — | 5 |
| Conveyor belt pipeline | CSS custom | — | 6 |
| Radial mindmap | CSS/SVG | — | 7 |
| Sticky note wall | CSS | — | 8 |
| Pipeline cắt đôi CI/CD | CSS custom | — | 9 |
| Train station 6 ga | CSS | — | 10 |
| Dual lane highway | CSS | — | 11 |
| Git branch diagram | CSS/SVG | — | 12 |
| Cinema tickets | CSS | — | 13 |
| Haunted laptop + ghosts | CSS animation | — | 18 |
| Funnel bottleneck | CSS/SVG | — | 19 |
| Escalation staircase | CSS/SVG | — | 20 |
| Shield wall bảng chặn | CSS | — | 21 |
| Security gate cổng sân bay | CSS custom | — | 22 |
| Infinity loop ∞ | CSS/SVG | — | 24 |

## Reusable diagrams

| Diagram | Component | Dùng lại ở |
| --- | --- | --- |
| CI Pipeline ngang 7 bước + GATE | `pipeline` custom conveyor | Slide 6, nhắc lại nhỏ ở slide 7, 9 |
| Pipeline dọc CI↔CD cắt đôi | `pipeline-stack--cut` | Slide 9, nhắc lại ở slide 15 |
| Split terminal LOCAL ✓ vs CI ✗ | `two-col` + `code-block--term` | Slide 3, echo ở slide 17 |
| Chat bubbles AI + Dev | Custom CSS | Slide 1 (cover) + slide 26 (closing) |
| Metro line agenda | Custom CSS | Slide 2, mini-version ở mỗi section divider |

## Live-demo fallback

- Nếu mạng/AWS chết: `docker build -t demo-app:local .` + `docker run -p 3000:3000` + `curl /health`
- Screenshot dự phòng cho cả 4 demo: chụp trước buổi

## Appendix candidates

- Bảng công cụ theo ngôn ngữ (PHPUnit, pytest, JUnit…)
- Chi tiết DAST / load test
- 4 tầng thời điểm chạy check (pre-commit / PR / main / theo lịch)
- Monorepo dependency graph
- 4 câu Q&A chuẩn bị trước (chi tiết)

---

### Slide 1 — CI/CD trong thời đại AI

- **Purpose:** Đặt câu hỏi trung tâm từ giây đầu tiên; cho audience biết buổi này về kiểm soát chất lượng, không phải công cụ DevOps.
- **Key message:** AI nói "code đã ổn" và developer nghĩ "chắc là ổn" — nhưng ai kiểm chứng?
- **On-slide content:**
  - Tiêu đề: **CI/CD trong thời đại AI**
  - Sub: *"AI bảo pass" là bước kiểm tra đầu tiên, không phải điểm kết thúc*
  - Dòng nhỏ: Audience — Developer · Stack demo — GitHub Actions → Docker → EC2
  - Hai chat bubbles đối lập:
    - Bubble trái (viền glow xanh): `🤖 AI Agent: "Code đã ổn"` — dấu `(?)` mờ
    - Bubble phải (viền glow cam): `👤 Developer: "Chắc là ổn"` — dấu `(?)` mờ
- **Component / visual:** `slide--title` · **Cinematic dark** — nền gradient tối `#0B1B2B → #1a2d42`, logo Kaopiz góc trên trái, hai chat bubbles floating ở trung tâm. Bubbles có box-shadow glow nhẹ. `cover-meta` row ở dưới cùng (tác giả + ngày).
- **Source:** `detail.md` header + § "Slide cuối" (cặp mở–đóng) + `summary.md` thông điệp xuyên suốt.
- **Demo / code:** Không.
- **Speaker notes:**
  - Giới thiệu 20 giây, không đọc lại slide.
  - "Tôi sẽ không bắt đầu bằng định nghĩa. Tôi bắt đầu bằng một buổi chiều code bình thường."
  - Nói trước cấu trúc: 4 demo chạy thật, không phải slide-only.
- **Duration:** 1 phút

---

### Slide 2 — Mục lục

- **Purpose:** Cho audience biết cấu trúc buổi sharing.
- **Key message:** 8 phần, demo nằm giữa buổi — hiện tượng trước, khái niệm sau.
- **On-slide content:**
  1. Tình huống: local xanh, CI đỏ
  2. CI là gì
  3. Công cụ và tác vụ CI
  4. Deploy trước khi có CD
  5. CD là gì — Delivery vs Deployment
  6. Demo: GitHub Actions → Docker → EC2 ← **highlight**
  7. Vấn đề thường gặp và cách chặn
  8. Tổng kết + Q&A
- **Component / visual:** **Metro line dọc** — đường ray dọc chạy từ trên xuống, 8 ga trạm. Mỗi ga là 1 chấm tròn `●` trên đường ray, nhãn bên phải. Ga 6 (Demo) tô accent + icon `▶`, kích cỡ lớn hơn. Khi chuyển section về sau, thanh metro line thu nhỏ xuất hiện ở góc slide để đánh dấu vị trí hiện tại.
- **Source:** Cấu trúc 8 mục bám `summary.md`.
- **Demo / code:** Không.
- **Speaker notes:**
  - Đọc lướt 30 giây, không giải thích từng mục.
  - "Bắt đầu bằng tình huống thật, demo nằm giữa buổi, phần cuối trả lời câu hỏi mở đầu."
- **Duration:** 1 phút

---

### Slide 3 — Local xanh, CI đỏ

- **Purpose:** Cho audience sống lại tình huống quen thuộc: AI chạy test pass, nhưng CI lại fail. Tạo cú sốc nhận thức.
- **Key message:** Mọi bằng chứng trên máy local đều xanh — nhưng cùng lệnh đó chạy ở CI thì đỏ.
- **On-slide content:**
  - **Split-screen** chia đôi dọc, 2 terminal giả lập:
  - **Terminal trái — LOCAL** (viền xanh):
    ```
    $ npm run typecheck
    ✓ Verified 58 modules in /src
    ✓ 0 errors found. Type Check passed!

    $ npm test
    PASS  login.test.ts
    PASS  validator.test.ts
    PASS  api.test.ts
    PASS  Button.test.ts
    Tests: 18 passed ✓
    ```
    Badge dưới: `✅ ALL PASS`
  - **Terminal phải — CI (GitHub Actions)** (viền đỏ):
    ```
    GitHub Actions CI #108 · main         ● THẤT BẠI
    1. Install deps        ✓  1.2s
    2. Lint & Format       ✓  3.4s
    3. Type Check          ✗  FAIL
    4. Unit Test           — Đã hủy
    5. Build               — Đã hủy

    TS2322: Type 'string' is not assignable to type 'number'
    ```
    Badge dưới: `❌ FAILED`
  - Giữa hai terminal: dấu `≠` lớn, pulse animation
  - Câu hỏi nhỏ dưới cùng: *"Đến đây, anh em thấy đủ tự tin để push chưa?"*
- **Component / visual:** `two-col--50-50` + `code-block--term`. Nền terminal `#1a1a2e`. Terminal trái border-left xanh `#4ade80`, terminal phải border-left đỏ `#ef4444`. Dấu `≠` ở giữa dùng CSS animation `pulse` (scale 1 → 1.15 → 1). Các dòng `— Đã hủy` dùng màu `--muted`.
- **Source:** `detail.md` § 0 — bước 1 (typecheck), bước 2 (test), bước 3 (push), bước 4 (CI fail).
- **Demo / code:** Terminal output — dựng bằng CSS `code-block--term`, không screenshot.
- **Speaker notes:**
  - Kể như chuyện thật: "Ai ở đây từng làm y hệt thế này trong tuần vừa rồi?"
  - Chỉ tay terminal trái: "Mọi thứ xanh. Cả phòng gật đầu. Tôi cũng gật."
  - Chỉ tay terminal phải: "Đúng những lệnh đó. Đúng cái repo đó. Đỏ."
  - Nhấn chữ "Đã hủy": pipeline tự dừng, không chạy tiếp — hạt giống cho khái niệm "gate" ở slide 6.
  - "Sửa xong type check, push lại → đến lượt unit test fail. Không phải một lỗi lẻ."
- **Duration:** 3 phút

---

### Slide 4 — Câu hỏi treo + [CHƯA KIỂM CHỨNG]

- **Purpose:** Đóng gói câu chuyện thành 1 câu hỏi treo suốt buổi + chốt nguyên tắc dẫn vào CI.
- **Key message:** Lời khẳng định của AI là tuyên bố chưa kiểm chứng, không phải bằng chứng.
- **On-slide content:**
  - **Phần trên** — câu hỏi in rất lớn, nền tối, chữ trắng:
    > *"Cùng một bộ lệnh. Cùng một repository. Tại sao local xanh mà CI lại đỏ?"*
  - Hai bên câu hỏi: badge `LOCAL ✓` (xanh) và `CI ✗` (đỏ), giữa là `≠` mờ
  - Góc nhỏ: `→ trả lời ở phần 7`
  - **Phần dưới** — Chat bubble AI bị đóng dấu:
    - Bubble: `🤖 Claude Code: "Code đã Type Check pass & Unit Test pass rồi!"`
    - Stamp đỏ chéo trên bubble: **[CHƯA KIỂM CHỨNG]** (xoay -12°)
  - Chốt dưới cùng: *Đừng chỉ tin lời AI. Hãy để hệ thống kiểm chứng.*
  - Mũi tên mờ dẫn xuống chữ `CI` → dẫn sang section B
- **Component / visual:** Custom layout. Phần trên: nền `--ink`, chữ trắng to. Phần dưới: bubble chat có `border-radius`, stamp dùng CSS animation `scale(0) → scale(1.1) → scale(1)` + `rotate(-12deg)` + `drop-shadow`. Stamp dùng `border: 3px solid` đỏ + font mono uppercase.
- **Source:** `detail.md` § 0 — "Câu hỏi treo cho cả buổi" + "Message" (block [CHƯA KIỂM CHỨNG]).
- **Demo / code:** Không.
- **Speaker notes:**
  - **Không trả lời câu hỏi.** Nói: "Tôi sẽ không trả lời bây giờ. Để nguyên câu này trong đầu."
  - Nếu ai đó trả lời đúng ("khác Node version") → khen, nói "giữ đó, phần 7 ta mở ra hết."
  - Làm rõ: không nói AI sai, nói AI **không có tư cách kiểm chứng chính nó**.
  - Chuyển tiếp: "Vậy cái vừa chặn tôi lại, nó tên là gì? Bây giờ mới đặt tên."
- **Duration:** 3 phút

---

### Slide 5 — CI là gì

- **Purpose:** Đưa định nghĩa CI + ẩn dụ 3 tầng kiểm tra + chốt giá trị cốt lõi — tất cả trên 1 slide.
- **Key message:** CI là môi trường kiểm tra độc lập — giá trị cốt lõi là tính độc lập, không phải tính tự động.
- **On-slide content:**
  - **Cột trái (45%)** — Định nghĩa:
    - Blockquote lớn, nền accent nhạt, border-left đậm:
      > **Continuous Integration** — mỗi khi code được thay đổi và đưa lên repository, một quy trình tự động chạy lại **toàn bộ** các bước kiểm tra đã cấu hình.
    - 3 keyword chips sáng: `tự động` · `toàn bộ` · `đã cấu hình`
    - Mini flow bên dưới: `git push → [ CI ] → ✓ / ✗`
  - **Cột phải (55%)** — Pyramid 3 tầng (xếp từ dưới lên):
    - Tầng dưới (rộng nhất): icon 🤖 + "Tự kiểm tra" → *AI tự chạy test*
    - Tầng giữa: icon 👥 + "Bạn xem hộ" → *Code review*
    - Tầng trên (hẹp nhất, accent): icon 🖥️ + "Hệ thống chấm độc lập" → ***CI***
  - **Chốt** (full width, dưới cùng): ***CI tạo ra một môi trường kiểm tra độc lập với máy của developer.***
- **Component / visual:** `two-col--45-55`. Blockquote dùng `background: var(--accent)/0.08`, `border-left: 4px solid var(--accent)`. Pyramid dùng CSS `clip-path` trapezoid hoặc border-hack tạo hình thang, mỗi tầng có chiều rộng giảm dần (100% → 75% → 50%), centered. Tầng CI dùng `background: var(--accent)`, `color: white`. Chips dùng `display: inline-flex; gap: 0.5rem; padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--accent)/0.15`.
- **Source:** `detail.md` § 1 — "Định nghĩa" + "Điểm mấu chốt" + "Phép ẩn dụ sinh viên nộp bài" + "Message".
- **Demo / code:** Không.
- **Speaker notes:**
  - Giải thích "đã cấu hình" là quan trọng nhất: CI không tự biết kiểm tra gì, **team định nghĩa**. Hạt giống cho slide 23 (vai trò engineer).
  - Với audience không DevOps: runner = máy ảo do nền tảng CI cấp, dựng mới mỗi lần chạy rồi xóa đi.
  - Pyramid: "Không phải vì mình dốt, mà vì mình chấm bằng đúng cái đầu đã làm ra bài."
  - Nhấn: tự động hóa chỉ là phương tiện. Nếu chạy tự động nhưng vẫn trên máy bạn thì vô nghĩa.
- **Duration:** 5 phút

---

### Slide 6 — CI Pipeline + GATE

- **Purpose:** Cho audience thấy bộ xương pipeline CI dạng dây chuyền kiểm định, kèm cơ chế gate.
- **Key message:** 7 bước kiểm tra chạy tuần tự; một bước fail thì khóa pipeline, không chạy tiếp.
- **On-slide content:**
  - **Conveyor belt ngang** — 7 trạm kiểm định:
    1. `Checkout` — `git clone`
    2. `Install` — `npm ci`
    3. `Lint & Format` — `eslint .`
    4. `Type Check` — `tsc --noEmit`
    5. `Test` — `vitest run`
    6. `Build` — `vite build`
    7. `Security` — `gitleaks detect`
  - Mỗi trạm: card có tên bước (trên, font sans) + lệnh cụ thể (dưới, font mono)
  - Giữa các trạm: mũi tên `→`
  - Trên mỗi card: nhãn YAML nhỏ mờ (`on:`, `jobs:`, `steps:`, `run:`)
  - Dưới dây chuyền: **GATE barrier** sọc vàng-đen:
    - `✓ Tất cả pass → PR đủ điều kiện merge`
    - `✗ Một bước fail → Pipeline KHÓA, các bước sau bị hủy`
- **Component / visual:** `pipeline` custom. Các card dùng `display: flex; flex-direction: row; gap`. Mỗi card: `border-radius: var(--radius); background: white; box-shadow; padding`. Mũi tên giữa cards dùng CSS `::after` pseudo-element. GATE barrier: `background: repeating-linear-gradient(45deg, #f59e0b 0 10px, #1a1a2e 10px 20px)` hoặc accent stripe. Nhãn YAML dùng `font-size: 0.65rem; color: var(--muted); font-family: var(--font-mono)`.
- **Source:** `detail.md` § 1 "Cánh cổng kiểm tra" + § 2.1 block `trigger → job → step → gate` + § 2.2 "Sáu tác vụ CI chuẩn" (mở rộng thêm Security = bước 7).
- **Demo / code:** Không trên slide. Lệnh mỗi trạm lấy từ `ci.yml` thật.
- **Speaker notes:**
  - Đi từng bước (~1 phút). Mỗi bước nói **một câu loại lỗi**:
    - install → thiếu package, lockfile lệch; `npm ci` không phải `npm install`
    - lint → style, import chết
    - type check → sai kiểu, loại AI hay tạo nhất
    - test → sai logic
    - build → lỗi chỉ lộ khi bundle
    - security → secret lọt, dependency có CVE
  - Nhắc lại slide 3: "Chữ 'Đã hủy' lúc đầu chính là cái gate này."
  - Nhãn YAML: "Học hiểu một CI tool, chuyển sang cái khác chỉ là đổi cú pháp."
  - GitHub Actions = file YAML `.github/workflows/`, demo hôm nay dùng nó.
- **Duration:** 5 phút

---

### Slide 7 — Bản đồ công cụ CI

- **Purpose:** Cho audience biết trên thị trường có những nhóm công cụ nào, không đi vào cấu hình.
- **Key message:** Công cụ quanh pipeline thì chọn theo nhu cầu — ra khỏi phòng biết nhóm nào giải quyết việc gì là đủ.
- **On-slide content:**
  - **Radial mindmap** — vòng tròn trung tâm + 5 nhánh tỏa ra:
  - **Trung tâm:** pipeline 7 bước thu nhỏ (từ slide 6)
  - **5 nhánh:**
    - **CI Platform** (trên trái): GitHub Actions `★demo` · GitLab CI · Jenkins · CircleCI · Bitbucket · Azure DevOps
    - **Lint & Format** (trên phải): ESLint · Prettier · Biome · tsc · Hadolint · ShellCheck · actionlint · commitlint
    - **Test** (phải): Vitest · Jest · Playwright · Cypress · k6 · Codecov
    - **Security** (dưới phải): SCA: `npm audit` · Dependabot / SAST: Semgrep · CodeQL / Container: Trivy / Secret: Gitleaks · TruffleHog
    - **Quality Gate** (dưới trái): SonarQube · Husky + lint-staged · pre-commit · Danger
  - Công cụ dùng trong demo: highlight accent `★`
  - Security chia 4 sub-label: `SCA` / `SAST` / `Container` / `Secret`
- **Component / visual:** Custom **radial/spider diagram**. Vòng tròn giữa: `width: 200px; height: 200px; border-radius: 50%; border: 3px solid var(--accent)`. 5 nhánh dùng CSS `position: absolute` từ tâm, mỗi nhánh có `border-left: 2px solid var(--line)`. Mỗi cụm: `panel` nhỏ, bo góc, chứa tiêu đề nhóm (đậm) + danh sách tên (nhạt). Logo text-only, không cần ảnh logo.
- **Source:** `detail.md` § 2.1 (nền tảng) + § 2.3 A–E (toolbox).
- **Demo / code:** Không.
- **Speaker notes:**
  - "Không cần nhớ hết. Biết nhóm nào giải quyết việc gì là đủ — muốn quét secret thì có Gitleaks."
  - Đừng bật hết một lúc — pipeline 20 phút là cả team ghét. Lộ trình: ESLint + tsc + build → unit test + Gitleaks → Dependabot + Trivy + E2E → SAST + quality gate.
  - Dependabot/Renovate: không chỉ báo CVE, còn tự mở PR → PR đó đi qua CI.
  - Secret: đã push là lộ, xóa commit không cứu; quét 2 tầng (pre-commit + CI).
  - `[APPENDIX]` 4 tầng thời điểm chạy check: pre-commit (giây) → PR (phút) → merge main (chục phút) → theo lịch (đêm). Nói nếu có ai hỏi "pipeline chạy lâu thì sao".
  - `[APPENDIX]` PHPUnit, pytest, JUnit, golangci-lint… chỉ nói nếu bị hỏi.
- **Duration:** 6 phút

---

### Slide 8 — Deploy thủ công

- **Purpose:** Cho audience thấy lại (hoặc nhận ra chính mình trong) quy trình deploy thủ công, kèm rủi ro.
- **Key message:** Deploy thủ công: không lặp lại được, không kiểm soát được — mỗi lần là bằng trí nhớ.
- **On-slide content:**
  - **Cột trái (50%)** — Terminal giả lập (font mono, nền đen):
    ```
    $ ssh ubuntu@172.31.x.x
    $ git pull origin main
    $ npm install
    $ npm run build
    $ docker build -t app .
    $ docker stop old-container     ← DOWNTIME BẮT ĐẦU
    $ docker run -d new-container
    $ # mở browser, F5, nhìn bằng mắt 👁️
    ```
    - Vùng từ `docker stop` đến `docker run`: highlight đỏ + nhãn `WEBSITE ĐANG CHẾT`
    - Bước cuối: icon 👁️ + nhãn `không có kiểm chứng tự động`
  - **Cột phải (50%)** — Sticky Note Wall (nền board nâu nhạt):
    - 6 sticky notes xoay nhẹ random (-3° → +3°), drop shadow:
      - `Ai deploy? Lúc nào?`
      - `Version nào đang chạy?`
      - `Đã test chưa? Ai xác nhận?`
      - `Build fail giữa chừng?`
      - `Rollback thế nào?`
      - `3 người cùng deploy?`
    - Mỗi note có dấu `?` đỏ lớn
  - **Chốt** (full width, dưới cùng): *"Deploy thủ công: không lặp lại, không kiểm soát → Có cách nào chỉ cần `git push`, còn lại tự động?"*
- **Component / visual:** `two-col--50-50`. Terminal trái: `code-block--term`. Sticky notes: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem`. Mỗi note: `background: #fef3c7; padding: 1rem; border-radius: 2px; transform: rotate(Xdeg); box-shadow: 2px 3px 6px rgba(0,0,0,.15); font-family: var(--font-sans)`. Vùng downtime: `background: rgba(239,68,68,.15); border-left: 3px solid #ef4444`.
- **Source:** `detail.md` § 3 — block quy trình SSH + "Những câu hỏi không ai trả lời được" + "Message" + "Câu hỏi chuyển tiếp".
- **Demo / code:** Không.
- **Speaker notes:**
  - Hỏi phòng: "Sau khi merge xong thì ai đưa code lên server, bằng cách nào?"
  - Nhấn khoảng downtime giữa `docker stop` và `docker run`.
  - "Bằng chứng duy nhất rằng deploy thành công là mắt của người deploy."
  - Câu "người duy nhất biết deploy nghỉ phép" luôn gây cười — dùng để hạ nhiệt.
  - Phòng thủ: "team tôi deploy tay vẫn ổn mà" → ổn cho tới lần đầu tiên nó không ổn.
  - Chuyển tiếp: để câu hỏi trên slide vài giây trước khi sang CD.
- **Duration:** 7 phút

---

### Slide 9 — CD là gì + Ranh giới CI↔CD

- **Purpose:** Định nghĩa CD + xóa nhầm lẫn: CI và CD không phải hai hệ thống, mà là hai nửa của một đường ống.
- **Key message:** CI trả lời "code có đạt chuẩn không", CD trả lời "đưa nó ra thật thế nào cho an toàn". Artifact được test chính xác là thứ được deploy.
- **On-slide content:**
  - **Định nghĩa** (blockquote ở header):
    > **Continuous Delivery / Deployment** — sau khi code vượt qua các bước kiểm tra, **tự động** đưa phiên bản đó đến môi trường triển khai theo quy trình **nhất quán và lặp lại được**.
  - **Pipeline dọc bị "cắt đôi":**
    - **Vùng CI** (nền xanh nhạt): Checkout → Install → Lint → Type check → Test → Build → **Tạo artifact**
    - **Đường cắt ngang** (accent): `artifact đã được kiểm định` — có hiệu ứng "cắt"
    - **Vùng CD** (nền cam nhạt): Lấy artifact → Deploy → Restart → Health check
  - Bên phải mỗi vùng: câu hỏi đại diện italic
    - CI → *"code này có đạt chuẩn không?"*
    - CD → *"đưa nó ra thật thế nào cho an toàn?"*
  - Nhãn nhỏ dưới đường cắt: *"Không build lại — thứ được test chính xác là thứ được deploy"*
- **Component / visual:** `pipeline-stack--cut`. Region CI: `background: rgba(74,222,128,.06)`. Region CD: `background: rgba(251,146,60,.06)`. Đường cắt: `border: 2px dashed var(--accent)` + label centered. Câu hỏi italic bên phải dùng `position: absolute; right`.
- **Source:** `detail.md` § 4 — "Định nghĩa" + "Ranh giới CI ↔ CD" + "Chú ý chữ đúng artifact đó".
- **Demo / code:** Không.
- **Speaker notes:**
  - Điều audience hay hiểu sai: `docker build` + `docker push` **vẫn là CI** (tạo artifact). CD bắt đầu từ lúc chạm vào server.
  - Giải thích artifact: nếu server tự `git pull` rồi `npm run build` lại, thì thứ đang chạy trên production **chưa từng được test** — nó là bản build khác.
  - Nối slide 8: đó chính là điều quy trình thủ công đang làm.
  - Slide này nên để lâu — diagram quan trọng nhất khi sang CD.
- **Duration:** 4 phút

---

### Slide 10 — Quy trình CD thực tế: 6 ga tàu

- **Purpose:** Cho audience thấy hình dạng cụ thể của một CD pipeline chuẩn.
- **Key message:** Deploy trở thành quy trình 6 bước lặp lại được, có staging và kiểm chứng tự động.
- **On-slide content:**
  - **Train station** — 6 ga ngang:
    1. `Merge PR` — CI pass ✓
    2. `Build Image` — `docker build -t app:v2.4.0 .`
    3. `Push Registry` — `registry/app:v2.4.0`
    4. `Deploy Staging` ─┐ vùng `staging`
    5. `Smoke Test` ─────┘ (khoanh chung)
    6. `Release Production` — zero-downtime
  - "Tàu" (hình tròn accent) chạy qua các ga
  - Ga 4+5 khoanh vùng staging (nền khác): có chặng đệm trước production
  - Chốt: *"Deploy không còn là 'copy lên server thử xem'"*
- **Component / visual:** `pipeline` ngang phong cách train station. Mỗi ga: vòng tròn `●` trên đường ray ngang + nhãn dưới + lệnh nhỏ mono. Ga 4+5 khoanh bằng `border: 1px dashed; border-radius; background` riêng. "Tàu": vòng tròn accent nhỏ trên đường ray.
- **Source:** `detail.md` § 4 → "Một quy trình CD thực tế".
- **Demo / code:** Không. Code thật sẽ ở Demo 2.
- **Speaker notes:**
  - Giải thích "smoke test": vài phép thử nhanh xác nhận hệ thống còn sống (`/health` trả 200).
  - Demo hôm nay là bản thu gọn (không có staging riêng) — thành thật.
  - Tag `v2.4.0` sẽ được mổ kỹ ở Demo 2.
- **Duration:** 3 phút

---

### Slide 11 — Delivery vs Deployment: 2 làn đường

- **Purpose:** Phân biệt hai khái niệm hay bị lẫn bằng một hình ảnh rõ ràng.
- **Key message:** Hai trường phái giống nhau hoàn toàn, trừ một ô duy nhất ở sát cửa production.
- **On-slide content:**
  - **Dual lane highway** — 2 làn đường song song:
    - **Làn trên — Continuous Delivery** (nhãn `Manual Release`):
      `Commit → Auto Test → [🖐️ DUYỆT THỦ CÔNG] → Production`
    - **Làn dưới — Continuous Deployment** (nhãn `Auto Release`):
      `Commit → Auto Test → [🤖 TỰ ĐỘNG DEPLOY] → Production`
    - Tất cả ô giống nhau → mờ đi; chỉ ô thứ 3 sáng lên (khác biệt duy nhất)
  - **Bảng so sánh rút gọn** (dưới diagram):

    | | Delivery | Deployment |
    | --- | --- | --- |
    | Bước cuối | Người bấm nút | Tự động |
    | Yêu cầu bộ test | Vừa phải | **Rất cao** |
    | Feature flag / rollback | Nên có | **Bắt buộc** |
    | Hợp với | Team mới, compliance | SaaS, team trưởng thành |

- **Component / visual:** `comparison`. 2 flow ngang: dùng `display: flex; align-items: center; gap`. Ô giống nhau dùng `opacity: 0.5`. Ô khác biệt: `opacity: 1; border: 2px solid; box-shadow`. Lane trên: ô 3 có `background: #fbbf24` (vàng) + icon bàn tay. Lane dưới: ô 3 có `background: var(--accent)` + icon robot. Bảng dưới: `data-table` rút gọn, "Rất cao" và "Bắt buộc" dùng `font-weight: 700; color: #ef4444`.
- **Source:** `detail.md` § 5.1 + § 5.2 + § 5.3 bảng so sánh.
- **Demo / code:** Không.
- **Speaker notes:**
  - "Delivery" không có nghĩa chậm hơn — mọi thứ vẫn tự động, chỉ chờ một cú click.
  - Trong GitHub Actions, "bấm nút" = `workflow_dispatch` hoặc environment approval.
  - Câu hỏi để audience tự soi: "Nếu pipeline tự đẩy lên production ngay bây giờ, anh em có ngủ được không?"
  - Feature flag: bật/tắt tính năng bằng config mà không cần deploy lại (nói 1 câu).
- **Duration:** 4 phút

---

### Slide 12 — Mô hình lai: Git Branch Diagram

- **Purpose:** Đưa lời khuyên thực tế và chốt: phải có CI trước khi làm CD.
- **Key message:** Không có CI thì CD chỉ là cách hỏng nhanh hơn. Mô hình lai là lựa chọn thực dụng nhất.
- **On-slide content:**
  - **Git branch diagram:**
    - Banner CI ở trên: dải bắt buộc cả 2 nhánh phải đi qua
    - Nhánh `develop` → mũi tên liền (auto, icon robot) → hộp `STAGING`
    - Nhánh `main` → mũi tên đứt (manual, icon người) → hộp `PRODUCTION`
  - 3 chốt:
    - Cả hai bắt buộc có CI phía trước
    - Không có cái nào xịn hơn cái nào
    - Khác biệt duy nhất: có một con người bấm nút hay không
- **Component / visual:** Custom SVG/CSS. Nhánh git dùng `border-left` + `::before` pseudo circle cho commit nodes. CI banner: `background: var(--accent)/0.1; border: 1px solid var(--accent)` chạy ngang trên cùng. Nhánh develop: mũi tên liền `border: 2px solid`. Nhánh main: mũi tên đứt `border: 2px dashed`.
- **Source:** `detail.md` § 5.4 → "Ba điều cần nói rõ" + mô hình lai.
- **Demo / code:** Không.
- **Speaker notes:**
  - "Nếu team chưa có CI: đừng làm CD trước. Thứ tự là CI rồi mới CD."
  - Chuyển tiếp: "Nói đủ rồi. Bây giờ chạy thật."
- **Duration:** 2 phút

---

### Slide 13 — 4 Demo: Cinema Tickets

- **Purpose:** Cho audience biết lộ trình demo, demo cuối là quan trọng nhất.
- **Key message:** Demo 4 đóng lại câu hỏi treo từ phút thứ 5.
- **On-slide content:**
  - **4 thẻ vé cinema** xếp ngang, xoay nhẹ:
    - Vé 1: **AI viết CI** — soi lại cái AI viết · ⏱ 6 phút
    - Vé 2: **AI viết CD** — Docker → Docker Hub → EC2 · ⏱ 6 phút
    - Vé 3: **Full flow** — `git push` → production · ⏱ 7 phút
    - Vé 4: **Tái hiện mở đầu** — local xanh, CI đỏ · ⏱ 6 phút · ★ MAIN EVENT
  - Vé 4 có viền accent + nhãn `★ MAIN EVENT` + mũi tên vòng về slide 4
- **Component / visual:** 4 cards `display: flex; gap`. Mỗi card: `background: white; border-radius: var(--radius); border-top: 4px solid var(--accent); box-shadow`. Nửa dưới mỗi card: border-top dashed (giả rách vé). Card 4: `border: 2px solid var(--accent); background: var(--accent)/0.05`.
- **Source:** `detail.md` § 6 mở đầu.
- **Demo / code:** Không.
- **Speaker notes:**
  - Chuẩn bị: mở sẵn tab GitHub repo, Actions, Docker Hub, terminal, IP server.
  - "Mọi thứ chạy thật, có thể fail thật."
  - Dự phòng: `docker build` + `docker run -p 3000:3000` local.
- **Duration:** 1 phút

---

### Slide 14 — Demo 1: AI sinh CI + Checklist Review

- **Purpose:** Cho thấy rào cản viết CI gần như biến mất, nhưng phải review output AI.
- **Key message:** AI viết được ≠ AI viết đúng — phải có checklist review.
- **On-slide content:**
  - **Cột trái (50%)** — Chat AI window:
    - Prompt: *"Create a GitHub Actions CI pipeline for this Node.js app..."*
    - AI response: `✓ Generated ci.yml`
    - Code block `ci.yml` rút gọn: `on: [push, pull_request]` + các dòng `- run:`
  - **Cột phải (50%)** — Checklist overlay trên nền code mờ:
    - ☐ Có cache dependency chưa? → thiếu = chậm gấp 3
    - ☐ Node version có khớp production?
    - ☐ Có lint / type check chưa?
    - ☐ Có bước security scan chưa?
    - ☐ Có secret nào bị hardcode không?
    - ☐ Có chạy cho `pull_request` không?
  - **Banner dưới:** `AI viết được ≠ AI viết đúng`
- **Component / visual:** `two-col--50-50`. Trái: `code-block` YAML rút gọn. Chat window: `border-radius; border: 1px solid var(--line); overflow: hidden`. Phải: checklist dùng `list-style: none; padding-left: 0` + custom `::before` checkbox. Banner dưới: `background: var(--ink); color: white; text-align: center; padding: 0.75rem; font-weight: 700`.
- **Source:** `detail.md` § 6 Demo 1.
- **Demo / code:** Demo live — so sánh bản AI sinh vs `ci.yml` chuẩn (có cache, node-version: 20, job security).
- **Speaker notes:**
  - Trong lúc AI sinh: mapping ngược slide 6 — `on:` = trigger, `jobs:` = job, `run:` = step.
  - Bản AI thường thiếu job security và để `node-version` khác production.
  - Nối slide 4: AI nói "xong rồi" cũng là tuyên bố chưa kiểm chứng.
- **Duration:** 6 phút

---

### Slide 15 — Demo 2: CD Flow + Tag SHA

- **Purpose:** Cho audience thấy đường đi artifact từ CI ra server thật + tầm quan trọng tag SHA.
- **Key message:** CD là 3 chặng: đóng gói → registry → server. Tag SHA để rollback, không dùng `latest`.
- **On-slide content:**
  - **3-zone geographical map** ngang:
    - **Zone 1 — GitHub Runner** (nền xanh): `docker build` + `docker push` · nhãn `◄ CI ►`
    - **Zone 2 — Docker Hub** (nền tím): icon registry + danh sách tag (`a1b2c3d`, `e4f5g6h`, `9z8y7x6`)
    - **Zone 3 — EC2 Server** (nền cam): `docker pull` → `docker stop` → `docker rm` → `docker run` → `curl /health` · nhãn `◄ CD ►`
  - Hộp image animated di chuyển qua 3 zone
  - **So sánh tag** (dưới cùng):
    - `⚠ tag: latest` → KHÔNG rollback được
    - `✓ tag: SHA` → rollback = deploy lại tag trước
  - Code: `tags: ${{ secrets.DOCKERHUB_USERNAME }}/demo-app:${{ github.sha }}`
- **Component / visual:** 3 panels ngang, mỗi panel: `flex: 1; padding; border-radius; background` riêng (xanh nhạt / tím nhạt / cam nhạt). Đường cắt CI/CD highlight giữa zone 1 và zone 3. Code dòng tag: `code-block` 1 dòng.
- **Source:** `detail.md` § 6 Demo 2.
- **Demo / code:** Demo live — mở `cd.yml`, xem run, screenshot Docker Hub tag list.
- **Speaker notes:**
  - Registry = như npm registry nhưng cho Docker image.
  - Chỉ `curl /health` cuối script — health check từ slide 9.
  - Tag `latest`: chỗ nhiều team làm sai nhất.
- **Duration:** 6 phút

---

### Slide 16 — Demo 3: git push → Production

- **Purpose:** Khoảnh khắc "wow" — toàn bộ chuỗi tự động chạy end-to-end.
- **Key message:** Một lần `git push` → tự test → tự build → tự deploy. Không ai SSH, không ai chờ.
- **On-slide content:**
  - **Nửa trên:** code-block diff 2 dòng:
    ```diff
    - Hello World
    + Hello from AI-powered CI/CD
    ```
  - **Nửa dưới:** pipeline tracker ngang:
    `Push → CI (install, lint, typecheck, test, build) → Docker Build → Docker Hub → CD (SSH, pull, restart, health check)`
    - Mỗi trạm sáng xanh lần lượt (animation đồng bộ demo)
  - **Kết quả:** khung browser mockup: `http://EC2-IP` → **Hello from AI-powered CI/CD**
- **Component / visual:** `code-block--diff` (2 dòng `is-del` / `is-add`, font lớn). Pipeline tracker: `pipeline` ngang nhỏ, mỗi step có CSS `animation-delay` tăng dần. Browser mockup: `border-radius: var(--radius); border: 1px solid var(--line); overflow: hidden` + title bar giả.
- **Source:** `detail.md` § 6 Demo 3.
- **Demo / code:** Demo live — sửa `public/index.html`, commit, push, xem Actions chạy, mở IP server.
- **Speaker notes:**
  - Trong lúc pipeline chạy (1–3 phút): chỉ lại đâu là CI, đâu là CD, `npm ci` đang chạy trên máy sạch.
  - "Không ai SSH. Không ai nhớ thứ tự lệnh. Không ai phải ngồi chờ."
  - Backup: `npm run dev` hoặc `docker run -p 3000:3000` local.
- **Duration:** 7 phút

---

### Slide 17 — Demo 4: Local pass, CI fail + AI Loop

- **Purpose:** Đóng vòng câu hỏi treo + định vị vai trò AI: công cụ phân tích, không phải người quyết định.
- **Key message:** Local pass hoàn toàn, CI vẫn fail. AI phân tích nhanh nhưng developer review không được bỏ.
- **On-slide content:**
  - **Cột trái (45%)** — Mirror layout (echo slide 3):
    - 2 cột nhỏ: `LOCAL ✓` (xanh) vs `CI ✗` (đỏ), dấu `≠` giữa
    - Nhắc lại câu hỏi slide 4 ở góc nhỏ
    - Bên dưới: hình cây thư mục, file `local-session.ts` đậm ở LOCAL, mờ/nét đứt ở CI
  - **Cột phải (55%)** — Cycle Loop 6 node (vòng tròn):
    1. AI viết code & push
    2. CI kiểm tra tự động ← **cổng chặn** (icon cổng, đỏ)
    3. AI phân tích log lỗi
    4. ► **DEVELOPER REVIEW** ◄ (node lớn nhất, accent, icon người)
    5. AI sửa code
    6. Pipeline chạy lại → ✓ xanh
  - Node 4 nổi bật nhất: accent color, to hơn
- **Component / visual:** `two-col--45-55`. Mirror: reuse CSS từ slide 3 thu nhỏ. Cycle loop: 6 nodes xếp vòng tròn dùng CSS `transform: rotate(Xdeg) translateX(Rpx)` cho mỗi node. Mũi tên cong giữa nodes. Node 2: `border: 2px solid #ef4444`. Node 4: `border: 3px solid var(--accent); width: bigger; font-weight: 700`.
- **Source:** `detail.md` § 6 Demo 4.
- **Demo / code:** Demo live — `node scripts/demo4.mjs missing-file` → pass local → CI fail → copy log cho AI → review trước phòng → push lại → xanh.
- **Speaker notes:**
  - "Cổng quyết định vẫn là CI, không phải AI."
  - "Có nên để AI tự merge khi pipeline xanh?" → Không: pipeline xanh chỉ nghĩa là không vi phạm tiêu chuẩn ta đặt ra.
  - Nhớ `node scripts/demo4.mjs off` sau khi diễn.
- **Duration:** 6 phút

---

### Slide 18 — Vấn đề A+B: Haunted Laptop vs Clean Box

- **Purpose:** Trả lời câu hỏi treo + cho audience nhận diện "hành lý ẩn" trên máy mình.
- **Key message:** Máy dev tích lũy trạng thái riêng tạo ra kết quả xanh giả; CI runner sạch trơn.
- **On-slide content:**
  - **Cột trái (55%)** — "Haunted Laptop":
    - Hình laptop mở, xung quanh 5 "ghost" bám vào:
      - 👻 `node_modules` — package lệch minor version
      - 👻 `.env.local` — biến môi trường riêng
      - 👻 `uncommitted file` — file chưa commit
      - 👻 `.cache` — cache cũ che lỗi
      - 👻 `custom cmd` — lệnh AI chạy ≠ lệnh pipeline
  - **Cột phải (45%)** — "Clean Box":
    - Hình container trống trơn: `CI RUNNER — trống trơn`
    - Bảng 4 dòng so sánh:

      | Yếu tố | Máy local | CI |
      | --- | --- | --- |
      | Node.js | `v20.11.0` | `v18.17.0` |
      | Package | Dev cache | Lockfile nghiêm ngặt |
      | Env | `.env.local` riêng | Secrets thật |
      | **Phạm vi test** | **1 file** | **Toàn bộ project** |

    - Dòng cuối highlight cảnh báo
- **Component / visual:** `two-col--55-45`. "Ghosts": `position: absolute` quanh laptop, mỗi ghost dùng CSS `animation: float 3s ease-in-out infinite` + `opacity: 0.7`. Laptop: CSS art đơn giản (2 rect). Clean box: `border: 2px dashed var(--line); background: transparent`. Bảng: `data-table` nhỏ, dòng cuối dùng `is-highlighted`.
- **Source:** `detail.md` § 7.1 "Nhóm A" + § 7.2 "Nhóm B".
- **Demo / code:** Không.
- **Speaker notes:**
  - Dòng "phạm vi test" đáng sợ nhất: AI thường chỉ chạy `npm test -- path/to/file.test.ts`, không chạy cả project.
  - "Lệch command" ít ai nghĩ tới nhưng hay xảy ra: AI tự nghĩ ra lệnh test riêng.
  - `[APPENDIX]` Monorepo: check riêng từng package pass, check cả dependency graph mới lòi lỗi cross-package. Nói nếu audience dùng monorepo.
  - Hỏi phòng: "Ai từng thấy AI chạy `npm test -- path/to/file.test.ts` thay vì `npm test`?"
- **Duration:** 4 phút

---

### Slide 19 — Vấn đề C + Tốc độ AI: Explosion Timeline + Funnel

- **Purpose:** Chuyển từ lỗi code/môi trường sang lỗi vận hành + giải thích vì sao vấn đề nghiêm trọng hơn trước.
- **Key message:** Deploy có thể gây downtime ngay cả khi code đúng; tốc độ AI tăng × review cũ = rủi ro tăng vọt.
- **On-slide content:**
  - **Cột trái (50%)** — Explosion Timeline:
    - Timeline deploy ngang 5 điểm nổ:
      - 💥 `build fail` — server build khác local
      - 💥 `docker stop` ═══ **DOWNTIME** ═══ 💥 `docker run fail`
      - 💥 `sau deploy` — lỗi không đường lùi
      - 💥 `đồng thời` — deploy đè lên nhau
    - Vùng `stop → run` tô đỏ + nhãn `WEBSITE ĐANG CHẾT`
    - Banner: *"Trên máy em chạy được" ≠ Production green*
  - **Cột phải (50%)** — Funnel Bottleneck:
    - Phần trên rộng: `AI Agent — 50+ file/phút` (nền accent nhạt)
    - Cổ phễu hẹp: bottleneck (nét đứt, icon cảnh báo)
    - Phần dưới hẹp: `Human Review — 2-3 file/giờ · 50+ PR chờ` (nền đỏ nhạt)
    - Công thức: `Tốc độ AI ↑ × Review cũ = Rủi ro ↑↑`
- **Component / visual:** `two-col--50-50`. Timeline: flex ngang, mỗi điểm nổ có `border-radius: 50%; background: #ef4444; width: 2rem`. Vùng downtime: `background: rgba(239,68,68,.15)`. Funnel: CSS `clip-path: polygon()` tạo hình phễu, hoặc 2 rect giảm width dần. Bottleneck: `border: 2px dashed; padding`.
- **Source:** `detail.md` § 7.4 "Nhóm C" + § 7.5 "Ngụy biện" + § 7.6 "Tốc độ AI vs review".
- **Demo / code:** Không.
- **Speaker notes:**
  - Nối slide 8: những câu hỏi không trả lời được lúc đó chính là các điểm nổ ở đây.
  - Kết luận: nếu review là cổ chai mà ta coi nó là cổng duy nhất, cổng đó sẽ bị bỏ qua.
  - "Trên máy em chạy được mà!" — nói nhẹ nhàng, có humour. Ai cũng từng nói.
- **Duration:** 4 phút

---

### Slide 20 — Chi phí bỏ qua CI: Escalation Staircase

- **Purpose:** Chốt section vấn đề bằng chi phí — lý lẽ mạnh nhất để thuyết phục team.
- **Key message:** Càng phát hiện muộn càng đắt; AI sinh code nhanh hơn nghĩa là lỗi cũng sinh ra nhanh hơn.
- **On-slide content:**
  - **Bậc thang chi phí** leo dốc từ trái sang phải:
    - Bậc 1: `LOCAL` (xanh nhạt) — miễn phí, sửa ngay
    - Bậc 2: `CI` (xanh) — vài phút, sửa ngay
    - Bậc 3: `STAGING` (vàng) — vài giờ, cần investigate
    - Bậc 4: `PRODUCTION` (đỏ, cao vọt) — hotfix ngoài giờ, user nhìn thấy, mất niềm tin
  - Mỗi bậc có icon 💰 tăng dần (1 → 2 → 3 → 8)
  - Bậc Production cao gấp 3-4 lần bậc trước — phi tuyến
  - Mũi tên dưới: *"Chi phí sửa lỗi → tăng phi tuyến"*
  - Chuyển tiếp: *"Xong phần chẩn đoán. Giờ là phần chặn từng cái một."*
- **Component / visual:** Custom CSS staircase. 4 bậc: `display: flex; align-items: flex-end`. Mỗi bậc: `div` với `height` tăng dần (50px → 80px → 130px → 250px). Background mỗi bậc gradient từ xanh → đỏ. Bậc Production: `animation: shake 0.3s` khi xuất hiện.
- **Source:** `detail.md` § 7.6 → "Và nếu bỏ qua CI".
- **Demo / code:** Không.
- **Speaker notes:**
  - "Đắt" là gì: user nhìn thấy lỗi, hotfix ngoài giờ, mất niềm tin — không chỉ thời gian dev.
  - Chuyển tiếp: "Xong phần chẩn đoán. Giờ là phần chặn từng cái một."
- **Duration:** 2 phút

---

### Slide 21 — Cách chặn: Shield Wall

- **Purpose:** Cho audience thấy mỗi vấn đề có một biện pháp cụ thể — không phải định mệnh.
- **Key message:** Toàn bộ nhóm lỗi được chặn bằng các thao tác cấu hình đơn giản.
- **On-slide content:**
  - **Bảng tường khiên** — 2 cột, 9 dòng:

    | 🔴 Vấn đề | 🛡️ Cách chặn |
    | --- | --- |
    | Lệch runtime version | Ghim `node-version` trong CI / Docker image cố định |
    | Lệch dependency | `npm ci --frozen-lockfile`, luôn commit lockfile |
    | Cache ẩn / máy bẩn | Container sạch, dựng mới mỗi lần |
    | File chưa commit | CI checkout từ repo — thiếu = fail ngay |
    | Lệch command | Script chuẩn `package.json` — dev và CI dùng chung |
    | Bug lọt production | Staging + smoke test trước, rồi mới release |
    | Deploy hỏng | Tag SHA → rollback = deploy lại tag trước |
    | Không biết trạng thái | Health check + monitoring + log tập trung |
    | PR merge ẩu | Branch protection: CI xanh mới cho merge |

  - Cột trái: ô đỏ nhạt + icon cảnh báo
  - Cột phải: ô xanh nhạt + icon khiên 🛡️
  - Giữa: mũi tên `→`
- **Component / visual:** `data-table` custom. Cột trái: `background: rgba(239,68,68,.06)`. Cột phải: `background: rgba(74,222,128,.06)`. Mỗi dòng có separator nhẹ. Font size nhỏ hơn bình thường (0.85rem) để vừa 9 dòng. Dòng cuối ("branch protection") highlight.
- **Source:** `detail.md` § 8.1 bảng đối chiếu (10 dòng gộp thành 9).
- **Demo / code:** Có thể chỉ tay lại `ci.yml`: `node-version: 20` + `npm ci` + `npm run <script>`.
- **Speaker notes:**
  - "Lệch command": dễ nhất và bị bỏ qua nhiều nhất — mọi lệnh phải là script trong `package.json`.
  - "File chưa commit": CI không "chặn" — đó là thuộc tính miễn phí của checkout từ repo.
  - Branch protection: làm được trong 2 phút, đổi hẳn văn hóa team.
  - Nhắc Demo 2: tag SHA chính là điều kiện để rollback tồn tại.
  - Screenshot chuẩn bị: GitHub branch protection settings + PR bị chặn merge.
- **Duration:** 4 phút

---

### Slide 22 — Container sạch + Security Gate

- **Purpose:** Rút gọn CI về hình ảnh cực đơn giản + thống nhất: pipeline bắt buộc cho cả người lẫn AI.
- **Key message:** Cùng một môi trường sạch, cùng một bộ lệnh, cùng một tiêu chuẩn — không có ngoại lệ.
- **On-slide content:**
  - **Security gate** (`pipeline-converge`) — cổng an ninh sân bay:
    - 2 luồng vào từ trên:
      - `👤 Developer: "Code nhìn có vẻ ổn…"` ← ⚠
      - `🤖 AI Agent: "Test local pass…"` ← ⚠
    - Mũi tên nét đứt cố "đi vòng" → bị chặn (`✗ blocked`)
    - Cổng giữa: **MANDATORY GATE** — `ci-pipeline.yml`
      - Bên trong cổng: 3 dòng terminal:
        ```
        docker run --rm node:20-alpine
        npm ci --frozen-lockfile
        npm run typecheck && npm test
        ```
      - Nhãn: `KHÔNG CÓ NGOẠI LỆ`
    - 1 đường ra duy nhất → `DEPLOY`
- **Component / visual:** `pipeline-converge`. 2 actor cards: `display: flex; gap`. Mỗi card: `padding; border-radius; border: 1px solid var(--line)`. Icon + tên + quote. Bypass: `text-decoration: line-through; color: var(--muted)`. Gate: `border: 3px solid var(--accent); background: var(--ink); color: white; padding: 1.5rem; font-family: var(--font-mono)`. Outflow: mũi tên + label "one path out".
- **Source:** `detail.md` § 8.2 "Container sạch" + § 8.3 "Pipeline bắt buộc cho cả người lẫn AI".
- **Demo / code:** 3 dòng code terminal trên slide. Demo tùy chọn: `docker build -t demo-app:local .`
- **Speaker notes:**
  - CI về bản chất: vứt bỏ mọi thứ riêng tư, dựng lại từ đầu, buộc project tự chứng minh.
  - `--rm`: mỗi lần chạy = bắt đầu lại từ số 0.
  - "Pipeline không dựa trên cảm giác rằng code có vẻ ổn. Nó thực thi tiêu chuẩn team đã định nghĩa."
  - Câu trả lời cho "vậy AI có được tin không?" → câu hỏi sai; câu đúng là "tiêu chuẩn ta đã đủ chưa?"
- **Duration:** 3 phút

---

### Slide 23 — Đổi câu hỏi + Giới hạn + Vai trò: Triptych

- **Purpose:** Cô đặc 3 insight quan trọng nhất của phần giải pháp vào 1 slide.
- **Key message:** Đổi câu hỏi hằng ngày + hiểu giới hạn CI + định vị lại vai trò engineer.
- **On-slide content:**
  - **3 panel cards** xếp ngang, mỗi panel có border-top accent khác:
  - **Panel 1 — ĐỔI CÂU HỎI** (border xanh):
    - ✗ "Claude bảo pass chưa?" (xám)
    - ✓ "Pipeline đã xanh chưa?" (accent)
    - 6 chip: Dependency · Lint · Type Check · Test · Integration · Build
  - **Panel 2 — GIỚI HẠN** (border vàng):
    - Pipeline xanh nhưng có lỗ hổng:
    - • Viết test sai → vẫn xanh
    - • Business rule chưa test → CI không biết
    - • Chưa config security → lỗ hổng lọt
    - Chốt: *"CI chỉ mạnh bằng tiêu chuẩn ta đặt vào nó"*
  - **Panel 3 — VAI TRÒ** (border tím):
    - 2 tầng:
      - Tầng trên: `Engineer — định nghĩa tiêu chuẩn` (accent)
      - Tầng dưới: `AI — viết code` (xám, rộng hơn)
    - 6 câu hỏi engineer: test nào cần tồn tại? coverage? security check? khi nào merge? khi nào deploy? xử lý sự cố?
- **Component / visual:** `three-col`. Mỗi panel: `flex: 1; padding: 1.5rem; border-radius: var(--radius); border-top: 4px solid [color]; background: white; box-shadow`. Panel 1 border `var(--accent)`. Panel 2 border `#f59e0b`. Panel 3 border `#8b5cf6`. Chips trong panel 1: `display: inline-flex; gap: 0.25rem; font-size: 0.7rem; background: var(--accent)/0.1; padding: 0.2rem 0.5rem; border-radius: 999px`.
- **Source:** `detail.md` § 8.4 "Chuyển câu hỏi" + § 8.5 "CI/CD không phải viên đạn bạc" + § 8.6 "Vai trò Software Engineer".
- **Demo / code:** Không.
- **Speaker notes:**
  - Panel 1: gợi ý đổi câu hỏi trong daily/standup và PR template.
  - Panel 2: "Để buổi hôm nay không thành buổi quảng cáo." Ví dụ: `expect(true).toBe(true)` vẫn tăng coverage.
  - Panel 3: slide có giá trị cảm xúc cao — nói với giọng khẳng định. Liên hệ slide 5: CI chạy "những bước đã cấu hình" — người cấu hình là kỹ sư.
- **Duration:** 3 phút

---

### Slide 24 — Hệ sinh thái: Infinity Loop

- **Purpose:** Đặt mọi thứ vừa nói vào một bức tranh duy nhất — hình ảnh tổng thể mang về.
- **Key message:** AI tăng tốc, Git lưu vết, CI xác minh, CD triển khai, Monitoring theo dõi — vòng lặp liên tục.
- **On-slide content:**
  - **Infinity loop (∞)** — 5 khối trên đường ∞:
    - `AI Agent` — tăng tốc development · icon 🤖
    - `Git` — lưu vết thay đổi · icon 📝
    - `CI` — xác minh tiêu chuẩn · icon ✓/✗ · **viền accent đặc biệt + nhãn "khối duy nhất nói KHÔNG"**
    - `CD` — triển khai có kiểm soát · icon 🚀
    - `Monitoring` — theo dõi vận hành · icon 📊
  - Mũi tên vòng lặp từ Monitoring về AI Agent
  - CI là khối nổi bật nhất (accent border, lớn hơn)
- **Component / visual:** `pipeline-anatomy` custom. Infinity loop: CSS shape dùng 2 vòng tròn giao nhau (`border-radius: 50%`) hoặc SVG path. 5 khối: `position: absolute` trên đường ∞. Mỗi khối: `padding; border-radius; background: white; box-shadow`. CI khối: `border: 3px solid var(--accent); transform: scale(1.15)`. Mũi tên vòng: SVG `<path>` hoặc CSS animated.
- **Source:** `detail.md` § Tổng kết → "Hệ sinh thái hoàn chỉnh" + § 8.7 "Vòng lặp monitoring".
- **Demo / code:** Không.
- **Speaker notes:**
  - CI là khối duy nhất **nói không** — bốn khối kia đều tăng tốc hoặc quan sát.
  - Monitoring: nằm ngoài scope buổi hôm nay, nhưng thiếu nó thì "deploy xong không ai biết gì" vẫn nguyên.
  - Slide nên dùng làm ảnh đại diện khi share tài liệu.
- **Duration:** 2 phút

---

### Slide 25 — 3 điều mang về

- **Purpose:** Đóng gói toàn buổi thành 3 câu audience nhắc lại cho team.
- **Key message:** AI giải quyết tốc độ; bài toán còn lại là kiểm soát chất lượng.
- **On-slide content:**
  - **3 khối lớn** xếp dọc, nhiều khoảng trắng:
    1. *"AI đã chạy test và pass"* **không phải điểm kết thúc** — hãy coi nó là **bước kiểm tra đầu tiên**
    2. Vấn đề không còn là **viết code đủ nhanh** — mà là **kiểm soát chất lượng** của tốc độ đó
    3. AI là developer code cực nhanh → **CI/CD là dây chuyền kiểm định mà ngay cả AI cũng phải đi qua**
  - Câu 3 in đậm nhất, accent color — câu tổng
  - Thiết kế để audience chụp lại được: chữ to, ít chi tiết
- **Component / visual:** Custom layout. 3 blocks: `display: flex; flex-direction: column; gap: 2rem`. Mỗi block: `padding: 1.5rem 2rem; border-left: 4px solid var(--accent); background: var(--paper)`. Block 3: `border-left: 6px solid var(--accent); font-weight: 700; font-size` lớn hơn.
- **Source:** `detail.md` § Tổng kết → "Ba câu mang về".
- **Demo / code:** Không.
- **Speaker notes:**
  - Nói chậm. 60–90 giây quan trọng nhất.
  - Mời audience chụp slide.
- **Duration:** 2 phút

---

### Slide 26 — Slide kết + Q&A

- **Purpose:** Đóng vòng slide 1, mở sàn Q&A.
- **Key message:** Câu trả lời cuối cùng thuộc về pipeline.
- **On-slide content:**
  - **Echo slide 1** — dùng lại 2 chat bubbles:
    - `🤖 AI Agent: "Code đã ổn"` *(?)*
    - `👤 Developer: "Chắc là ổn"` *(?)*
  - Đường kẻ ngang animated
  - Dòng kết luận lớn, glow: **✦ HÃY ĐỂ PIPELINE TRẢ LỜI ✦**
  - Dưới: **Q&A**
    - 4 chip câu hỏi gợi ý: *Project nhỏ cần CI?* · *Pipeline chạy lâu?* · *AI tự merge?* · *Chưa có test?*
    - QR code → repo demo
    - Thumbnail hệ sinh thái (slide 24) làm nền mờ tham chiếu
- **Component / visual:** `closing`. Reuse CSS bubbles từ slide 1. Dòng kết luận: `font-size: 2rem; font-weight: 800; color: var(--accent); text-shadow: 0 0 20px var(--accent)/0.3; animation: glow 2s ease-in-out infinite`. Chips Q&A: `display: inline-flex; gap: 0.5rem; padding: 0.3rem 0.75rem; border: 1px solid var(--line); border-radius: 999px`.
- **Source:** `detail.md` § "Slide cuối" + § "Q&A".
- **Demo / code:** QR/link repo demo.
- **Speaker notes:**
  - Không nói thêm gì sau dòng kết. 3 giây im lặng rồi chuyển Q&A.
  - 4 câu trả lời chuẩn bị trước (không lên slide):
    - "Project nhỏ cần CI?" → Cần: lint + test + build trên PR là đủ.
    - "Pipeline 15 phút?" → Cache, job song song, tách nhanh/chậm, Docker layer caching.
    - "AI tự merge?" → Không. Pipeline xanh ≠ người chịu trách nhiệm.
    - "Chưa có test?" → Lint + type check + build. Không cần test mà đã chặn rất nhiều lỗi.
- **Duration:** 2 phút + 10 phút Q&A

---

# Presentation Summary

## Tổng số slide: 26

## Các slide quan trọng nhất (không được cắt)

| Slide | Lý do |
| --- | --- |
| **3** — Local ✓ vs CI ✗ | Split-screen hook, trục xuyên suốt |
| **4** — Câu hỏi treo | Đóng lại ở slide 17, 18 |
| **5** — CI là gì | Định nghĩa + pyramid 3 tầng |
| **6** — CI Pipeline + GATE | Bộ xương pipeline + cơ chế gate |
| **9** — Ranh giới CI↔CD | Diagram quan trọng nhất khi sang CD |
| **14** — Demo 1: Checklist review AI | Giá trị cốt lõi phần AI |
| **17** — Demo 4: Cycle loop | Định vị vai trò AI + đóng vòng |
| **21** — Shield wall giải pháp | Bảng đối chiếu toàn bộ |
| **22** — Security gate | Pipeline bắt buộc + container sạch |
| **25/26** — Takeaway + closing | Đóng vòng slide 1 |

## Slides cần demo live

| Slide | Demo | Thời lượng |
| --- | --- | --- |
| 14 | Demo 1 — AI sinh `ci.yml`, soi checklist | 6 phút |
| 15 | Demo 2 — image → Docker Hub → EC2; tag SHA | 6 phút |
| 16 | Demo 3 — sửa 1 dòng → push → IP server | 7 phút |
| 17 | Demo 4 — local pass, CI fail → AI loop → xanh | 6 phút |

## Visual styles (không lặp)

| # | Style |
| --- | --- |
| 1 | Cinematic dark + chat bubbles |
| 2 | Metro line agenda |
| 3 | Split-screen terminal |
| 4 | Chat bubble + rubber stamp |
| 5 | Pyramid 3 tầng + blockquote |
| 6 | Conveyor belt pipeline |
| 7 | Radial mindmap |
| 8 | Terminal + sticky note wall |
| 9 | Pipeline cắt đôi |
| 10 | Train station 6 ga |
| 11 | Dual lane highway |
| 12 | Git branch diagram |
| 13 | Cinema tickets |
| 14 | Chat AI + checklist overlay |
| 15 | 3-zone geographical map |
| 16 | Diff + pipeline tracker |
| 17 | Mirror + cycle loop |
| 18 | Haunted laptop + clean box |
| 19 | Explosion timeline + funnel |
| 20 | Escalation staircase |
| 21 | Shield wall table |
| 22 | Security gate (sân bay) |
| 23 | Triptych 3-panel |
| 24 | Infinity loop ∞ |
| 25 | 3 large blocks |
| 26 | Echo cover + glow text |
