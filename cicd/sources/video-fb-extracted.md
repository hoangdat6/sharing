# Nội dung trích xuất từ video Facebook

**Nguồn:** https://www.facebook.com/reel/1587126456760256
**Tác giả:** Trần Huy Hoàng · Đăng 19/08/2026 · ~5.700 view · 239 reactions
**Thời lượng:** 8 phút 26 giây · Định dạng: video slide (33 slide, không có người dẫn hình)

Tài liệu này ghi lại toàn bộ nội dung chữ trên từng slide của video, dùng làm
nguyên liệu cho `summary.md` và `detail..md`.

---

## Caption gốc của bài đăng

> 🚀 Một trải nghiệm khá hay hôm nay khi mình Vibe Coding với Claude Code.
>
> Sau khi hoàn thành một phần website, mình cho Claude tự chạy Type Check và Unit Test.
>
> Kết quả: tất cả đều PASS ✅
>
> Sau đó code được push lên GitHub và CI bắt đầu chạy lại toàn bộ quy trình.
>
> Và bất ngờ là...
>
> ❌ Type Check xuất hiện khá nhiều lỗi.
>
> Sửa xong Type Check thì...
>
> ❌ Một số Unit Test tiếp tục không pass.
>
> Đây cũng là lúc mình thấy rõ hơn giá trị của CI/CD trong thời đại Vibe Coding.
>
> AI có thể viết code, tự test và báo rằng mọi thứ đều ổn. Nhưng môi trường local
> và môi trường CI có thể khác nhau về dependency, configuration, command,
> environment hoặc phạm vi test.
>
> CI giống như một cánh cổng kiểm định độc lập.
>
> AI viết code. Developer review. CI kiểm chứng. CD đưa phiên bản đã được kiểm tra
> đến môi trường triển khai.
>
> AI Agent càng giúp chúng ta tạo code nhanh thì mình nghĩ những quy trình kiểm soát
> chất lượng như CI/CD lại càng trở nên quan trọng.
>
> Một bài học mình rút ra hôm nay:
>
> "AI bảo pass" chưa phải là điểm kết thúc.
>
> Quan trọng hơn là... 🟢 Pipeline đã xanh chưa?
>
> Nếu AI Agent giống như một developer có khả năng code cực nhanh, thì CI/CD chính là
> dây chuyền kiểm định chất lượng mà ngay cả AI cũng phải đi qua.

---

## Hồi 1 — Câu chuyện có thật (00:00 → 01:00)

### S1 · Tình Huống Dự Án Thực Tế `00:00`

Badge: CASE STUDY THỰC TẾ · Project Live

> "Lý do mình chọn chủ đề này đến từ một tình huống mình vừa gặp trong chính
> project của mình."

Thẻ: `Vibe Coding` · `Claude Code` · `CI Pipeline`
Bối cảnh: Project Website — Mục tiêu: Kiểm chứng CI/CD

### S2 · Lập Trình Với Sự Hỗ Trợ Từ Claude Code AI Agent `00:11`

```text
claude-code — vibe-website ~/src                      ● AI HOẠT ĐỘNG
> claude-code generate feature --name "LandingPage"
  [Claude Code] Phân tích cấu trúc project...
  Tự động tạo React Components & Styles...
→ Đã tạo src/components/HeroSection.tsx
→ Đã tạo src/components/FeatureGrid.tsx
→ Đã sửa src/App.tsx
```

### S3 · Yêu Cầu Claude Tự Kiểm Tra Code `00:15`

Badge: KIỂM TRA MÔI TRƯỜNG LOCAL

```text
vibe-app$ npm run typecheck
> tsc --noEmit --skipLibCheck
[14:42:01] Scanning TypeScript files...
✓ Verified 58 modules in /src
✓ 0 errors found. Type Check passed!
  Done in 1.24s
```

Kết quả: lệnh typecheck hoàn tất không có lỗi nào.

### S4 · Kiểm Tra Local #2 — `npm test` `00:21`

