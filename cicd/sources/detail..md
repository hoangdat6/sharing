# CI/CD trong thời đại AI — Nội dung chi tiết

**Thời lượng:** 1h45 – 2h
**Audience:** Developer — Backend / Frontend / Fullstack
**Stack demo:** GitHub → GitHub Actions → Docker → Docker Hub → EC2
**AI:** Claude Code / ChatGPT / Gemini
**Bám theo:** `summary.md` (8 mục) · Nguyên liệu: `video-fb-extracted.md`

---

## Mạch của cả buổi

```text
              Câu chuyện thật: local xanh, CI đỏ
                            │
                            ▼
                     "Tại sao lại thế?"
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
        CI là gì                    Trước khi có CD
     (cổng kiểm tra)              (deploy bằng tay)
            │                               │
            └───────────────┬───────────────┘
                            ▼
                          CD là gì
                     (2 loại: Delivery / Deployment)
                            │
                            ▼
                          DEMO
              git push → test → build → deploy
                            │
                            ▼
              Deploy hỏng vì những gì?
                            │
                            ▼
                  Chặn chúng lại thế nào?
                            │
                            ▼
              "Hãy để pipeline trả lời"
```

Nguyên tắc trình bày xuyên suốt: **hiện tượng trước, khái niệm sau**. Người nghe
phải thấy vấn đề đã, rồi mới nhận tên gọi của giải pháp.

---



# 0. Mở đầu — Một tình huống có thật · 8 phút

Đừng bắt đầu bằng *"CI/CD là viết tắt của..."*. Bắt đầu bằng một buổi chiều
code bình thường.

### Bối cảnh

Đang vibe coding một website, dùng Claude Code hỗ trợ. Xong một phần tính năng,
yêu cầu AI tự kiểm tra lại.

### Bước 1 — AI tự chạy type check

```text
vibe-app$ npm run typecheck
> tsc --noEmit --skipLibCheck
[14:42:01] Scanning TypeScript files...
✓ Verified 58 modules in /src
✓ 0 errors found. Type Check passed!
  Done in 1.24s
```



### Bước 2 — AI tự chạy unit test

```text
$ npm run test:unit
PASS  src/auth/login.test.ts            142ms
PASS  src/utils/validator.test.ts        88ms
PASS  src/services/api.test.ts          310ms
PASS  src/components/Button.test.ts      65ms

Test Suites:  4 passed, 4 total
Tests:       18 passed, 18 total
Time:        0.605s
```

> **Hỏi audience:** "Đến đây, anh em thấy đủ tự tin để push chưa?"

Gần như cả phòng sẽ gật đầu. Đó chính là cái bẫy.

### Bước 3 — Push

```text
→ git status
  On branch main. Working tree clean.
→ git push origin main
  To github.com:repo/vibe-coding.git
```



### Bước 4 — Và CI chạy lại đúng những bước đó

```text
GitHub Actions CI #108 · main                          ● THẤT BẠI

1. Cài đặt Dependency      npm ci --prefer-offline      ✓ 1.2s Pass
2. Kiểm tra Lint & Format  eslint . --ext .ts,.tsx      ✓ 3.4s Pass
3. Kiểm tra Type Check     tsc --noEmit                 ✗ LỖI (FAIL)
4. Chạy Unit Test          vitest run                   — Đã hủy
5. Build Production Bundle vite build                   — Đã hủy
```

```text
[ERROR] Phát hiện 1 lỗi Type Check khi build runner
src/services/user.ts:34:18
TS2322: Type 'string' is not assignable to type 'number'.
34 | const userId: number = params.id;
```

Sửa xong type check, push lại → đến lượt **unit test có test case không pass**.

### Câu hỏi treo cho cả buổi

> **"Cùng một bộ lệnh. Cùng một repository. Tại sao local xanh mà CI lại đỏ?"**

Đừng trả lời ngay. Để nguyên câu hỏi đó trên màn hình và đi tiếp.

### Message

```text
Claude Code (AI Agent)                     [CHƯA KIỂM CHỨNG]
"Code đã Type Check pass & Unit Test pass rồi!"
```

> **Đừng chỉ tin lời AI. Hãy để hệ thống kiểm chứng.**

---



# 1. CI là gì? · 10 phút

Bây giờ mới đặt tên cho thứ vừa chặn chúng ta lại.

### Định nghĩa

> **Continuous Integration** — mỗi khi code được thay đổi và đưa lên repository,
> một quy trình tự động sẽ chạy lại toàn bộ các bước kiểm tra đã cấu hình.



### Điểm mấu chốt

```text
CI không quan tâm developer nói  "code chạy được rồi"
CI không quan tâm AI nói         "test đã pass rồi"

CI chỉ quan tâm đúng một điều:

   Khi chạy lại toàn bộ quy trình
   trong một môi trường sạch
   theo đúng bộ lệnh đã quy định
   → code có thực sự pass hay không?
```



### Cánh cổng kiểm tra

```text
        01. npm run lint              ✓ PASS
        02. npm run typecheck         ✓ PASS
        03. npm run test:unit         ✓ PASS
        04. npm run test:integration  ✗ FAIL (1 error)
                        │
        ════════════════╪════════════════
                        ▼
            PIPELINE DỪNG: CỔNG ĐÃ KHÓA
```

