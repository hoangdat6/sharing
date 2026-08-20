# CI/CD trong thời đại AI — Đề cương buổi sharing

**Thời lượng:** 1h45 – 2h (bao gồm demo và Q&A)
**Audience:** Developer — Backend / Frontend / Fullstack
**Stack demo:** GitHub → GitHub Actions → Docker → Docker Hub → EC2
**Nguồn tham khảo:** `video-fb-extracted.md` (video 8'26 của Trần Huy Hoàng)

**Thông điệp xuyên suốt:**

> "AI bảo pass" chỉ là bước kiểm tra **đầu tiên**, không phải điểm kết thúc.
> Câu hỏi đúng không phải *"AI bảo pass chưa?"* mà là *"Pipeline đã xanh chưa?"*

---

## 0. Mở đầu — Một tình huống có thật · 8 phút

Không mở bài bằng định nghĩa. Mở bằng câu chuyện, để người nghe tự thấy vấn đề.

- Vibe coding một website với Claude Code → yêu cầu AI tự kiểm tra lại code
- AI chạy `typecheck` → **pass**. AI chạy `unit test` → **pass** (18/18, 0.6s)
- Yên tâm `git push` lên GitHub
- CI chạy lại đúng những bước đó trên server → **Type Check FAIL**
- Sửa xong type check → đến lượt **Unit Test FAIL**
- Câu hỏi treo lơ lửng cho cả buổi: *tại sao cùng một bộ lệnh, local xanh mà CI đỏ?*

> **Chốt:** Đừng chỉ tin lời AI. Hãy để hệ thống kiểm chứng.

---

## 1. CI là gì? · 10 phút

- Continuous Integration: mỗi khi code được đẩy lên repository, **một quy trình
  tự động chạy lại toàn bộ bước kiểm tra** đã cấu hình
- CI không quan tâm developer nói "code chạy được", cũng không quan tâm AI nói
  "test đã pass". Nó chỉ quan tâm: chạy lại trong **môi trường sạch**, theo
  **đúng bộ lệnh đã quy định**, code có thực sự pass không
- **Cánh cổng kiểm tra:** tất cả pass → cho qua; một bước fail → khóa pipeline,
  các bước sau bị hủy
- Phép ẩn dụ "sinh viên nộp bài" (dùng để giải thích, rất dễ thấm):
  - Tự chấm bài = AI tự chạy test
  - Nhờ bạn xem hộ = code review
  - **Hệ thống chấm độc lập = CI** — cùng một bộ tiêu chí cho tất cả mọi người

> **Chốt:** CI là môi trường kiểm tra độc lập với máy của developer.

---

## 2. Công cụ CI và các tác vụ CI thường dùng · 17 phút

**Nền tảng CI:** GitHub Actions (dùng cho demo) · GitLab CI/CD · Jenkins ·
CircleCI · Bitbucket Pipelines · Azure DevOps
→ Khác nhau ở cú pháp và nơi chạy, giống nhau ở tư tưởng: *trigger → job → step → gate*

**6 tác vụ CI chuẩn của một project web:**

| # | Tác vụ | Lệnh ví dụ | Bắt được lỗi gì |
| --- | --- | --- | --- |
| 1 | Cài dependency | `npm ci` | Thiếu package, lệch lockfile |
| 2 | Lint & format | `eslint .` | Sai code style, cú pháp rác |
| 3 | Type check | `tsc --noEmit` | Sai kiểu dữ liệu |
| 4 | Unit test | `npm test` | Sai logic từng hàm/component |
| 5 | Integration / E2E test | `playwright test` | Sai tương tác giữa các thành phần |
| 6 | Build | `npm run build` | Lỗi chỉ lộ ra khi đóng gói production |

**Bộ công cụ cho từng loại kiểm tra** (chỉ giới thiệu, lướt nhanh):

| Nhóm | Công cụ tiêu biểu |
| --- | --- |
| **Test** | Vitest / Jest (unit) · Playwright / Cypress (E2E) · k6 (load) · Codecov (coverage) |
| **Lint & Format** | ESLint · Prettier · Biome · Stylelint · Hadolint (Dockerfile) · ShellCheck · actionlint |
| **Static analysis** | TypeScript `tsc` · PHPStan · mypy · SonarQube |
| **Security — dependency (SCA)** | `npm audit` · Dependabot · Renovate · Snyk · Trivy |
| **Security — mã nguồn (SAST)** | Semgrep · CodeQL · SonarQube |
| **Security — image & hạ tầng** | Trivy · Grype · Docker Scout · Checkov · tfsec |
| **Secret scan** | Gitleaks · TruffleHog · detect-secrets · GitHub Push Protection |
| **Hook & cổng chất lượng** | Husky + lint-staged · pre-commit · Danger · SonarQube |

**Lộ trình bật dần:** ESLint + Prettier + type check + build (làm ngay được)
→ unit test + Gitleaks → Dependabot + Trivy + E2E → SAST + quality gate

**Chạy ở đâu:** pre-commit (lint, format, secret scan) → PR (type check, unit test,
build, SCA) → merge main (E2E, container scan, SAST) → theo lịch (load test, DAST)

> **Chốt 1:** `npm ci` chứ không phải `npm install` — CI phải dựng lại từ lockfile,
> không được dùng cache sẵn có trên máy.
>
> **Chốt 2:** Secret scan phải nằm ở tầng sớm nhất — đã push lên remote thì coi
> như khóa đã lộ, xóa commit cũng không cứu được.

---

## 3. Cách deploy trước khi có khái niệm CD · 9 phút

Cho audience thấy "thời kỳ đồ đá" để hiểu CD giải quyết cái gì.

```text
SSH vào server → git pull → npm install → npm run build
→ docker build → docker stop → docker run → mở web check bằng mắt
```

**Những câu hỏi không ai trả lời được:**

- Ai deploy? Deploy lúc nào?
- Server đang chạy đúng version nào?
- Code này đã test chưa, ai xác nhận?
- Deploy lỗi giữa chừng thì rollback ra sao?
- Ba người cùng deploy một lúc thì chuyện gì xảy ra?
- Người deploy nghỉ phép thì ai làm?

> **Chốt:** Deploy thủ công không sai về kỹ thuật — nó sai ở chỗ **không lặp lại
> được và không kiểm soát được**.

---

## 4. CD là gì? · 7 phút

- Sau khi code vượt qua các bước kiểm tra, cần đưa phiên bản mới đến môi trường
  triển khai — **một cách nhất quán và lặp lại được**
- CI tạo ra **artifact đã được kiểm định**; CD chịu trách nhiệm **đưa đúng
  artifact đó** đến đúng nơi
- Deploy không còn là "code chạy trên máy mình rồi, copy lên server thử xem"
- Quy trình CD điển hình:

```text
Merge PR → Build Docker image → Push registry → Deploy staging
→ Smoke test → Release production (zero-downtime)
```

> **Chốt:** CI trả lời *"code này có đạt chuẩn không?"*.
> CD trả lời *"làm sao đưa nó ra thật một cách an toàn và lặp lại được?"*

---

## 5. Có bao nhiêu loại CD? · 7 phút

| | Continuous **Delivery** | Continuous **Deployment** |
| --- | --- | --- |
| Luồng | Commit → Auto Test → **Duyệt thủ công** → Production | Commit → Auto Test → **Tự động deploy** → Production |
| Con người | Cần người bấm nút release | Không cần, pass test là lên thẳng |
| Nhãn | `Manual Release` | `Auto Release` |
| Hợp với | Hệ thống tài chính, y tế, có ràng buộc tuân thủ; team mới bắt đầu | Sản phẩm web/SaaS, test đủ mạnh, có feature flag & rollback nhanh |

- Cả hai đều **bắt buộc** phải có CI phía trước
- Chọn loại nào **tùy vào cách tổ chức và mức độ trưởng thành của bộ test**, không
  phải cái nào "xịn hơn"
- Thực tế phổ biến: Continuous Deployment cho `staging`, Continuous Delivery cho
  `production`

> **Chốt:** Khác biệt duy nhất nằm ở chỗ **có một con người bấm nút hay không**.

---

## 6. Demo · 25 phút

**Demo 1 — Dùng AI viết CI (6 phút)**
Prompt AI sinh workflow GitHub Actions → chạy thật → và quan trọng hơn:
**review lại** cái AI vừa viết (thiếu cache? thiếu lint? sai Node version? lộ secret?)
→ *AI viết được ≠ AI viết đúng*

**Demo 2 — Dùng AI viết CD (6 phút)**
Build Docker image → push Docker Hub → SSH vào EC2 → pull → stop → run
→ chỉ rõ ranh giới: chỗ nào là CI, chỗ nào là CD

**Demo 3 — Full flow `git push` → Production (7 phút)**
Sửa một dòng chữ → commit → push → xem Actions chạy → mở `http://EC2-IP` thấy đổi
→ khoảnh khắc "wow" của cả buổi

**Demo 4 — Tái hiện đúng câu chuyện mở đầu (6 phút)** ← *quan trọng nhất*
Cố tình để local pass nhưng CI fail (lệch Node version hoặc package chưa commit)
→ pipeline chặn lại → copy log cho AI phân tích → AI đề xuất fix → **developer
review** → push lại → pipeline xanh

> **Chốt:** Vòng lặp AI viết → CI chặn → AI sửa → người duyệt → CI xác nhận.

---

## 7. Các issues có thể phát sinh khi deploy · 12 phút

### Nhóm A — Lệch môi trường (nguyên nhân phổ biến nhất)

| Yếu tố | Máy local | CI / Production |
| --- | --- | --- |
| Node.js | `v20.11.0` | `v18.17.0` (runner) |
| Package | Cài sẵn trong dev cache | Dựng lại từ lockfile nghiêm ngặt |
| Env variable | `.env.local` riêng | Secrets thật của CI |
| Phạm vi test | Test 1 module/file | Quét toàn bộ project |

### Nhóm B — Những thứ ẩn trên máy dev

- File cấu hình **chưa commit** hoặc chưa push
- **Cache cũ** (`.cache`, `build/`, `node_modules`) che giấu lỗi thật
- Command AI chạy **không giống** command pipeline dùng
- **Monorepo:** một package check riêng thì pass, nhưng check toàn bộ
  dependency graph mới lòi ra lỗi cross-package

### Nhóm C — Sự cố lúc deploy

- Build fail ngay trên production runner
- Deploy nửa chừng, container cũ đã stop mà container mới không lên → downtime
- Deploy xong mới phát hiện lỗi, không có đường lùi
- Không biết server đang chạy version nào

> **Chốt:** **"Trên máy em chạy được"** là một ngụy biện.
> Local green ≠ Production green.

---

## 8. Cách khắc phục các issues đó trước khi deploy · 10 phút

| Vấn đề | Cách xử lý |
| --- | --- |
| Lệch phiên bản runtime | Ghim version trong workflow (`setup-node@v4`), dùng Docker image cố định |
| Lệch dependency | `npm ci --frozen-lockfile`, luôn commit lockfile |
| Cache ẩn / máy bẩn | Chạy trong **container sạch**: `docker run --rm node:20-alpine` |
| File chưa commit | CI checkout từ repo — file thiếu là fail ngay, không thể lọt |
| Lệch command | Định nghĩa script chuẩn trong `package.json`, **dev và CI dùng chung một bộ lệnh** |
| Lỗi monorepo | Type check / test trên **toàn bộ workspace**, không chỉ package đang sửa |
| Bug lọt xuống production | Deploy staging + smoke test trước, rồi mới release |
| Deploy hỏng | Giữ image cũ theo tag version → rollback bằng cách deploy lại tag trước |
| Không biết trạng thái thật | Health check sau deploy + monitoring + log tập trung |

**Nguyên tắc gốc:** dựng một quy trình mà **cả developer lẫn AI đều phải đi qua** —
cùng một môi trường sạch, cùng một bộ lệnh, cùng một tiêu chuẩn.

### Nói thật một điều: CI/CD không phải viên đạn bạc

- Viết test sai → pipeline vẫn xanh
- Business rule chưa có test → CI không tự biết
- Chưa cấu hình security scan → lỗ hổng vẫn lọt

> **CI chỉ mạnh bằng đúng những tiêu chuẩn mà chúng ta đặt vào nó.**

Vì vậy nhiệm vụ của Software Engineer vẫn là quyết định: điều gì cần kiểm tra,
test nào cần tồn tại, coverage bao nhiêu là đủ, security check nào phải chạy,
khi nào được merge, khi nào được deploy, và khi có sự cố thì xử lý ra sao.

---

## Kết luận · 4 phút

**Vòng đời hoàn chỉnh trong thời đại AI:**

```text
AI Agent  →  Git  →  CI  →  CD  →  Monitoring
 tăng tốc    lưu vết  xác minh  triển khai   theo dõi
                                                 │
                  └──────────  quay lại  ────────┘
```

- AI đã giải quyết phần lớn bài toán **tốc độ viết code**
- Bài toán còn lại, và ngày càng lớn hơn, là **kiểm soát chất lượng của lượng
  code được tạo ra với tốc độ đó**
- Nếu AI Agent là một developer code cực nhanh, thì CI/CD chính là **dây chuyền
  kiểm định chất lượng mà ngay cả AI cũng phải đi qua**

> AI có thể nói "code đã ổn".
> Developer cũng có thể nghĩ "chắc là ổn".
> Nhưng cuối cùng — **hãy để pipeline trả lời.**

**Q&A · 10 phút**