```text
vitest — unit-tests                                        v1.6.0
$ npm run test:unit
PASS  src/auth/login.test.ts            142ms
PASS  src/utils/validator.test.ts        88ms
PASS  src/services/api.test.ts          310ms
PASS  src/components/Button.test.ts      65ms

Test Suites:  4 passed, 4 total
Tests:       18 passed, 18 total
Time:        0.605s
```

Dấu mộc: **UNIT TEST PASS — 100% VERIFIED LOCAL**
Chú thích: Tất cả Unit Test trên máy local đều vượt qua.

### S5 · Code Ổn Rồi • Test Đã Pass! `00:25`

Badge: KIỂM TRA LOCAL: 100% THÀNH CÔNG

| Type Check `tsc --noEmit` | Unit Test `npm run test` |
| --- | --- |
| ✓ 0 LỖI | ✓ 100% PASS |

```text
→ git status
  On branch main. Working tree clean.
→ git push origin main
  Enumerating objects: 12, done.
  Writing objects: 100% (12/12), 4.2 KiB | done.
  To github.com:repo/vibe-coding.git
```

→ ĐÃ PUSH CODE THÀNH CÔNG LÊN GITHUB

### S6 · GitHub Actions CI #108 · main → **THẤT BẠI** `00:34`

QUY TRÌNH KIỂM TRA CI PIPELINE — 5 bước cấu hình

| # | Bước | Lệnh | Kết quả |
| --- | --- | --- | --- |
| 1 | Cài đặt Dependency | `npm ci --prefer-offline` | ✓ 1.2s Pass |
| 2 | Kiểm tra Lint & Format | `eslint . --ext .ts,.tsx` | ✓ 3.4s Pass |
| 3 | Kiểm tra Type Check | `tsc --noEmit` | ✗ **LỖI (FAIL)** |
| 4 | Chạy Unit Test | `vitest run` | Đã hủy (Skipped) |
| 5 | Build Production Bundle | `vite build` | Đã hủy (Skipped) |

```text
[ERROR] Phát hiện 1 lỗi Type Check khi build runner
src/services/user.ts:34:18
TS2322: Type 'string' is not assignable to type 'number'.
34 | const userId: number = params.id;
```

> Đây là cú twist của cả bài: y hệt bộ lệnh đó, chạy trên máy local thì xanh,
> chạy trên CI runner thì đỏ.

### S7 · Bài Học Kinh Nghiệm `00:48`

```text
Claude Code (AI Agent)                        [CHƯA KIỂM CHỨNG]
"Code đã Type Check pass & Unit Test pass rồi!"
```

THỰC TẾ TRONG THỜI ĐẠI AI → **Đừng Chỉ Tin Lời AI**

> **BÀI HỌC CỐT LÕI: HÃY ĐỂ HỆ THỐNG KIỂM CHỨNG!**

Thẻ: `CI/CD Pipeline` · `Môi Trường Độc Lập`

---

## Hồi 2 — CI là gì (01:00 → 03:16)

### S8 · Các Bước Trong CI Pipeline `01:00`

Badge: QUY TRÌNH TỰ ĐỘNG — "Chuỗi 6 công đoạn tự động kiểm soát chất lượng code"

| # | Công đoạn | Lệnh | Ý nghĩa |
| --- | --- | --- | --- |
| 01 | Cài Dependency | `npm ci` | Cài đặt môi trường sạch từ lockfile |
| 02 | Kiểm Tra Format & Lint | `eslint .` | Đảm bảo chuẩn code style & cú pháp |
| 03 | Chạy Type Check | `tsc --noEmit` | Xác minh kiểu dữ liệu nghiêm ngặt |
| 04 | Chạy Unit Test | `npm test` | Kiểm tra logic từng hàm & component |
| 05 | Chạy Integration Test | `playwright test` | Kiểm tra tương tác giữa các dịch vụ |
| 06 | Build Project | `npm run build` | Đóng gói sản phẩm sẵn sàng triển khai |

→ **TẤT CẢ STEPS PASS: PULL REQUEST ĐỦ ĐIỀU KIỆN MERGE**

### S9 · Cánh Cổng Kiểm Tra `01:24`

Badge: TRẠM KIỂM TRA CHẤT LƯỢNG
Nguyên tắc: **Tất cả Pass → Được cho qua | 1 bước Fail → Khóa Pipeline**