Quy tắc: **tất cả pass → được cho qua. Một bước fail → khóa pipeline**, các bước
phía sau bị hủy luôn (không tốn thời gian chạy tiếp).

### Phép ẩn dụ nên dùng — "sinh viên nộp bài"

Đây là cách giải thích dễ thấm nhất, kể cả với người không code:

```text
Mình làm xong bài  →  mình tự kiểm tra, thấy đúng
                              │  ← AI tự chạy test
                              ▼
       nhờ một người bạn xem hộ, bạn bảo "ổn rồi"
                              │  ← code review
                              ▼
        nhưng bài vẫn phải qua HỆ THỐNG CHẤM ĐỘC LẬP
                              │  ← CI
                              ▼
          cùng một bộ tiêu chí cho tất cả mọi người
              sai thì báo sai · đúng thì pass
```

> **Tự chấm không thay được hệ thống chấm.**
> Không phải vì mình dốt, mà vì mình chấm bằng đúng cái đầu đã làm ra bài.



### Message

> **CI tạo ra một môi trường kiểm tra độc lập với máy của developer.**

---



# 2. Công cụ CI và các tác vụ CI thường dùng · 17 phút



## 2.1 Công cụ


| Công cụ             | Ghi chú                                                                      |
| ------------------- | ---------------------------------------------------------------------------- |
| **GitHub Actions**  | Dùng trong demo hôm nay. Gắn liền repo, file YAML trong `.github/workflows/` |
| GitLab CI/CD        | `.gitlab-ci.yml`, mạnh về self-hosted runner                                 |
| Jenkins             | Lâu đời, linh hoạt, tự quản hạ tầng                                          |
| CircleCI / Travis   | SaaS, cấu hình gọn                                                           |
| Bitbucket Pipelines | Hợp hệ sinh thái Atlassian                                                   |
| Azure DevOps        | Hợp môi trường doanh nghiệp Microsoft                                        |


> **Nói rõ với audience:** đừng sa đà so sánh công cụ. Chúng khác nhau ở cú pháp
> và nơi chạy, nhưng **giống hệt nhau ở tư tưởng**:

```text
trigger  →  job  →  step  →  gate
(sự kiện)  (máy)  (lệnh)  (quyết định cho qua hay chặn)
```

Học hiểu một cái, chuyển sang cái khác chỉ là đổi cú pháp.

## 2.2 Sáu tác vụ CI chuẩn

Đây là bộ khung mà hầu hết project web đều dùng:

```text
01  Cài Dependency         npm ci               Môi trường sạch từ lockfile
                  ↓
02  Kiểm tra Format & Lint eslint .             Chuẩn code style & cú pháp
                  ↓
03  Chạy Type Check        tsc --noEmit         Xác minh kiểu dữ liệu
                  ↓
04  Chạy Unit Test         npm test             Logic từng hàm & component
                  ↓
05  Chạy Integration Test  playwright test      Tương tác giữa các dịch vụ
                  ↓
06  Build Project          npm run build        Đóng gói sẵn sàng triển khai
                  ↓
        TẤT CẢ PASS → PULL REQUEST ĐỦ ĐIỀU KIỆN MERGE
```

Với mỗi bước, nói rõ **nó bắt được loại lỗi nào**:


| Bước             | Bắt được lỗi gì                                                      |
| ---------------- | -------------------------------------------------------------------- |
| Cài dependency   | Thiếu package, lockfile lệch, package chỉ có trên máy local          |
| Lint & format    | Code style lộn xộn, biến thừa, import chết                           |
| Type check       | Sai kiểu dữ liệu — loại lỗi AI hay tạo ra nhất                       |
| Unit test        | Sai logic bên trong một hàm                                          |
| Integration test | Từng phần đúng nhưng ghép lại thì sai                                |
| Build            | Lỗi chỉ lộ ra khi bundle production (tree-shaking, env, import vòng) |




### Nhấn mạnh một chi tiết nhỏ mà quan trọng

```text
npm install   ← dùng ở máy dev, có thể tự nâng version phụ
npm ci        ← dùng trong CI, dựng lại ĐÚNG theo lockfile, xóa sạch node_modules
```

> Rất nhiều ca "local pass, CI fail" chết đúng ở dòng này.



## 2.3 Bộ công cụ cho từng loại kiểm tra

> **Cách trình bày phần này:** lướt nhanh, chỉ để anh em biết trên thị trường có
> những gì và mỗi nhóm giải quyết vấn đề nào. Không đi vào cấu hình từng công cụ —
> ai cần thì tra sau. Mục tiêu là ra khỏi phòng này biết được *"à, muốn quét
> secret thì có Gitleaks"*, thế là đủ.

### A. Test — kiểm tra code chạy có đúng không