```text
01. npm run lint              ✓ PASS
02. npm run typecheck         ✓ PASS
03. npm run test:unit         ✓ PASS
04. npm run test:integration  ✗ FAIL (1 error)
```

→ **PIPELINE DỪNG: CỔNG ĐÃ KHÓA**

### S10 · Tại Sao Local Pass Nhưng CI Lại Fail? `01:33`

Badge: PHÂN TÍCH SAI LỆCH — Bảng so sánh 4 yếu tố môi trường khác biệt

| Yếu tố | Máy Local ✓ TypeCheck & Test PASS | CI Server ✗ TypeCheck / Test FAIL |
| --- | --- | --- |
| 1. Node.js | `v20.11.0 (Local)` | `v18.17.0 (Runner)` — Lệch Ver |
| 2. Package | `Cài sẵn dev cache` | `Lockfile nghiêm ngặt` — Thiếu File |
| 3. Env Variable | `File .env.local riêng` | `CI Secrets thực tế` — Thiếu Key |
| 4. Scope Test | `Test 1 module/file` | `Quét toàn bộ Project` — Full Clean |

Ghi chú: CI Pipeline thực thi bộ kiểm tra khách quan trên môi trường sạch.

### S11 · Thách Thức Với Monorepo `01:33`

Badge: MONOREPO GRAPH — Kiến Trúc Đa Package
"Một package chạy riêng thì Pass, nhưng kiểm tra toàn bộ Graph sẽ phát hiện lỗi!"

`@company/monorepo` — pnpm-workspace · 4 packages

```text
              APP  @repo/web-app
                      │
        ┌─────────────┴─────────────┐
   @repo/auth-lib              @repo/ui-kit   ✓ Pass
        └─────────────┬─────────────┘
           SHARED CORE  @repo/core-types
           ✗ Graph Dependency Error
```

```text
✗ GRAPH TYPECHECK FAILED
package: @repo/auth-lib → @repo/core-types
TS2322: Type 'UserSession' missing required property 'tenantId' in
@repo/core-types v2.4.0
Isolated checks passed, but cross-package type graph contract is broken!
```

### S12 · Môi Trường Kiểm Tra Độc Lập `02:23`

Badge: GIÁ TRỊ CỐT LÕI #1 — INDEPENDENT VERIFICATION SANDBOX

```text
Máy Dev Local                          [Phụ thuộc cá nhân]
        ↓ CHUYỂN GIAO KIỂM THỬ
CI Clean Sandbox                       [Độc Lập 100%]
  ✓ Cách ly hoàn toàn khỏi máy Local
  ✓ Môi trường Clean Container sạch
  ✓ Thực thi quy chuẩn khách quan
```

→ XÁC MINH ĐỘC LẬP TỰ ĐỘNG

### S13 · Hệ Thống Chấm Độc Lập `02:36`

Badge: HỆ THỐNG CHẤM TỰ ĐỘNG — ENGINE v2.4
"Bộ tiêu chí nhất quán — Đánh giá khách quan 100%"

```text
01  Môi trường Container độc lập & sạch          ✓ ĐẠT
02  Kiểm tra Syntax & Type Check nghiêm ngặt     ✓ PASS
03  Thực thi Suite Unit & Integration Tests      ✓ PASS
04  Định nghĩa Quy tắc chung cho toàn bộ Team    CHỜ QUÉT
```

TRẠNG THÁI ĐÁNH GIÁ: TIÊU CHUẨN ĐẠT CHUẨN

### S14 · Tiêu Chuẩn Khách Quan Của Máy Chủ CI `02:53`

Badge: MÔI TRƯỜNG KIỂM TRA ĐỘC LẬP
Thực Thi Container Sạch — "Chạy lại quy trình trên môi trường hoàn toàn sạch"

YẾU TỐ KHÔNG ĐƯỢC CHẤP NHẬN:
- "Code chạy được rồi" → **BỎ QUA**
- "Test log đã pass" → **CẦN XÁC MINH**

QUY TRÌNH THỰC TẾ TRONG CONTAINER:

```bash
ci-runner @ isolated-env
$ docker run --rm node:20-alpine
$ npm ci --frozen-lockfile              # Môi trường sạch
$ npm run typecheck && npm test         # Quy chuẩn chung
```

### S15 · AI Agent Vẫn Có Thể Sai Lầm `03:08`

Badge: HẠN CHẾ CỦA CẢM TÍNH
"Pipeline không dựa vào cảm giác — Chỉ thực thi tiêu chuẩn đã định nghĩa"

YẾU TỐ CẢM TÍNH CÁ NHÂN:

| Developer | AI Agent |
| --- | --- |
| *"Code nhìn có vẻ ổn, chắc không sao..."* | *"Test local pass, sẵn sàng push..."* |
| ⚠ Có thể mắc sai lầm | ⚠ Bỏ sót sai lệch Env |

**KỶ LUẬT PIPELINE THỰC TẾ** [THỰC THI BẮT BUỘC]
"Bắt buộc 100% thay đổi phải vượt qua cánh cổng kiểm tra độc lập"
- ✓ Không dựa vào cảm giác cá nhân
- ✓ Thực thi bộ tiêu chuẩn Team đã quy định
- ✓ Kiểm thử độc lập trong Clean Environment

---

## Hồi 3 — Vì sao AI càng mạnh thì CI càng quan trọng (03:16 → 04:25)

### S16 · Tốc Độ Tạo Code Bùng Nổ `03:16`

Badge: KỶ NGUYÊN VIBE CODING — "AI Agent sửa & tạo hàng chục tập tin trong vài giây"

```text
claude-code --agent (vibe mode)              [+52 FILE THAY ĐỔI]
❯ claude "Tự động phát triển full-stack feature"

TẠO MỚI   src/api/routes/v1/user.ts          +142 dòng
ĐÃ SỬA    src/database/schema.prisma          +85 dòng
REFACTOR  src/services/auth.service.ts       +210 dòng
ĐÃ SỬA    tests/unit/auth.test.ts            +165 dòng
ĐÃ SỬA    config/environment.json             +18 dòng
TẠO MỚI   Dockerfile                          +34 dòng
```

Phạm vi đụng chạm: Thêm API · Thay đổi Database · Refactor Service ·
Viết Unit Test · Sửa Configuration · Thay đổi Dockerfile

### S17 · Nút Thắt Cổ Chai Review `03:37`

Badge: THÁCH THỨC VIBE CODING
"Tốc độ AI sinh code quá nhanh so với khả năng review thủ công của con người"

| AI AGENT (Tự Động) | HUMAN REVIEW (Thủ Công) |
| --- | --- |
| Tốc Độ Sinh Code **50+ files/phút** | Tốc Độ Review **2–3 files/giờ** |
| Tốc độ phát triển: 95% | Khả năng kiểm soát: 15% |
| ✓ Refactor API Service | 50+ PRs Chờ Duyệt |
| ✓ Tạo 20+ Unit Tests | ⚠ Đọc Không Kịp Logic |
| ✓ Thêm DB Schema | ⚠ Bỏ Sót Lỗi Môi Trường |
| → BÙNG NỔ TỐC ĐỘ | → NGHẼN CỔ CHAI |

> ⚠ NGUY CƠ TÍCH TỤ RỦI RO
> **Tốc độ AI tăng × Review thủ công = Rủi ro lọt bug tăng vọt**
> "Nếu quy trình kiểm soát chất lượng vẫn thủ công, thảm họa sản phẩm sẽ đến sớm hơn."

### S18 · Luồng Kiểm Tra Chuẩn `04:03`

Badge: CI PIPELINE WORKFLOW — PR #142 · main ← feature/ai-agent

```text
1. Cài Đặt Dependency      npm ci --prefer-offline   ✓ PASSED
2. Kiểm Tra Format & Lint  npm run lint              ✓ PASSED
3. Chạy Type Check         npm run typecheck         ✓ PASSED
4. Chạy Unit Test          npm run test              ✓ PASSED
5. Integration Test        npm run test:e2e          ✓ PASSED
6. Build Project           npm run build             ⏳ Chờ...

Pull Request Gate — Chờ tất cả các bước kiểm tra    🔒 LOCKED
```