| Loại | Công cụ | Ghi chú |
| --- | --- | --- |
| **Unit test (JS/TS)** | **Vitest**, Jest, Mocha | Vitest nhanh, hợp project dùng Vite. Jest phổ biến nhất |
| **E2E / Integration** | **Playwright**, Cypress, Selenium | Playwright đang là lựa chọn mặc định cho project mới |
| **API test** | Postman + Newman, REST Assured, Supertest | Newman cho phép chạy collection Postman ngay trong CI |
| **Load test** | k6, JMeter, Locust | Thường chạy theo lịch, không chạy mỗi PR |
| **Coverage** | Istanbul / nyc, Codecov, Coveralls | Đo % code được test, đặt được ngưỡng tối thiểu |

**Ngôn ngữ khác:** PHP → PHPUnit / Pest · Python → pytest · Java → JUnit ·
Go → `go test` · .NET → xUnit · Ruby → RSpec

### B. Lint & Format — kiểm tra code viết có sạch không

| Loại | Công cụ |
| --- | --- |
| **Lint JS/TS** | **ESLint** (chuẩn de-facto), Biome, Oxlint (nhanh hơn nhiều) |
| **Format** | **Prettier**, Biome |
| **Type check** | **TypeScript** (`tsc --noEmit`) |
| **CSS** | Stylelint |
| **Dockerfile** | **Hadolint** — bắt các anti-pattern khi viết Dockerfile |
| **Shell script** | ShellCheck |
| **YAML** | yamllint · **actionlint** (chuyên lint file GitHub Actions) |
| **Commit message** | commitlint — ép theo chuẩn Conventional Commits |
| **Chạy nhiều linter cùng lúc** | Super-Linter (GitHub), pre-commit framework |

**Ngôn ngữ khác:** PHP → PHP_CodeSniffer, PHP-CS-Fixer, PHPStan, Psalm ·
Python → Ruff, Black, mypy · Go → golangci-lint · Java → Checkstyle, SpotBugs, PMD

> Lưu ý: **PHPStan, Psalm, mypy** không chỉ là lint — chúng là static analysis,
> bắt lỗi logic tương tự vai trò của `tsc` bên TypeScript.

### C. Security scan — tìm lỗ hổng

Chia làm bốn hướng quét khác nhau, đừng nhầm lẫn giữa chúng:

| Hướng quét | Quét cái gì | Công cụ |
| --- | --- | --- |
| **SCA** — dependency | Thư viện bên thứ ba có CVE đã biết không | `npm audit`, **Dependabot**, Renovate, Snyk, OWASP Dependency-Check, Trivy |
| **SAST** — mã nguồn | Chính code mình viết có lỗ hổng không (SQL injection, XSS…) | **Semgrep**, **CodeQL** (miễn phí cho repo public), SonarQube, Snyk Code |
| **Container image** | Image Docker có package hệ điều hành dính lỗ hổng không | **Trivy**, Grype, Docker Scout |
| **IaC** | File Terraform / K8s có cấu hình mất an toàn không | Checkov, tfsec, KICS |

Ngoài ra có **DAST** (OWASP ZAP) quét ứng dụng khi đang chạy thật — nặng, thường
chạy theo lịch chứ không chạy mỗi PR.

> **Điểm nên nhấn:** Dependabot và Renovate không chỉ báo lỗ hổng, chúng **tự mở
> pull request nâng version**. Kết hợp với CI, cái PR đó sẽ tự được test — rất
> hợp với tinh thần buổi hôm nay.

### D. Secret scan — chặn lộ khóa bí mật

Nhóm này ít người để ý nhưng hậu quả thì nặng nhất: API key, database password,
private key lỡ commit vào repo. Kể cả xóa đi rồi thì **nó vẫn nằm trong lịch sử git**.

| Công cụ | Ghi chú |
| --- | --- |
| **Gitleaks** | Nhẹ, dễ gắn vào GitHub Actions, quét được cả lịch sử commit |
| **TruffleHog** | Mạnh hơn, còn thử **xác minh key đó có còn sống không** |
| **detect-secrets** (Yelp) | Có cơ chế baseline, hợp repo cũ đã trót lẫn nhiều thứ |
| **git-secrets** (AWS) | Chuyên bắt AWS credentials |
| **GitHub Secret Scanning** | Có sẵn, bật **Push Protection** là chặn ngay lúc push |

> **Nguyên tắc:** quét ở hai tầng — pre-commit hook chặn tại máy dev, CI quét lại
> lần nữa để không ai bỏ qua được bằng `--no-verify`.

### E. Tổng hợp và cổng chất lượng

| Công cụ | Vai trò |
| --- | --- |
| **SonarQube / SonarCloud** | Gộp coverage + bug + code smell + security thành một quality gate |
| **Husky + lint-staged** | Chạy lint/format tự động trước khi commit, chỉ trên file vừa sửa |
| **pre-commit** | Framework quản lý hook, dùng được cho mọi ngôn ngữ |
| **Danger** | Đặt luật cho pull request (bắt buộc có mô tả, giới hạn số file thay đổi…) |

## 2.4 Vậy nên bắt đầu từ đâu?

Đừng bật hết một lúc — pipeline sẽ chạy 20 phút và cả team sẽ ghét nó.