### S19 · "Pipeline đã xanh chưa?" `04:03`

Badge: SỰ CHUYỂN ĐỔI TƯ DUY KIỂM THỬ

```text
CÂU HỎI CŨ (CẢM TÍNH)     ~~"Claude bảo pass chưa?"~~
                                    ↓
CÂU HỎI MỚI (CHUẨN HÓA)     "Pipeline đã xanh chưa?"
```

Gồm: Dependency · Linting · Type Check · Unit Test · Integration · Build App

> SỰ KHÁC BIỆT RẤT LỚN — Kỷ luật hệ thống thay thế sự tin tưởng cảm tính (100%)

---

## Hồi 4 — CD và các sự cố khi deploy (04:26 → 05:56)

### S20 · CD Là Gì? `04:26`

Badge: KHÁI NIỆM CD — "2 Trường Phái Triển Khai Phổ Biến"

**01. CONTINUOUS DELIVERY — Chuyển Giao Liên Tục**

```text
Commit Code → Auto Test → [Duyệt Thủ Công] → Production
```
Cần con người xác nhận trước khi Deploy · `Manual Release`

**02. CONTINUOUS DEPLOYMENT — Triển Khai Liên Tục**

```text
Commit Code → Auto Test → [Tự Động Deploy] → Production
```
Tự động 100% lên Production khi Pass Test · `Auto Release`

> ℹ Lựa chọn mô hình **tùy thuộc vào cách tổ chức** và quy trình của từng hệ thống.

### S21 · Quy Trình Triển Khai Tự Động `04:47`

Badge: ACT 2 · QUY TRÌNH CD — file `cd-workflow.yml`
"Tự động chuyển giao phiên bản đã kiểm định đến Production"

| # | Bước | Chi tiết | Trạng thái |
| --- | --- | --- | --- |
| 01 | Hợp Nhất Code & Kiểm Tra CI | Đã Merge Pull Request · CI Pass | ✓ ĐÃ PASS |
| 02 | Build Docker Image | `docker build -t app:v2.4.0 .` | ✓ ĐÃ BUILD |
| 03 | Push Container Registry | `registry.internal/app:v2.4.0` | ✓ ĐÃ PUSH |
| 04 | Deploy Môi Trường Staging | `kubectl apply -f staging/` | ✓ ĐÃ DEPLOY |
| 05 | Kiểm Tra Smoke Test Tự Động | Xác Minh Integration & E2E | ✓ ĐÃ XÁC MINH |
| 06 | Release Đến Production | Hoàn Tất Triển Khai Zero-Downtime | ✓ HOẠT ĐỘNG |

### S22 · "Trên máy em chạy được" `04:43`

Badge: NGỤY BIỆN KỸ THUẬT — BẪY TƯ DUY TRONG LẬP TRÌNH

```text
dev@localhost ~$ npm test -- --pass
```
Dấu mộc: **NGỤY BIỆN! LOCAL PASS ≠ PROD PASS**

```text
MÔI TRƯỜNG LOCAL  ✓ PASS   ≠   MÔI TRƯỜNG PRODUCTION  ⚠ FAIL / UNKNOWN
```

⚠ Rủi Ro Khác Biệt Môi Trường:
- Lệch phiên bản Node.js / OS & Dependencies
- Thiếu Environment Variables & State Ẩn
- Local Cache che giấu lỗi thực tế

→ **Giải pháp: Quy trình CD độc lập**

### S23 · Yếu Tố Sai Lệch Ẩn Trên Máy Dev `05:22`

Badge: MÔI TRƯỜNG LOCAL VS CI
"Tại sao code pass ở Local nhưng lại fail trên CI Server?"

| Yếu tố | Mô tả | Từ khóa |
| --- | --- | --- |
| Dependency Khác Biên | Package cài sẵn hoặc lệch minor version | `node_modules` |
| File Cấu Hình Riêng | Chưa commit file hoặc chưa đẩy lên Repo | `uncommitted` |
| Cache Ẩn Cũ | Dữ liệu build/test cũ lưu trong bộ nhớ tạm | `.cache / build` |
| Biến Môi Trường (Env) | Giá trị `.env.local` khác với CI pipeline | `PROCESS.ENV` |

> ⚠ **Local green không đồng nghĩa với Production green!**

### S24 · Cạm Bẫy Vibe Coding `05:34`

Badge: RỦI RO KHI KHÔNG CÓ CI — "Phát hiện lỗi muộn mang lại tổn thất lớn"

```text
Local (Claude Code)          TypeCheck ✓   UnitTest ✓
"Tự động chạy lại ở máy cá nhân đều báo thành công..."
              ↓
   DEPLOY TRỰC TIẾP (KHÔNG QUA CI)
              ↓
        ❗ Lỗi Trên Production!
```

"Sự cố xảy ra ở bước Build hoặc khi người dùng thực tế thao tác trên hệ thống."
→ **Chi Phí Sửa Lỗi: Cực Kỳ Đắt** — `CRITICAL FAIL`

---

## Hồi 5 — Vòng lặp phản hồi và kết luận (05:56 → 08:26)

### S25 · Định Vị Nhanh Commit Lỗi `05:56`

Badge: CI AUDIT & DEBUGGING
"Phát hiện ngay lập tức sau khi push — Chi phí sửa cực thấp"

```text
github-actions / ci-pipeline.log                    ● BUILD FAILED
$ git log -n 1 --stat-failed

commit #a1b2c3f8d9 (HEAD → main)              [COMMIT SỰ CỐ]
Author: Claude Code | 12.6s ago
  feat(auth): refactor user authentication & types

⚠ FAIL: STEP "TYPE CHECK" (exit code 1)
src/services/auth.ts:42:15 - error TS2339
  42 const token = response.userToken;
Property 'userToken' does not exist on type 'AuthResponse'.
```

- **Sửa Lỗi Tức Thì** — Khoanh vùng ngay commit
- **Log Chi Tiết** — Chỉ rõ dòng code fail

### S26 · Vòng Lặp Tự Động Sửa Lỗi `06:22`

Badge: AI AGENT × CI/CD LOOP
"Phát hiện lỗi CI → Chuyển Log cho AI → Sửa Code & Re-run"

```text
1  AI Viết Code & Push          Claude Code sinh mã nguồn và tự tạo commit mới
2  CI Kiểm Tra Tự Động          GitHub Actions thực thi TypeCheck & Unit Test độc lập
3  AI Phân Tích & Sửa Code      AI nhận log lỗi từ CI                     [auto-fix]
4  Đã Khắc Phục Lỗi TypeCheck   AI bổ sung interface type definition chính xác
                                ✓ TypeCheck: 0 errors found in 12 files
5  Pipeline Xanh                Mọi tiêu chuẩn chất lượng được đáp ứng   [100% PASSED]
```

Dấu mộc: **ALL TESTS PASSED**

> Điểm mấu chốt: log CI trở thành đầu vào cho AI. Con người không còn phải đọc
> 200 dòng log — nhưng cánh cổng quyết định vẫn là CI, không phải AI.

### S27 · Nhiệm Vụ Của Software Engineer `06:55`

Badge: TRÁCH NHIỆM SOFTWARE ENGINEER
"Người định nghĩa tiêu chuẩn & kiến trúc kiểm thử hệ thống"

| Câu hỏi | Nội dung | Nhãn |
| --- | --- | --- |
| Điều gì cần được kiểm tra? | Phạm vi & Ranh giới kiểm thử | XÁC ĐỊNH SCOPE |
| Test nào cần tồn tại? | Các bộ Unit, Integration & E2E | KIẾN TRÚC TEST |
| Code Coverage cần thế nào? | Chỉ số chất lượng & Ngưỡng đạt | NGƯỠNG CHỈ SỐ |
| Security Check nào cần chạy? | Quét lỗ hổng & SAST Scan | CỔNG AN NINH |
| Khi nào Merge & Deploy? | Tiêu chí cánh cổng chất lượng | CHÍNH SÁCH DUYỆT |
| Khi có lỗi xử lý ra sao? | Chiến lược phân loại & Xử lý sự cố | DỰ PHÒNG LỖI |