```text
BƯỚC 1 — Tối thiểu, làm ngay được trong buổi chiều
   ESLint  +  Prettier  +  tsc --noEmit  +  npm run build
   → chưa cần viết một dòng test nào mà đã chặn được rất nhiều lỗi

BƯỚC 2 — Khi đã có test
   +  Vitest / Jest        (unit test)
   +  Gitleaks             (secret scan — rẻ, nhanh, đáng giá nhất trong nhóm)

BƯỚC 3 — Khi project lên production thật
   +  Dependabot           (tự động vá thư viện)
   +  Trivy                (quét Docker image)
   +  Playwright           (E2E cho luồng quan trọng)

BƯỚC 4 — Khi team đã lớn
   +  Semgrep / CodeQL     (SAST)
   +  SonarQube            (quality gate tập trung)
   +  Coverage threshold
```

### Chạy ở đâu cho hợp lý

```text
PRE-COMMIT (máy dev, vài giây)     lint · format · secret scan
        ↓
PULL REQUEST (CI, vài phút)        + type check · unit test · build · SCA
        ↓
MERGE VÀO MAIN                     + integration/E2E · container scan · SAST
        ↓
THEO LỊCH (hằng đêm/tuần)          + load test · DAST · full dependency audit
```

> **Nguyên tắc:** cái gì nhanh thì đẩy về càng gần developer càng tốt;
> cái gì chậm thì đẩy về sau. Nhưng **secret scan luôn phải ở tầng sớm nhất**,
> vì một khi đã push lên remote thì coi như khóa đã lộ.

---



# 3. Cách deploy trước khi có khái niệm CD · 9 phút

Muốn hiểu CD giải quyết cái gì, phải thấy lại thời chưa có nó.

### Sau `git push` thì chuyện gì xảy ra?

```text
Code  →  git add  →  git commit  →  git push  →  ... rồi sao nữa?
```

Câu trả lời của rất nhiều team, cho tới tận bây giờ:

```text
SSH vào server
        ↓
git pull
        ↓
npm install / composer install
        ↓
npm run build
        ↓
docker build
        ↓
docker stop <container cũ>
        ↓
docker run <container mới>
        ↓
mở trình duyệt, F5, nhìn bằng mắt xem có chạy không
```



### Và khi nhiều người cùng làm

```text
Developer A ─┐
Developer B ─┼──►  Server
Developer C ─┘
```



### Những câu hỏi không ai trả lời được

- **Ai** deploy? Deploy **lúc nào**?
- Server đang chạy **version nào**?
- Code này **đã test chưa**, ai xác nhận?
- Build fail giữa chừng thì sao? Container cũ đã stop rồi đấy.
- **Rollback** thế nào? Có ai giữ bản cũ không?
- Ba người deploy cùng lúc thì chuyện gì xảy ra?
- Người duy nhất biết cách deploy **nghỉ phép** thì ai làm?
- Developer có phải **ngồi chờ** deploy xong mới được về không?



### Message

> Deploy thủ công không sai về mặt kỹ thuật.
> Nó sai ở chỗ **không lặp lại được** và **không kiểm soát được**.
> Mỗi lần deploy là một lần làm lại từ đầu bằng trí nhớ.



### Câu hỏi chuyển tiếp

> **"Có cách nào để developer chỉ cần** `git push`**, còn lại tự động xảy ra không?"**

---



# 4. CD là gì? · 7 phút



### Định nghĩa

> **Continuous Delivery / Deployment** — sau khi code đã vượt qua các bước kiểm
> tra, tự động đưa phiên bản đó đến môi trường triển khai theo một quy trình
> **nhất quán và lặp lại được**.



### Ranh giới CI ↔ CD

Quay lại đúng pipeline đã dựng ở phần 2 và vẽ một đường cắt ngang:

```text
        git push
            ↓
    ┌───────────────────┐
    │  Checkout         │
    │  Install          │
    │  Lint             │   ◄── CI
    │  Type check       │       "code này có đạt chuẩn không?"
    │  Test             │
    │  Build            │
    │  Tạo artifact     │
    └─────────┬─────────┘
              │   artifact đã được kiểm định
    ┌─────────▼─────────┐
    │  Lấy artifact     │
    │  Deploy           │   ◄── CD
    │  Restart          │       "đưa nó ra thật thế nào cho an toàn?"
    │  Health check     │
    └───────────────────┘
```

> **CI tạo ra artifact. CD lấy đúng artifact đó và đưa nó đến nơi chạy.**
>
> Chú ý chữ **đúng artifact đó** — không build lại, không sửa gì thêm. Thứ được
> test chính xác là thứ được deploy.



### Một quy trình CD thực tế

```text
01  Hợp Nhất Code & Kiểm Tra CI    Đã merge PR · CI pass         ✓
02  Build Docker Image             docker build -t app:v2.4.0 .  ✓
03  Push Container Registry        registry.internal/app:v2.4.0  ✓
04  Deploy Môi Trường Staging      kubectl apply -f staging/     ✓
05  Kiểm Tra Smoke Test Tự Động    Xác minh Integration & E2E    ✓
06  Release Đến Production         Zero-downtime                 ✓
```



### Message

> Deploy không còn là *"code chạy trên máy mình rồi, copy lên server thử xem"*,
> mà trở thành **một quy trình có thể lặp lại và kiểm soát được**.