> Đây là slide quan trọng nhất về mặt thông điệp nghề nghiệp: AI viết code,
> nhưng **người kỹ sư là người định nghĩa tiêu chuẩn**.

### S28 · Giám Sát & Vòng Lặp Liên Tục `06:09`

Badge: MONITORING & FEEDBACK LOOP — CONTINUOUS DEVOPS ENGINE

```text
        01 Production (Vận hành thực tế)
                    ↓
        02 Monitoring (Thu thập Telemetry)
                    ↓
        03 Phát Hiện Lỗi (Phân tích logs/issue)
                    ↓
        04 Loop Quay Lại (Vòng phát triển mới)
                    ↺
```

UPTIME 99.99% · TELEMETRY Real-Time · CYCLE Continuous
→ **Nếu Có Vấn Đề → Quay Lại Vòng Phát Triển**

### S29 · Tóm Tắt Hệ Sinh Thái CI/CD `07:14`

Badge: VIBE CODING ECOSYSTEM — "4 Trụ Cột Tự Động Hóa Trong Quy Trình Modern Software"

| # | Trụ cột | Vai trò |
| --- | --- | --- |
| 01 | **AI AGENT** `Claude Code` | Tăng Tốc Development — tạo code, refactor & bổ sung tính năng mới với tốc độ vượt trội |
| 02 | **GIT REPOSITORY** `git commit & push` | Quản Lý & Lưu Trữ Code — lưu vết mọi thay đổi, theo dõi lịch sử commit, quản lý phiên bản an toàn |
| 03 | **CI PIPELINE** `npm test & typecheck` | Xác Minh & Kiểm Trọng — tự động kiểm tra Type Check, Unit Test trong môi trường sạch độc lập |
| 04 | **CD** | Bàn giao & triển khai phiên bản đã kiểm định |

### S30 · Bắt Buộc Qua Quy Trình Độc Lập `07:35`

Badge: KỶ LUẬT QUY TRÌNH HỆ THỐNG
"Môi trường sạch & Bộ tiêu chuẩn duy nhất cho cả Dev & AI"

`Mandatory Standard Pipeline` — `ci-pipeline-execution.yml` · STRICT MODE
1. **Môi Trường Sạch** — Khởi tạo container mới, không dính cache local

### S31 · Tốc Độ Sinh Mã vs Chất Lượng Phần Mềm `07:39`

Badge: BÀI TOÁN KIỂM SOÁT

**Tốc Độ Code** (AI Agent & Vibe Coding) — *Đã giải quyết xong*
- Tạo hàng chục file trong vài giây
- Tăng tốc phát triển gấp 10 lần
- Tự động hóa toàn bộ thao tác

**Chất Lượng Phần Mềm** — *vế còn lại, chưa tự động thì vẫn là nút thắt*

### S32 · CI/CD Là Dây Chuyền Kiểm Định Chất Lượng `08:00`

Badge: DEVOPS & AI AGENT PIPELINE
"Dây chuyền bắt buộc mà ngay cả AI Agent cũng phải đi qua để bảo đảm chất lượng code."

```text
AUTOMATED QA ASSEMBLY LINE                      ● PIPELINE ACTIVE

1  AI Agent Commit Code        feat: add automated api features by Claude   [Pushed]
2  Kiểm Định Tự Động (CI)      ✓ TypeCheck  ✓ Unit Test  ✓ ...
3  Bàn Giao & Triển Khai (CD)  Build Artifact Verified & Ready for Production
```

Dấu mộc: **CI/CD VERIFIED — APPROVED — PASSED ALL QUALITY GATES**
Quy Chuẩn An Toàn Cho AI Agent: `100% QUALITY GATE PASSED`

### S33 · Kết Luận Cuối Cùng `08:25`

```text
AI Agent    "Code đã ổn"      (?)
Developer   "Chắc là ổn"      (?)
```

→ **HÃY ĐỂ PIPELINE TRẢ LỜI!** `PIPELINE GREEN ✓`

---

## Hai ý chỉ có trong lời dẫn, không có trên slide

### A. Phép ẩn dụ "sinh viên nộp bài" `02:38 → 03:01`

> "Giả sử mình là một sinh viên làm bài tập. Mình làm xong bài. Mình tự kiểm tra.
> Mình thấy đúng. Sau đó mình nhờ một người bạn kiểm tra. Người bạn cũng nói
> 'ổn rồi'. Nhưng cuối cùng bài vẫn phải được đưa qua một hệ thống chấm độc lập.
> Hệ thống đó có cùng một bộ tiêu chí cho tất cả mọi người. Nếu sai thì báo sai,
> nếu đúng thì pass. CI trong project cũng giống như hệ thống chấm độc lập đó."

Ánh xạ: **tự chấm** = AI tự chạy test · **bạn xem hộ** = code review ·
**hệ thống chấm** = CI. Đây là cách giải thích CI dễ hiểu nhất trong cả bài,
dùng được cho cả người không phải developer.

### B. Giới hạn của CI/CD — đoạn thẳng thắn nhất `06:31 → 06:49`

> "CI/CD không đảm bảo phần mềm không có bug. Nếu chúng ta viết test sai thì
> pipeline vẫn có thể pass. Nếu một business rule chưa được test thì CI cũng
> không tự biết. Nếu có lỗ hổng security mà chúng ta chưa có bước kiểm tra tương
> ứng thì pipeline cũng có thể không phát hiện.
> **CI chỉ mạnh bằng những tiêu chuẩn mà chúng ta đặt vào pipeline.**"

Câu này là bản lề dẫn thẳng sang slide S27 (Nhiệm Vụ Của Software Engineer):
pipeline xanh không phải là chân lý, nó chỉ phản chiếu đúng những gì ta yêu cầu
nó kiểm tra.

### C. Vòng lặp AI ↔ CI, mô tả bằng lời `06:09 → 06:29`

> "AI viết code → CI kiểm tra code → CI phát hiện lỗi → log được đưa lại cho AI
> → AI phân tích nguyên nhân → **developer review** → AI sửa code → pipeline chạy
> lại, cho đến khi tất cả các tiêu chuẩn đều được đáp ứng."

Lưu ý bước `developer review` nằm giữa: tác giả cố ý không để AI tự đóng vòng lặp.

### D. Câu kết `07:36 → 08:24`

> "Trong vibe coding, đừng coi câu 'AI đã chạy test và tất cả đều pass' là điểm
> kết thúc. **Hãy coi nó chỉ là bước kiểm tra đầu tiên.** [...] Vấn đề có thể
> không còn là chúng ta có viết code đủ nhanh hay không — AI đã giải quyết rất
> nhiều phần của bài toán tốc độ. Vấn đề lớn hơn sẽ là làm thế nào để kiểm soát
> chất lượng của lượng code được tạo ra với tốc độ đó. [...] AI có thể nói 'code
> đã ổn', developer cũng có thể nghĩ 'chắc là ổn', nhưng cuối cùng —
> **hãy để pipeline trả lời**."

---

## Những ý dùng được ngay cho buổi sharing

1. **Mở bài bằng câu chuyện, không bằng định nghĩa.** Chuỗi S3→S4→S5→S6 (local xanh
   → push → CI đỏ) là một cái hook hoàn chỉnh, có màn hình thật, có mã lỗi thật.
2. **6 tác vụ CI chuẩn** (S8) trả lời trực tiếp mục 2 của `summary.md`.
3. **Bảng Local vs CI Server 4 yếu tố** (S10) và **4 yếu tố sai lệch ẩn** (S23) trả
   lời trực tiếp mục 7 — các issue phát sinh khi deploy.
4. **Hai loại CD** (S20) trả lời trực tiếp mục 5.
5. **Container sạch + `npm ci --frozen-lockfile`** (S14) là câu trả lời kỹ thuật cho
   mục 8 — cách khắc phục trước khi deploy.
6. **Câu chốt của cả bài:** chuyển từ *"Claude bảo pass chưa?"* sang
   *"Pipeline đã xanh chưa?"* (S19, S33).