---



# 5. Có bao nhiêu loại CD? · 7 phút

Hai trường phái, khác nhau đúng **một bước**.

### 5.1 Continuous Delivery — Chuyển giao liên tục

```text
Commit Code  →  Auto Test  →  [ DUYỆT THỦ CÔNG ]  →  Production
                                     ▲
                              con người bấm nút
```

Mọi thứ tự động cho tới sát cửa production. Bản build **luôn sẵn sàng** để release,
nhưng cần một người xác nhận. Nhãn: `Manual Release`.

### 5.2 Continuous Deployment — Triển khai liên tục

```text
Commit Code  →  Auto Test  →  [ TỰ ĐỘNG DEPLOY ]  →  Production
                                     ▲
                            không có con người
```

Pass test là lên thẳng production, 100% tự động. Nhãn: `Auto Release`.

### 5.3 So sánh


|                                   | Continuous **Delivery**                                           | Continuous **Deployment**                |
| --------------------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| Bước cuối                         | Người bấm nút                                                     | Tự động                                  |
| Rủi ro mỗi lần release            | Thấp hơn                                                          | Cao hơn                                  |
| Yêu cầu về bộ test                | Vừa phải                                                          | **Rất cao**                              |
| Cần feature flag / rollback nhanh | Nên có                                                            | **Bắt buộc**                             |
| Hợp với                           | Tài chính, y tế, hệ thống có ràng buộc tuân thủ; team mới bắt đầu | SaaS, sản phẩm web, team đã trưởng thành |




### 5.4 Ba điều cần nói rõ

1. **Cả hai đều bắt buộc phải có CI phía trước.** Không có CI thì CD chỉ là
  "deploy tự động một thứ chưa ai kiểm tra" — nhanh hơn để hỏng.
2. **Không có cái nào xịn hơn cái nào.** Lựa chọn tùy vào cách tổ chức và mức độ
  trưởng thành của bộ test.
3. **Thực tế hay dùng lai:** Continuous Deployment cho `staging`,
  Continuous Delivery cho `production`.

```text
merge vào develop  →  tự động lên staging      (Deployment)
merge vào main     →  chờ duyệt → production   (Delivery)
```

> **Chốt:** Khác biệt duy nhất là **có một con người bấm nút hay không**.

---



# 6. Demo · 25 phút

Bốn demo, tăng dần độ khó, kết lại đúng câu chuyện mở đầu.

## Demo 1 — Dùng AI viết CI · 6 phút

Project mẫu:

```text
demo-app/
├── src/
├── test/
├── package.json
└── Dockerfile
```

**Prompt:**

> "Create a GitHub Actions CI pipeline for this Node.js application. It should
> install dependencies, run lint, type check, tests, and build the application
> whenever code is pushed to main or a pull request is opened."

AI sinh ra:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```



### Nhưng dừng lại ở đây là hỏng

Đây là phần có giá trị nhất của demo 1. Cùng audience soi lại cái AI vừa viết:

```text
□  Có cache dependency chưa?          → chậm gấp 3 lần nếu thiếu
□  Node version có khớp production?   → nguồn gốc của rất nhiều ca CI fail
□  Có chạy lint / type check chưa?    → AI hay bỏ qua nếu không yêu cầu rõ
□  Có bước security scan chưa?
□  Có secret nào bị hardcode không?
□  Có chạy cho pull_request không, hay chỉ push main?
```

> **Message:** **AI viết được ≠ AI viết đúng.**
> AI viết cái *chạy được*, không phải cái *đúng với hệ thống của bạn*.



## Demo 2 — Dùng AI viết CD · 6 phút

Context đưa cho AI:

```text
Docker image  →  Docker Hub  →  EC2
```

**Prompt:**

> "Create a GitHub Actions deployment workflow that builds a Docker image, tags it
> with the commit SHA, pushes it to Docker Hub, then SSHs into an EC2 server,
> pulls the image, stops the old container and starts the new one."

Kết quả:

```text
Build image  →  Docker login  →  Docker push
                                      ↓
                                  SSH EC2
                                      ↓
                    docker pull → docker stop → docker rm → docker run
```

**Trong lúc chạy, chỉ tay lên màn hình và nói rõ ranh giới:**

```text
đến chỗ "tạo image + push registry"   ← đây vẫn là CI (tạo artifact)
từ chỗ "SSH vào EC2" trở đi           ← đây mới là CD (đưa artifact ra)
```

**Điểm cần soi:** tag image bằng `latest` hay bằng commit SHA?

> Nếu tag `latest`, bạn sẽ **không bao giờ rollback được**, vì không còn biết
> "bản trước" là bản nào.



## Demo 3 — Full flow `git push` → Production · 7 phút

Đây là khoảnh khắc "wow". Sửa đúng một dòng:

```diff
- Hello World
+ Hello from AI-powered CI/CD
```

```bash
git add .
git commit -m "update landing message"
git push
```

Chuyển sang tab GitHub Actions, để cả phòng nhìn nó chạy:

```text
Push
 ↓
CI ── Install ── Lint ── Type check ── Test ── Build
 ↓
Docker Build  →  Docker Hub
 ↓
CD ── SSH EC2 ── docker pull ── docker restart ── health check
```

Mở `http://EC2-IP`:

```text
Hello from AI-powered CI/CD
```

> **Một lần** `git push` **→ code tự test → tự build → tự đóng gói → tự deploy.**
> Không ai SSH. Không ai nhớ thứ tự lệnh. Không ai phải ngồi chờ.



## Demo 4 — Tái hiện đúng câu chuyện mở đầu · 6 phút

**Đây là demo quan trọng nhất của cả buổi** — nó đóng lại câu hỏi treo từ phút thứ 5.

### Dựng tình huống

Chọn một trong hai cách tạo sai lệch (cách 1 dễ diễn hơn):

```text
Cách 1 — Lệch Node version
   Máy local:  Node 20     → cú pháp mới chạy ngon
   CI runner:  Node 18     → fail

Cách 2 — Package chưa commit
   Cài package ở local nhưng không commit package.json
   → local có, CI không có
```



### Diễn tiến

```text
Local:  npm run typecheck   ✓ PASS
        npm test            ✓ PASS
                ↓
        git push
                ↓
CI:     ✗ FAILED
```



### Đưa log cho AI

> "This GitHub Actions job failed. Analyze the logs, identify the root cause and
> suggest the minimal change needed to fix it."

AI phân tích → chỉ ra lệch version → đề xuất ghim `node-version` trong workflow.

### Nhưng chưa merge vội

```text
1  AI viết code & push
2  CI kiểm tra tự động          ← cổng chặn
3  AI phân tích log lỗi
4  ►  DEVELOPER REVIEW  ◄       ← bước này KHÔNG được bỏ
5  AI sửa code
6  Pipeline chạy lại  →  xanh
```



### Message

> AI không tự sửa production. AI **rút ngắn vòng debug**.
> Cổng quyết định vẫn là CI, không phải AI.

---



# 7. Các issues có thể phát sinh khi deploy · 12 phút

Bây giờ mới trả lời dứt điểm câu hỏi treo: **tại sao local xanh mà CI/production đỏ?**

## 7.1 Nhóm A — Lệch môi trường


| Yếu tố           | Máy Local               | CI Server / Production           |
| ---------------- | ----------------------- | -------------------------------- |
| **Node.js**      | `v20.11.0`              | `v18.17.0` (runner)              |
| **Package**      | Cài sẵn trong dev cache | Dựng lại từ lockfile nghiêm ngặt |
| **Env variable** | File `.env.local` riêng | Secrets thật của hệ thống        |
| **Phạm vi test** | Test 1 module / 1 file  | Quét toàn bộ project             |


> Ba dòng đầu là chuyện hạ tầng. **Dòng cuối cùng mới là dòng đáng sợ nhất** —
> AI thường chỉ chạy test trong đúng phạm vi nó vừa sửa, không chạy cả project.



## 7.2 Nhóm B — Những thứ ẩn trên máy dev

```text
Dependency khác biên   node_modules      Package cài sẵn hoặc lệch minor version
File cấu hình riêng    uncommitted       Chưa commit hoặc chưa push lên repo
Cache ẩn cũ            .cache / build    Dữ liệu build/test cũ che giấu lỗi thật
Biến môi trường        PROCESS.ENV       .env.local khác với env của pipeline
Lệch command           —                 Lệnh AI chạy ≠ lệnh pipeline dùng
```

> **Local green không đồng nghĩa với Production green.**



## 7.3 Trường hợp đặc biệt — Monorepo

Nếu team dùng monorepo, xác suất dính lỗi này cao hơn hẳn:

```text
              @repo/web-app
                    │
       ┌────────────┴────────────┐
  @repo/auth-lib           @repo/ui-kit      ← check riêng: PASS ✓
       └────────────┬────────────┘
            @repo/core-types                 ← check cả graph: FAIL ✗
```

```text
✗ GRAPH TYPECHECK FAILED
package: @repo/auth-lib → @repo/core-types
TS2322: Type 'UserSession' missing required property 'tenantId'
        in @repo/core-types v2.4.0

Isolated checks passed, but cross-package type graph contract is broken!
```

> Một package type check thành công khi chạy riêng. Nhưng khi kiểm tra **toàn bộ
> dependency graph**, lỗi mới xuất hiện.



## 7.4 Nhóm C — Sự cố ngay lúc deploy

```text
Build fail trên production runner       (local build được, server thì không)
Container cũ đã stop, container mới không lên   → downtime
Deploy xong mới phát hiện lỗi           → không có đường lùi
Không biết server đang chạy version nào
Deploy đè lên nhau khi nhiều người cùng push
```



## 7.5 Ngụy biện kinh điển

```text
dev@localhost ~$ npm test -- --pass

        "Trên máy em chạy được mà!"
                    │
     ┌──────────────┴──────────────┐
MÔI TRƯỜNG LOCAL          MÔI TRƯỜNG PRODUCTION
    ✓ PASS          ≠         ⚠ FAIL / UNKNOWN
```

> **"Local chạy được" chưa bao giờ đồng nghĩa với "production sẽ chạy được".**



## 7.6 Và cạm bẫy riêng của thời vibe coding

Vì sao chuyện này **nghiêm trọng hơn trước**? Vì tốc độ đã đổi:

```text
     AI AGENT                          CON NGƯỜI REVIEW
  50+ files / phút                     2 – 3 files / giờ
  ✓ Refactor API service               ⚠ 50+ PR chờ duyệt
  ✓ Tạo 20+ unit test                  ⚠ Đọc không kịp logic
  ✓ Thêm DB schema                     ⚠ Bỏ sót lỗi môi trường
  → BÙNG NỔ TỐC ĐỘ                     → NGHẼN CỔ CHAI
```

```text
Tốc độ AI tăng  ×  Review vẫn thủ công  =  Rủi ro lọt bug tăng vọt
```

Và nếu bỏ qua CI:

```text
Local (Claude Code)   TypeCheck ✓   UnitTest ✓
"Tự chạy lại ở máy cá nhân đều báo thành công..."
              ↓
   DEPLOY TRỰC TIẾP (KHÔNG QUA CI)
              ↓
        ❗ LỖI TRÊN PRODUCTION
   Chi phí sửa lỗi: cực kỳ đắt
```

> **Message:** Càng phát hiện muộn, càng đắt. AI làm code sinh ra nhanh hơn,
> nghĩa là lỗi cũng có thể sinh ra nhanh hơn.

---



# 8. Cách khắc phục các issues đó trước khi deploy · 10 phút



## 8.1 Bảng đối chiếu: vấn đề → cách chặn


| Vấn đề                       | Cách chặn                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Lệch phiên bản runtime       | Ghim version: `setup-node@v4` với `node-version` cố định; hoặc chạy trong Docker image cố định |
| Lệch dependency              | `npm ci --frozen-lockfile`, **luôn commit lockfile**                                           |
| Cache ẩn / máy bẩn           | Chạy trong container sạch, dựng mới mỗi lần                                                    |
| File chưa commit             | CI checkout từ repo — thiếu file là fail ngay, không thể lọt                                   |
| Lệch command                 | Định nghĩa script trong `package.json`, **dev và CI dùng chung một bộ lệnh**                   |
| Lỗi cross-package (monorepo) | Type check / test trên **toàn bộ workspace**, không chỉ package đang sửa                       |
| Bug lọt xuống production     | Deploy staging + smoke test trước, rồi mới release                                             |
| Deploy hỏng                  | Tag image theo version/SHA → rollback = deploy lại tag trước                                   |
| Không biết trạng thái thật   | Health check sau deploy + monitoring + log tập trung                                           |
| PR merge ẩu                  | Branch protection: bắt buộc CI xanh mới cho merge                                              |




## 8.2 Trái tim của giải pháp — container sạch

```bash
ci-runner @ isolated-env

$ docker run --rm node:20-alpine       # môi trường mới tinh
$ npm ci --frozen-lockfile             # dựng đúng theo lockfile
$ npm run typecheck && npm test        # đúng bộ lệnh quy chuẩn
```

Cái mà CI làm, về bản chất, chỉ là: **vứt bỏ mọi thứ riêng tư của máy bạn, dựng
lại từ đầu, và bắt project tự chứng minh nó chạy được.**

```text
Máy Dev Local                            [phụ thuộc cá nhân]
        │
        ▼  chuyển giao kiểm thử
CI Clean Sandbox                         [độc lập 100%]
   ✓ Cách ly hoàn toàn khỏi máy local
   ✓ Container sạch, không cache
   ✓ Thực thi quy chuẩn khách quan
```



### Những gì không được chấp nhận làm bằng chứng

```text
"Code chạy được rồi"     →  BỎ QUA
"Test log đã pass"       →  CẦN XÁC MINH
```



## 8.3 Một pipeline mà cả người lẫn AI đều phải đi qua

```text
        Developer                    AI Agent
     "Code nhìn có vẻ ổn,       "Test local pass,
      chắc không sao..."          sẵn sàng push..."
     ⚠ có thể mắc sai lầm       ⚠ bỏ sót sai lệch env
              │                         │
              └────────────┬────────────┘
                           ▼
              ┌────────────────────────┐
              │   MANDATORY PIPELINE   │
              │  ci-pipeline.yml       │
              │                        │
              │  • Môi trường sạch     │
              │  • Bộ tiêu chuẩn duy nhất
              │  • Không có ngoại lệ   │
              └────────────────────────┘
```

> **Pipeline không dựa trên cảm giác rằng "code có vẻ ổn".**
> Nó thực thi những tiêu chuẩn mà team đã định nghĩa.



## 8.4 Chuyển câu hỏi

```text
CÂU HỎI CŨ (cảm tính)     ✗  "Claude bảo pass chưa?"
                              ↓
CÂU HỎI MỚI (chuẩn hóa)   ✓  "Pipeline đã xanh chưa?"

  Dependency  ·  Linting  ·  Type Check
  Unit Test   ·  Integration  ·  Build App
```

Đây là một sự khác biệt rất lớn: **kỷ luật hệ thống thay thế sự tin tưởng cảm tính.**

## 8.5 Nhưng phải nói thật: CI/CD không phải viên đạn bạc

Slide này giữ cho buổi sharing khỏi trở thành quảng cáo.

```text
Viết test sai                        →  pipeline vẫn xanh
Business rule chưa có test           →  CI không tự biết
Chưa cấu hình security scan          →  lỗ hổng vẫn lọt
Coverage 100% nhưng test vô nghĩa    →  vẫn vô nghĩa
```

> **CI chỉ mạnh bằng đúng những tiêu chuẩn mà chúng ta đặt vào nó.**

Pipeline xanh không phải chân lý. Nó chỉ phản chiếu **đúng những gì ta đã yêu cầu
nó kiểm tra** — không hơn.

## 8.6 Vậy nhiệm vụ của Software Engineer là gì?

Đây là slide trả lời câu hỏi mà ai cũng đang nghĩ: *"AI code hết rồi thì mình làm gì?"*


| Câu hỏi                      | Nội dung                                    |
| ---------------------------- | ------------------------------------------- |
| Điều gì cần được kiểm tra?   | Phạm vi & ranh giới kiểm thử                |
| Test nào cần tồn tại?        | Kiến trúc bộ test: Unit / Integration / E2E |
| Code coverage cần thế nào?   | Chỉ số chất lượng & ngưỡng đạt              |
| Security check nào cần chạy? | Quét lỗ hổng, SAST                          |
| Khi nào được merge & deploy? | Tiêu chí cánh cổng chất lượng               |
| Khi có lỗi thì xử lý ra sao? | Phân loại sự cố & phương án dự phòng        |


> **AI viết code. Người kỹ sư định nghĩa tiêu chuẩn.**
> Vai trò không mất đi — nó dịch lên một tầng cao hơn.



## 8.7 Vòng lặp không kết thúc ở deploy

```text
        01  Production          vận hành thực tế
                 ↓
        02  Monitoring          thu thập telemetry
                 ↓
        03  Phát hiện lỗi       phân tích log / issue
                 ↓
        04  Quay lại vòng phát triển mới
                 ↺
```

CI/CD không dừng ở lúc deploy xong. Monitoring tiếp tục theo dõi phiên bản đó khi
hệ thống đang chạy, và nếu có vấn đề thì quay lại vòng phát triển tiếp theo.

---



# Tổng kết · 4 phút



## Hệ sinh thái hoàn chỉnh

```text
   AI AGENT   →   GIT   →   CI   →   CD   →   MONITORING
   tăng tốc      lưu vết   xác minh  triển khai   theo dõi
  development   thay đổi   tiêu chuẩn có kiểm soát  vận hành
                                                        │
        └──────────────  quay lại vòng sau  ─────────────┘
```


| Trụ cột        | Vai trò                                                            |
| -------------- | ------------------------------------------------------------------ |
| **AI Agent**   | Tạo code, refactor, bổ sung tính năng với tốc độ vượt trội         |
| **Git**        | Lưu vết mọi thay đổi, quản lý phiên bản an toàn                    |
| **CI**         | Xác minh thay đổi có đáp ứng tiêu chuẩn hay không                  |
| **CD**         | Đưa phiên bản đã kiểm định đến môi trường triển khai               |
| **Monitoring** | Theo dõi khi hệ thống vận hành, phản hồi ngược lại vòng phát triển |




## Ba câu mang về

**1.** "AI đã chạy test và tất cả đều pass" **không phải điểm kết thúc** — hãy coi
nó là **bước kiểm tra đầu tiên**.

**2.** Trong thời đại AI, vấn đề không còn là *viết code đủ nhanh hay không*.
AI đã giải quyết phần lớn bài toán tốc độ. Vấn đề lớn hơn là **kiểm soát chất
lượng của lượng code được tạo ra với tốc độ đó**.

**3.** Nếu AI Agent là một developer có khả năng code cực nhanh, thì **CI/CD chính
là dây chuyền kiểm định chất lượng mà ngay cả AI cũng phải đi qua**.

## Slide cuối

```text
   AI Agent   "Code đã ổn"        (?)
   Developer  "Chắc là ổn"        (?)

        ────────────────────────

        HÃY ĐỂ PIPELINE TRẢ LỜI
```

---

**Q&A · 10 phút**

### Vài câu hỏi nên chuẩn bị trước

- *"Project nhỏ, 2 người, có cần CI/CD không?"*
→ Cần, nhưng ở mức tối giản: chỉ cần lint + test + build trên PR là đã đủ giá trị.
- *"Pipeline chạy 15 phút, chờ lâu quá thì sao?"*
→ Cache dependency, chạy job song song, tách test nhanh/chậm, Docker layer caching.
- *"Có nên để AI tự merge khi pipeline xanh không?"*
→ Không. Pipeline xanh chỉ nghĩa là *không vi phạm tiêu chuẩn ta đã đặt ra* —
nó không thay được người chịu trách nhiệm.
- *"Team chưa có test thì bắt đầu từ đâu?"*
→ Bắt đầu bằng lint + type check + build. Ba bước đó không cần viết test nào
mà đã chặn được rất nhiều lỗi.

