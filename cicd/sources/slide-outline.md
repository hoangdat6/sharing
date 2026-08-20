# CI/CD trong thời đại AI — Dàn ý slide chi tiết

**Nguồn:** `cicd/sources/detail..md` (tham chiếu trong file này viết tắt là `detail.md`)
**Audience:** Developer Backend / Frontend / Fullstack — **không** chuyên sâu DevOps/Cloud
**Thời lượng:** 1h45 – 2h (bao gồm demo + Q&A)
**Stack demo:** GitHub → GitHub Actions → Docker → Docker Hub → EC2
**Thông điệp xuyên suốt:** *"AI bảo pass" là bước kiểm tra đầu tiên, không phải điểm kết thúc. Hãy để pipeline trả lời.*

> **Quy ước:** toàn bộ nội dung slide bám theo `detail..md`. Những giải thích thêm để nối mạch (chủ yếu là định nghĩa ngắn cho audience không chuyên DevOps, nằm trong speaker notes) được đánh dấu `[BỔ SUNG]`. Các chi tiết về `ci.yml`, `cd.yml`, `Dockerfile`, `scripts/demo4.mjs` lấy từ repo demo thật `cicd/demo-app` (không phải kiến thức tự thêm).

---

## Phân tích source trước khi lên outline

### Các chủ đề chính trong `detail.md`

| # | Chủ đề | Vị trí trong source | Vai trò trong presentation |
| --- | --- | --- | --- |
| 1 | Câu chuyện mở đầu: local xanh / CI đỏ | § 0 | Mở đầu — tạo câu hỏi treo cho cả buổi |
| 2 | Định nghĩa & bản chất CI | § 1 | Khái niệm nền tảng #1 |
| 3 | Công cụ CI + 6 tác vụ CI chuẩn + toolbox | § 2 | Phần "kiến thức thị trường", nặng nhất về lượng |
| 4 | Deploy thủ công thời chưa có CD | § 3 | Tạo nhu cầu (pain) trước khi giới thiệu CD |
| 5 | Định nghĩa CD + ranh giới CI ↔ CD | § 4 | Khái niệm nền tảng #2 |
| 6 | Delivery vs Deployment | § 5 | Phân biệt hai khái niệm hay bị lẫn |
| 7 | 4 demo thực tế | § 6 | Trọng tâm trải nghiệm (25 phút) |
| 8 | Vì sao local xanh mà CI/prod đỏ | § 7 | Trả lời câu hỏi treo |
| 9 | Cách chặn từng vấn đề | § 8 | Giải pháp hành động được |
| 10 | Vòng đời AI → Git → CI → CD → Monitoring | Tổng kết | Đóng khung toàn buổi |

### Khái niệm bắt buộc phải giải thích cho audience không chuyên DevOps

CI · CD (Delivery vs Deployment) · pipeline / job / step / gate · runner · artifact ·
`npm ci` vs `npm install` · lockfile · container sạch · image tag (SHA vs `latest`) ·
registry · branch protection · smoke test · health check · rollback ·
SCA / SAST / secret scan / container scan.

### Flow logic được thiết kế lại (không bám heading của file)

```text
A. HOOK          câu chuyện thật, tạo câu hỏi treo
B. KHÁI NIỆM 1   CI là gì (đặt tên cho thứ vừa chặn ta lại)
C. THỰC HÀNH CI  công cụ + 6 tác vụ + bản đồ công cụ
D. PAIN          deploy thủ công — vì sao cần CD
E. KHÁI NIỆM 2   CD là gì + ranh giới CI/CD
F. PHÂN LOẠI     Delivery vs Deployment
G. DEMO          4 demo, demo 4 đóng lại câu hỏi treo
H. TRẢ LỜI       vì sao local xanh mà CI đỏ
I. GIẢI PHÁP     chặn từng vấn đề + giới hạn của CI/CD + vai trò engineer
J. ĐÓNG KHUNG    hệ sinh thái + 3 câu mang về
```

Nguyên tắc giữ nguyên từ source: **hiện tượng trước, khái niệm sau.**

### Phần nên minh họa bằng diagram (không dùng text)

Cánh cổng kiểm tra (§1) · pipeline 6 tác vụ (§2.2) · 4 tầng chạy check (§2.4) ·
quy trình deploy thủ công (§3) · đường cắt CI ↔ CD (§4) · 2 luồng Delivery/Deployment (§5) ·
dependency graph monorepo (§7.3) · AI vs human review speed (§7.6) ·
pipeline bắt buộc cho cả người và AI (§8.3) · vòng lặp monitoring (§8.7) · hệ sinh thái 5 khối (Tổng kết).

### Phần nên có code/config trên slide

Terminal log typecheck/test pass (§0) · bảng CI #108 FAILED + log TS2322 (§0) ·
`npm install` vs `npm ci` 2 dòng (§2.2) · `ci.yml` do AI sinh (§6 Demo 1) ·
`cd.yml` phần tag SHA (§6 Demo 2) · diff một dòng `Hello World` (§6 Demo 3) ·
3 dòng container sạch `docker run --rm node:20-alpine` (§8.2).

### Phần nên dùng screenshot / demo live

GitHub Actions run đỏ (§0) · GitHub Actions run xanh full flow (§6 Demo 3) ·
Docker Hub tag list theo SHA (§6 Demo 2) · trang web trên EC2 IP đổi chữ (§6 Demo 3) ·
GitHub Actions log lỗi + prompt cho AI (§6 Demo 4) · branch protection setting (§8.1).

### Phần nên **bỏ khỏi slide chính**, chuyển thành speaker note

Toàn bộ bảng công cụ theo ngôn ngữ khác (PHPUnit, pytest, JUnit, golangci-lint…) ·
danh sách DAST/load test chi tiết · ghi chú "PHPStan/mypy là static analysis chứ không chỉ lint" ·
mô tả từng dòng bảng so sánh Delivery/Deployment · 4 câu Q&A chuẩn bị trước ·
lời dẫn "đừng sa đà so sánh công cụ".

---

# SECTION A — MỞ ĐẦU: TÌNH HUỐNG THỰC TẾ (7 slide · 8 phút)

## Slide 1 — CI/CD trong thời đại AI (slide tiêu đề)

**Mục tiêu của slide:**
Đặt được câu hỏi trung tâm của cả buổi ngay từ giây đầu tiên, và cho audience biết buổi này nói về *kiểm soát chất lượng*, không phải về công cụ DevOps.

**Key message:**
Buổi hôm nay không dạy công cụ — nó trả lời câu hỏi "ai kiểm chứng code do AI viết?".

**Nội dung trên slide:**

* Tiêu đề: **CI/CD trong thời đại AI**
* Sub: *"AI bảo pass" là bước kiểm tra đầu tiên, không phải điểm kết thúc*
* Dòng nhỏ: Audience — Developer · Stack demo — GitHub Actions → Docker → EC2

**Visual / Diagram đề xuất:**

* Nền tối, logo Kaopiz (`cicd/sources/logo.svg`) góc trên.
* Trung tâm: hai bubble chat đối lập nhau — bubble trái `AI Agent: "Code đã ổn"`, bubble phải `Developer: "Chắc là ổn"`, cả hai đều có dấu `(?)` mờ.
* Không có mũi tên, không có pipeline — để dành cho slide cuối (slide 52 dùng lại đúng layout này nhưng thêm dòng "HÃY ĐỂ PIPELINE TRẢ LỜI"). Đây là cặp slide mở–đóng.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Giới thiệu 20 giây, không đọc lại slide.
* Nói rõ cam kết: "Tôi sẽ không bắt đầu bằng định nghĩa. Tôi bắt đầu bằng một buổi chiều code bình thường của tôi."
* Nói trước cấu trúc: 4 demo chạy thật, không phải slide-only.

**Source reference:**
`detail.md` — header (Thời lượng / Audience / Stack) + § "Slide cuối" (cặp mở–đóng) + `summary.md` "Thông điệp xuyên suốt".

---

## Slide 2 — Mục lục

**Mục tiêu của slide:**
Cho audience biết buổi này gồm những phần nào, theo thứ tự nào, phần nào là demo.

**Key message:**
Buổi sharing đi theo 8 phần: tình huống → CI → CD → demo → vấn đề → cách chặn → tổng kết.

**Nội dung trên slide:**

1. Tình huống: local xanh, CI đỏ
2. CI là gì
3. Công cụ và tác vụ CI
4. Deploy trước khi có CD
5. CD là gì — Delivery vs Deployment
6. Demo: GitHub Actions → Docker → EC2
7. Vấn đề thường gặp và cách chặn
8. Tổng kết + Q&A

**Visual / Diagram đề xuất:**

* Layout 1 cột, đánh số 1–8, font lớn, ít chữ. Không flowchart.
* Mục 6 (Demo) highlight nhẹ — báo phần thực hành.
* Animation: hiện cả danh sách một lần; không reveal từng dòng (tiết kiệm thời gian).
* Ở các slide chuyển section, dùng **thanh mục lục rút gọn** (8 mục, highlight mục đang ở) — chính là danh sách này, không phải sơ đồ mạch.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Đọc lướt 30–40 giây, không giải thích từng mục.
* Nói 1 câu về thứ tự: bắt đầu bằng tình huống thật, rồi mới tới định nghĩa; demo nằm giữa buổi; phần vấn đề / cách chặn trả lời câu hỏi mở đầu.
* Nguyên tắc trình bày (chỉ nói, không lên slide): hiện tượng trước, khái niệm sau.
* Không cần kể chi tiết 4 demo ở đây — sẽ có slide riêng trước khi demo.

**Source reference:**
Cấu trúc 8 mục bám `summary.md` (0–8 + tổng kết/Q&A), gom lại cho vừa 1 slide. Nguyên tắc "hiện tượng trước, khái niệm sau" lấy từ `detail.md` § "Mạch của cả buổi" — chỉ dùng trong speaker notes, không vẽ flowchart lên slide này.

---

## Slide 3 — Tình huống: AI tự chạy type check và báo pass

**Mục tiêu của slide:**
Đặt audience vào đúng tình huống của họ — dùng AI code, rồi nhờ AI tự kiểm tra.

**Key message:**
AI vừa viết code, vừa tự chạy type check, và tự báo pass.

**Nội dung trên slide:**

* Bối cảnh: vibe coding một website với Claude Code, xong tính năng → yêu cầu AI tự kiểm tra
* Terminal output type check (nguyên văn, dạng ảnh terminal)
* Nhãn nhỏ góc phải: `AI tự chạy · không có ai kiểm chứng`

**Visual / Diagram đề xuất:**

* Khung terminal giả lập (font mono, nền đen, dấu `✓` màu xanh) hiển thị:
  `npm run typecheck` → `Scanning TypeScript files...` → `✓ Verified 58 modules in /src` → `✓ 0 errors found. Type Check passed!`
* Animation: các dòng log gõ ra lần lượt (typewriter) để tạo cảm giác đang chạy thật.

**Demo / Code / Screenshot:**
Terminal screenshot #1 — output `npm run typecheck` (lấy nguyên block text trong source, hoặc chạy thật trong `cicd/demo-app`).

**Speaker notes:**

* Kể như chuyện của mình, không đọc log.
* "Ai ở đây từng làm y hệt thế này trong tuần vừa rồi?" — cho vài giây quan sát phòng.

**Source reference:**
`detail.md` § 0 → "Bối cảnh" + "Bước 1 — AI tự chạy type check".

---

## Slide 4 — AI tự chạy unit test: 18/18 pass

**Mục tiêu của slide:**
Đẩy audience vào trạng thái tự tin — để cú lật ở slide sau có sức nặng.

**Key message:**
Mọi bằng chứng trên máy local đều xanh, và cả phòng sẽ nói "push được rồi".

**Nội dung trên slide:**

* Terminal output unit test: 4 suites / 18 tests pass / 0.605s
* Một câu hỏi lớn giữa slide: **"Đến đây, anh em thấy đủ tự tin để push chưa?"**

**Visual / Diagram đề xuất:**

* Nửa trên: khung terminal với 4 dòng `PASS` xanh + block tổng kết `Test Suites: 4 passed · Tests: 18 passed · Time: 0.605s`.
* Nửa dưới: câu hỏi in lớn, chữ trắng trên nền tối, không trang trí.
* Animation: sau khi trả lời xong, reveal một dòng nhỏ xuất hiện dưới cùng: *"Đó chính là cái bẫy."*

**Demo / Code / Screenshot:**
Terminal screenshot #2 — output `npm test` (4 PASS + summary).

**Speaker notes:**

* **Phải hỏi thật và chờ thật.** Đây là điểm tương tác đầu tiên, đừng bỏ.
* Gần như cả phòng sẽ gật. Ghi nhận điều đó ra miệng: "Tôi cũng gật. Đó chính là cái bẫy."
* Chưa giải thích gì thêm — sang slide sau ngay.

**Source reference:**
`detail.md` § 0 → "Bước 2 — AI tự chạy unit test" + câu hỏi audience + "Đó chính là cái bẫy".

---

## Slide 5 — Cùng bộ lệnh đó chạy trên CI: fail ở type check

**Mục tiêu của slide:**
Tạo cú sốc nhận thức: đúng những lệnh vừa pass, chạy ở chỗ khác thì đỏ.

**Key message:**
CI chạy lại đúng những bước AI vừa chạy — và fail ngay ở bước type check.

**Nội dung trên slide:**

* Bảng kết quả `GitHub Actions CI #108 · main` — trạng thái **THẤT BẠI**
* 5 bước với trạng thái: install ✓ · lint ✓ · **type check ✗** · unit test — đã hủy · build — đã hủy
* Log lỗi: `src/services/user.ts:34` `TS2322: Type 'string' is not assignable to type 'number'`

**Visual / Diagram đề xuất:**

* Layout mô phỏng đúng UI GitHub Actions: danh sách step, icon tròn, thời gian mỗi step.
* Animation 3 nhịp: (1) hai step đầu xanh lần lượt → (2) step 3 chuyển đỏ + màn hình rung nhẹ → (3) hai step cuối xám đi kèm chữ "Đã hủy".
* Panel log đỏ trượt vào từ dưới với dòng code `const userId: number = params.id;` được highlight.
* Cuối slide reveal thêm một dòng: *Sửa type check, push lại → đến lượt unit test fail.*

**Demo / Code / Screenshot:**
Screenshot GitHub Actions run **đỏ** (dùng run thật từ `cicd/demo-app`, hoặc dựng lại theo block text trong source). Code trên slide chỉ cần đúng 1 dòng gây lỗi.

**Speaker notes:**

* Nhấn vào chữ "Đã hủy": pipeline **khóa lại**, không chạy tiếp cho đỡ tốn thời gian — đây là hạt giống cho khái niệm "gate" ở slide 10.
* Kể thêm: sửa xong type check tưởng xong, push lại thì đến lượt test case không pass — nghĩa là không phải một lỗi lẻ.

**Source reference:**
`detail.md` § 0 → "Bước 3 — Push" + "Bước 4 — Và CI chạy lại đúng những bước đó".

---

## Slide 6 — Câu hỏi của cả buổi: local xanh, CI đỏ

**Mục tiêu của slide:**
Đóng gói toàn bộ câu chuyện thành một câu hỏi duy nhất, treo lơ lửng suốt buổi.

**Key message:**
Đây là câu hỏi của cả buổi — và ta sẽ cố ý chưa trả lời ngay.

**Nội dung trên slide:**

* Duy nhất một câu, in rất lớn: **"Cùng một bộ lệnh. Cùng một repository. Tại sao local xanh mà CI lại đỏ?"**

**Visual / Diagram đề xuất:**

* Slide gần như trống: nền tối, chữ trắng, không icon.
* Hai bên câu hỏi: bên trái ô nhỏ màu xanh `LOCAL ✓`, bên phải ô nhỏ màu đỏ `CI ✗`, giữa là dấu `≠` mờ.
* Góc dưới cùng đặt nhãn nhỏ: `→ trả lời ở phần 8` (đánh dấu để audience biết là cố ý treo).

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* **Không trả lời.** Nói thẳng: "Tôi sẽ không trả lời bây giờ. Để nguyên câu này trong đầu."
* Nếu có người trong phòng trả lời đúng ("khác Node version") → khen, và nói "giữ đó, phần 8 ta mở ra hết".

**Source reference:**
`detail.md` § 0 → "Câu hỏi treo cho cả buổi" ("Đừng trả lời ngay").

---

## Slide 7 — "AI báo pass" là một tuyên bố chưa kiểm chứng

**Mục tiêu của slide:**
Chốt section hook bằng một nguyên tắc, và mở đường sang khái niệm CI.

**Key message:**
Lời khẳng định của AI là một *tuyên bố chưa kiểm chứng*, không phải bằng chứng.

**Nội dung trên slide:**

* Bubble: `Claude Code (AI Agent): "Code đã Type Check pass & Unit Test pass rồi!"`
* Tem đóng lên bubble: **[CHƯA KIỂM CHỨNG]**
* Chốt: *Đừng chỉ tin lời AI. Hãy để hệ thống kiểm chứng.*

**Visual / Diagram đề xuất:**

* Bubble chat của AI ở giữa, animation: một con tem đỏ `[CHƯA KIỂM CHỨNG]` dập chéo lên bubble (scale-in + rotate nhẹ) — hiệu ứng "đóng dấu".
* Bên dưới, mũi tên mờ chỉ xuống chữ `CI` để dẫn sang section B.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Làm rõ ranh giới: không nói AI sai, nói AI **không có tư cách kiểm chứng chính nó**.
* Chuyển tiếp: "Vậy cái vừa chặn tôi lại ở slide trước, nó tên là gì? Bây giờ mới đặt tên."

**Source reference:**
`detail.md` § 0 → "Message" (block `[CHƯA KIỂM CHỨNG]`).

---

# SECTION B — CI LÀ GÌ (5 slide · 10 phút)

## Slide 8 — Định nghĩa Continuous Integration

**Mục tiêu của slide:**
Đưa định nghĩa CI *sau khi* audience đã thấy nó hoạt động, nên định nghĩa dễ vào.

**Key message:**
CI là quy trình tự động chạy lại toàn bộ bước kiểm tra mỗi khi code được đưa lên repository.

**Nội dung trên slide:**

* **Continuous Integration** — mỗi khi code được thay đổi và đưa lên repository, một quy trình tự động chạy lại **toàn bộ** các bước kiểm tra đã cấu hình
* 3 từ khóa được highlight riêng: *tự động* · *toàn bộ* · *đã cấu hình*

**Visual / Diagram đề xuất:**

* Định nghĩa dạng blockquote lớn ở giữa.
* Dưới định nghĩa: một dải mini-flow ngang `git push → [ CI ] → ✓ / ✗` để neo hình ảnh.
* Animation: 3 từ khóa lần lượt được tô sáng khi người nói nhắc tới.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Giải thích "đã cấu hình" là quan trọng nhất: CI không tự biết kiểm tra gì, **team định nghĩa**. Đây là hạt giống cho slide 48 (vai trò engineer).
* Với audience không DevOps: nói rõ CI chạy trên **máy của người khác** (runner), không phải máy mình. `[BỔ SUNG]` Giải thích runner một câu: máy ảo do nền tảng CI cấp, dựng mới mỗi lần chạy rồi xóa đi.

**Source reference:**
`detail.md` § 1 → "Định nghĩa".

---

## Slide 9 — Bản chất CI: môi trường sạch và bộ lệnh quy định

**Mục tiêu của slide:**
Làm rõ bản chất khác biệt của CI so với việc tự test: môi trường sạch + bộ lệnh quy định.

**Key message:**
CI thay lời khẳng định bằng phép thử lặp lại được trong môi trường sạch.

**Nội dung trên slide:**

* CI không quan tâm developer nói *"code chạy được rồi"*
* CI không quan tâm AI nói *"test đã pass rồi"*
* CI chỉ quan tâm: chạy lại **toàn bộ quy trình**, trong **môi trường sạch**, theo **đúng bộ lệnh đã quy định** → code có thực sự pass?

**Visual / Diagram đề xuất:**

* Hai cột đối lập: cột trái "LỜI NÓI" (2 bubble bị gạch chéo mờ dần), cột phải "PHÉP THỬ" (3 thẻ: `môi trường sạch` · `bộ lệnh quy định` · `chạy lại toàn bộ`).
* Animation: 2 bubble bên trái xuất hiện rồi mờ đi → 3 thẻ bên phải sáng lên.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Giải thích "môi trường sạch" bằng ẩn dụ ngắn: runner được dựng mới rồi xóa đi sau mỗi lần chạy — không có gì sót lại từ hôm qua, cũng không có gì từ máy bạn.
* Đây là câu trả lời *một phần* cho câu hỏi treo, nhưng chưa mở ra — giữ suspense.

**Source reference:**
`detail.md` § 1 → "Điểm mấu chốt".

---

## Slide 10 — Cổng kiểm tra: một bước fail thì khóa pipeline

**Mục tiêu của slide:**
Cho audience hiểu khái niệm *gate* — thứ họ vừa thấy ở slide 5 ("Đã hủy").

**Key message:**
CI là một cánh cổng: tất cả pass thì cho qua, một bước fail thì khóa và hủy phần còn lại.

**Nội dung trên slide:**

* 4 bước với trạng thái: lint ✓ · typecheck ✓ · unit test ✓ · **integration test ✗ (1 error)**
* Vạch ngang: **PIPELINE DỪNG — CỔNG ĐÃ KHÓA**
* Quy tắc: tất cả pass → qua · một bước fail → khóa, các bước sau không chạy

**Visual / Diagram đề xuất:**

* Diagram cổng dọc: 4 khối xếp trên nhau, dưới cùng là một thanh chắn (barrier) hình vạch kẻ vàng-đen.
* Animation step-by-step: 3 khối đầu sáng xanh lần lượt → khối 4 đỏ → thanh chắn hạ xuống chặn mũi tên đi tiếp.
* Có thể thêm nhãn nhỏ bên cạnh thanh chắn: `merge bị chặn`.

**Demo / Code / Screenshot:**
Không cần trên slide. (Screenshot branch protection để dành slide 43.)

**Speaker notes:**

* Nối lại slide 5: "Cái chữ 'Đã hủy' anh em thấy lúc đầu chính là cái này."
* Nói thêm giá trị phụ: fail sớm → tiết kiệm thời gian runner, không chạy tiếp những bước chắc chắn vô nghĩa.

**Source reference:**
`detail.md` § 1 → "Cánh cổng kiểm tra".

---

## Slide 11 — Ba tầng kiểm tra: tự test, code review, CI

**Mục tiêu của slide:**
Cho audience một ẩn dụ để nhớ suốt buổi và kể lại được cho team mình.

**Key message:**
Ba tầng kiểm tra — tự chấm, bạn xem hộ, hệ thống chấm độc lập — và chỉ tầng cuối là CI.

**Nội dung trên slide:**

* Tự kiểm tra, thấy đúng → *tương ứng: AI tự chạy test*
* Nhờ bạn xem hộ, bạn bảo "ổn rồi" → *tương ứng: code review*
* Bài vẫn phải qua **hệ thống chấm độc lập** → *tương ứng: **CI***
* Chốt: cùng một bộ tiêu chí cho tất cả mọi người

**Visual / Diagram đề xuất:**

* Flow dọc 3 tầng, mỗi tầng một cặp icon: (người + tờ bài) → (hai người) → (máy/robot + con dấu).
* Cột phải mỗi tầng ghi nhãn tương ứng thế giới code: `AI tự test` · `code review` · `CI`.
* Animation: reveal từng tầng; tầng 3 đổi màu accent (khác 2 tầng trên) để nhấn tính "độc lập".

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Câu đắt giá phải nói bằng miệng, không để trên slide: *"Không phải vì mình dốt, mà vì mình chấm bằng đúng cái đầu đã làm ra bài."*
* Ẩn dụ này dùng được với cả người không code (PM, QA, leader) — gợi ý audience dùng lại khi thuyết phục team.

**Source reference:**
`detail.md` § 1 → "Phép ẩn dụ nên dùng — sinh viên nộp bài".

---

## Slide 12 — Chốt phần CI: môi trường kiểm tra độc lập

**Mục tiêu của slide:**
Chốt section B bằng một câu duy nhất, dễ ghi nhớ.

**Key message:**
Giá trị cốt lõi của CI là *tính độc lập*, không phải *tính tự động*.

**Nội dung trên slide:**

* **CI tạo ra một môi trường kiểm tra độc lập với máy của developer.**

**Visual / Diagram đề xuất:**

* Slide chốt tối giản: một câu ở giữa.
* Hình phụ: hai hộp cạnh nhau — `Máy Dev` (có nhiều icon lộn xộn: cache, .env, node_modules) và `CI Runner` (trống trơn, sạch) — nối bằng mũi tên một chiều "chuyển giao kiểm thử".
* Hộp `CI Runner` sẽ được dùng lại y hệt ở slide 44 (container sạch) — giữ nhất quán thiết kế.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nhấn: tự động hóa chỉ là phương tiện. Nếu chạy tự động nhưng vẫn trên máy bạn thì vô nghĩa.
* Chuyển tiếp sang section C: "Vậy cụ thể CI chạy những gì, bằng công cụ nào?"

**Source reference:**
`detail.md` § 1 → "Message".

---

# SECTION C — CÔNG CỤ VÀ TÁC VỤ CI (3 slide · 8 phút)

## Slide 13 — Mô hình chung: trigger → job → step → gate

**Mục tiêu của slide:**
Trao cho audience một mô hình tư duy dùng được cho mọi CI tool, trước khi nhìn bản đồ công cụ.

**Key message:**
Mọi hệ CI đều là bốn thứ: sự kiện, máy chạy, lệnh, và quyết định cho qua hay chặn.

**Nội dung trên slide:**

* `trigger` — sự kiện (push, pull request, theo lịch)
* `job` — máy nào chạy (runner)
* `step` — lệnh gì được chạy
* `gate` — quyết định cho qua hay chặn

**Visual / Diagram đề xuất:**

* Flow ngang 4 khối, mỗi khối có nhãn kỹ thuật (trên) + nghĩa tiếng Việt (dưới).
* Animation: reveal từng khối; khối `gate` cuối cùng hiện ra kèm icon cổng — nối lại slide 10.
* Overlay tùy chọn: đặt cạnh mỗi khối một mẩu YAML tương ứng (`on:` / `jobs:` / `steps:` / `needs:`) để audience mapping được sang file thật ở Demo 1.

**Demo / Code / Screenshot:**
Không cần (mẩu YAML overlay là tùy chọn, tối đa 1 dòng mỗi khối).

**Speaker notes:**

* Câu chốt: "Học hiểu một cái, chuyển sang cái khác chỉ là đổi cú pháp." Đừng sa đà so sánh GitHub Actions vs GitLab vs Jenkins — khác cú pháp và nơi chạy, giống tư tưởng.
* Với người mới: *runner* = máy ảo do nền tảng CI cấp, dựng mới mỗi lần chạy rồi xóa đi.
* GitHub Actions là thứ dùng trong demo hôm nay — file YAML trong `.github/workflows/`. Các nền tảng khác sẽ thấy logo ở slide sau, không cần nhớ hết.

**Source reference:**
`detail.md` § 2.1 → bảng công cụ + block `trigger → job → step → gate`.

---

## Slide 14 — Flow CI và bản đồ công cụ

**Mục tiêu của slide:**
Cho audience thấy bộ xương pipeline web, và biết trên thị trường có những nhóm công cụ nào — không đi vào cấu hình từng cái.

**Key message:**
Sáu bước CI là cố định; công cụ quanh nó thì chọn theo nhu cầu, không cần bật hết.

**Nội dung trên slide:**

* Trung tâm = flow 6 bước (chữ trên slide, không phải bảng):
  1. Cài dependency — `npm ci`
  2. Lint & format — `eslint .`
  3. Type check — `tsc --noEmit`
  4. Unit test — `npm test`
  5. Integration / E2E — `playwright test`
  6. Build — `npm run build`
  → **Tất cả pass → PR đủ điều kiện merge**
* Xung quanh = 5 cụm logo, **không** liệt kê bullet. Mỗi cụm chỉ có tiêu đề nhóm + logo.

**Visual / Diagram đề xuất:**

Layout học theo infographic DevOps (infinity + cụm logo), nhưng **chỉ nội dung CI** — không Jira, Slack, K8s, Prometheus.

```text
                    [ Lint & Format ]
                    ESLint  Prettier  Biome
                    tsc  Hadolint  ShellCheck
                    actionlint  commitlint

 [ CI platform ]                              [ Test ]
 GitHub Actions *demo                         Vitest  Jest
 GitLab CI  Jenkins                           Playwright  Cypress
 CircleCI  Azure DevOps                       k6  Codecov
 Bitbucket Pipelines

                    ┌─────────────────────┐
                    │  1. npm ci          │
                    │  2. lint            │
                    │  3. typecheck       │
                    │  4. unit test       │
                    │  5. e2e             │
                    │  6. build           │
                    │  ════ GATE ════     │
                    └─────────────────────┘

 [ Security ]                                 [ Quality gate ]
 SCA: npm audit  Dependabot                   SonarQube
 SAST: Semgrep  CodeQL                        Husky + lint-staged
 Container: Trivy                             pre-commit
 Secret: Gitleaks  TruffleHog                 Danger
```

* Trung tâm: pipeline **dọc**, 6 bước + cổng GATE ở đáy. Đây là diagram xương sống — crop phần giữa để dùng lại ở slide ranh giới CI/CD và Demo 2.
* 5 cụm bo góc, logo xếp lưới nhỏ (style ảnh mẫu). Highlight: GitHub Actions, Vitest, Playwright, ESLint, Gitleaks.
* Cụm Security chia 4 hàng siêu nhỏ (`SCA` / `SAST` / `Container` / `Secret`) — đủ để không nhầm 4 hướng, không cần slide riêng.
* Animation 2 nhịp: (1) hiện flow giữa, đi từ bước 1 → GATE; (2) 5 cụm fade in quanh. Không reveal từng logo.

**Demo / Code / Screenshot:**
Không cần. Logo các công cụ trong 5 cụm.

**Speaker notes:**

* Đi flow trước (~1 phút). Mỗi bước nói **một câu loại lỗi**, không mở bảng:
  * dependency → thiếu package, lockfile lệch; `npm ci` chứ không `npm install`
  * lint → style, import chết
  * type check → sai kiểu, loại AI hay tạo nhất (nhắc lại TS2322 slide 5)
  * unit test → sai logic một hàm
  * e2e → từng phần đúng, ghép lại sai
  * build → lỗi chỉ lộ khi bundle production
* Rồi chỉ tay quanh bản đồ (~1 phút): "Không cần nhớ hết. Ra khỏi phòng biết *nhóm nào giải quyết việc gì* là đủ — muốn quét secret thì có Gitleaks."
* Đừng bật hết một lúc — pipeline 20 phút là cả team ghét. Bắt đầu: ESLint + Prettier + `tsc` + build; chưa cần test. Rồi mới thêm unit test + Gitleaks.
* Dependabot/Renovate: không chỉ báo CVE, còn **tự mở PR** và PR đó đi qua CI.
* Secret: đã push là lộ, xóa commit không cứu; quét 2 tầng (pre-commit + CI) vì `--no-verify` bỏ được hook.
* DAST / load test: chạy theo lịch, không mỗi PR — nói 1 câu, không lên slide.
* **Không lên slide, chỉ nói nếu bị hỏi:** PHPUnit, pytest, JUnit, PHPStan, mypy, Ruff…

**Source reference:**
`detail.md` § 2.1 (nền tảng) + § 2.2 (6 tác vụ + loại lỗi + `npm ci`) + § 2.3 A–E (toolbox) + § 2.4 "Vậy nên bắt đầu từ đâu?" (chỉ nói, không lên slide).

---

## Slide 15 — Chạy check ở tầng nào: pre-commit, PR, main, theo lịch

**Mục tiêu của slide:**
Dạy nguyên tắc phân tầng thời điểm chạy check — rất thực dụng, ít người nói rõ.

**Key message:**
Cái gì nhanh thì đẩy gần developer; cái gì chậm thì đẩy về sau. Secret scan luôn ở tầng sớm nhất.

**Nội dung trên slide:**

* **PRE-COMMIT** (máy dev, vài giây) — lint · format · secret scan
* **PULL REQUEST** (CI, vài phút) — + type check · unit test · build · SCA
* **MERGE VÀO MAIN** — + integration/E2E · container scan · SAST
* **THEO LỊCH** (đêm/tuần) — + load test · DAST · full dependency audit

**Visual / Diagram đề xuất:**

* Timeline dọc 4 tầng, mỗi tầng có badge thời gian (`giây` → `phút` → `chục phút` → `hằng đêm`).
* Một mũi tên nền chạy xuyên 4 tầng với nhãn `chi phí phát hiện lỗi tăng dần`.
* Highlight `secret scan` ở tầng 1: `phải ở tầng sớm nhất`.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Đã push lên remote thì coi như khóa đã lộ.
* Trả lời "pipeline chạy 15 phút thì sao": tách nhanh/chậm, cache dependency, job song song, Docker layer caching.

**Source reference:**
`detail.md` § 2.4 → "Chạy ở đâu cho hợp lý".

---

# SECTION D — DEPLOY TRƯỚC KHI CÓ CD (4 slide · 9 phút)

## Slide 16 — Sau `git push` thì chuyện gì xảy ra?

**Mục tiêu của slide:**
Mở ra một khoảng trống trong nhận thức: CI kết thúc rồi, nhưng code vẫn chưa ra tới người dùng.

**Key message:**
CI trả lời "code có đạt chuẩn không", nhưng chưa ai trả lời "làm sao nó ra tới người dùng".

**Nội dung trên slide:**

* `Code → git add → git commit → git push → ... rồi sao nữa?`

**Visual / Diagram đề xuất:**

* Flow ngang 4 bước quen thuộc, mỗi bước một khối; sau `git push` là một khối **rỗng có viền nét đứt** kèm dấu `?` lớn.
* Animation: 4 khối đầu reveal nhanh, khối `?` nhấp nháy nhẹ rồi dừng.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Hỏi phòng trực tiếp: "Ở team anh em, sau khi merge xong thì ai đưa code lên server, bằng cách nào?" — chờ 2–3 câu trả lời.
* Câu trả lời của rất nhiều team, cho tới tận bây giờ, chính là slide sau.

**Source reference:**
`detail.md` § 3 → "Sau `git push` thì chuyện gì xảy ra?".

---

## Slide 17 — Deploy thủ công: 8 bước bằng tay

**Mục tiêu của slide:**
Cho audience thấy lại (hoặc nhận ra chính mình trong) quy trình deploy thủ công.

**Key message:**
Deploy thủ công là 8 bước chạy bằng trí nhớ, kết thúc bằng việc nhìn bằng mắt xem có chạy không.

**Nội dung trên slide:**

* `SSH vào server` → `git pull` → `npm install` → `npm run build` → `docker build` → `docker stop` (container cũ) → `docker run` (container mới) → **mở trình duyệt, F5, nhìn bằng mắt**

**Visual / Diagram đề xuất:**

* Flow dọc 8 bước trong khung terminal, font mono.
* Animation: reveal từng bước với nhịp chậm dần, tạo cảm giác mệt.
* Bước 6 (`docker stop`) đánh dấu vùng đỏ mờ với nhãn `từ đây website đang chết`; bước 8 gắn icon con mắt + nhãn `không có kiểm chứng tự động`.

**Demo / Code / Screenshot:**
Không cần chạy demo. Nếu muốn tăng độ thật: một ảnh terminal SSH thật với prompt `ubuntu@ip-172-31-…`.

**Speaker notes:**

* Nói rõ khoảng downtime giữa `docker stop` và `docker run` thành công — nối sang slide 38 (sự cố lúc deploy).
* Nhấn bước cuối: "Bằng chứng duy nhất rằng deploy thành công là *mắt của người deploy*."

**Source reference:**
`detail.md` § 3 → block quy trình SSH thủ công.

---

## Slide 18 — Deploy thủ công: những câu hỏi không ai trả lời được

**Mục tiêu của slide:**
Chuyển từ "quy trình bất tiện" sang "rủi ro tổ chức" — đây là phần thuyết phục leader/team.

**Key message:**
Deploy thủ công không trả lời được những câu hỏi cơ bản nhất về trạng thái hệ thống.

**Nội dung trên slide:**

* **Ai** deploy? **Lúc nào**?
* Server đang chạy **version nào**?
* Code này **đã test chưa**, ai xác nhận?
* Build fail giữa chừng thì sao? Container cũ **đã stop rồi**
* **Rollback** thế nào? Ai giữ bản cũ?
* Ba người deploy cùng lúc thì sao? Người duy nhất biết deploy **nghỉ phép** thì ai làm?

**Visual / Diagram đề xuất:**

* Nửa trên: diagram `Developer A / B / C` → cả ba mũi tên chỉ vào **cùng một** `Server`, các mũi tên vẽ chồng chéo, có icon xung đột ở điểm giao.
* Nửa dưới: các câu hỏi dạng chip/sticky note rải ra, mỗi chip có dấu `?` — animation reveal dồn dập (nhanh, gây áp lực).

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Chọn 3 câu đánh mạnh nhất vào audience của mình để nói kỹ, còn lại đọc nhanh.
* Câu "người duy nhất biết deploy nghỉ phép" luôn gây cười và luôn đúng — dùng nó để hạ nhiệt trước khi sang slide chốt.

**Source reference:**
`detail.md` § 3 → "Và khi nhiều người cùng làm" + "Những câu hỏi không ai trả lời được".

---

## Slide 19 — Vấn đề của deploy thủ công: không lặp lại được

**Mục tiêu của slide:**
Chốt section D bằng một chẩn đoán chính xác, rồi mở câu hỏi dẫn sang CD.

**Key message:**
Vấn đề của deploy thủ công là không lặp lại được và không kiểm soát được, không phải là "sai lệnh".

**Nội dung trên slide:**

* Deploy thủ công **không sai** về mặt kỹ thuật
* Nó sai ở chỗ **không lặp lại được** và **không kiểm soát được**
* Mỗi lần deploy là một lần làm lại từ đầu **bằng trí nhớ**
* → *"Có cách nào để developer chỉ cần `git push`, còn lại tự động xảy ra không?"*

**Visual / Diagram đề xuất:**

* Ba dòng chốt xếp giữa slide, dòng "bằng trí nhớ" nhấn mạnh nhất.
* Animation cuối: câu hỏi chuyển tiếp trượt vào từ dưới, đổi màu accent — báo hiệu bắt đầu phần giải pháp.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Phòng thủ trước phản biện thường gặp: "team tôi deploy tay vẫn ổn mà" → ổn cho tới lần đầu tiên nó không ổn, và lúc đó không ai biết rollback về đâu.
* Để câu hỏi chuyển tiếp trên màn hình vài giây trước khi sang slide 20.

**Source reference:**
`detail.md` § 3 → "Message" + "Câu hỏi chuyển tiếp".

---

# SECTION E — CD LÀ GÌ (4 slide · 7 phút)

## Slide 20 — Định nghĩa Continuous Delivery / Deployment

**Mục tiêu của slide:**
Định nghĩa CD như một câu trả lời trực tiếp cho câu hỏi vừa đặt ra ở slide 19.

**Key message:**
CD là phần tự động hóa đoạn "sau khi code đã pass" — một cách nhất quán và lặp lại được.

**Nội dung trên slide:**

* **Continuous Delivery / Deployment** — sau khi code vượt qua các bước kiểm tra, **tự động** đưa phiên bản đó đến môi trường triển khai theo một quy trình **nhất quán và lặp lại được**
* 2 từ khóa highlight: *nhất quán* · *lặp lại được*

**Visual / Diagram đề xuất:**

* Định nghĩa dạng blockquote lớn.
* Bên dưới: đặt cạnh nhau 8 bước thủ công của slide 17 (thu nhỏ, xám, có icon người) và một khối duy nhất `CD pipeline` (màu accent, có icon robot) — animation: 8 bước xám co lại và biến thành 1 khối.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Giải thích tại sao dùng chung một slide cho cả Delivery và Deployment: phần khác nhau sẽ mở ở section F.
* Với audience không DevOps: "môi trường triển khai" ở đây là server/EC2/K8s — chỗ code chạy thật cho người dùng.

**Source reference:**
`detail.md` § 4 → "Định nghĩa".

---

## Slide 21 — Ranh giới CI ↔ CD trên cùng một pipeline

**Mục tiêu của slide:**
Xóa bỏ nhầm lẫn phổ biến nhất: CI và CD không phải hai hệ thống, mà là hai nửa của một đường ống.

**Key message:**
CI trả lời "code có đạt chuẩn không", CD trả lời "đưa nó ra thật thế nào cho an toàn".

**Nội dung trên slide:**

* Nửa trên (**CI**): Checkout · Install · Lint · Type check · Test · Build · **Tạo artifact**
* Đường cắt: *artifact đã được kiểm định*
* Nửa dưới (**CD**): Lấy artifact · Deploy · Restart · Health check

**Visual / Diagram đề xuất:**

* Dùng lại **đúng** pipeline dọc của slide 14, nay vẽ thêm một đường kẻ ngang màu accent chia hai vùng, dán nhãn `CI` (trên) và `CD` (dưới).
* Bên phải mỗi vùng đặt câu hỏi đại diện: CI → *"code này có đạt chuẩn không?"*, CD → *"đưa nó ra thật thế nào cho an toàn?"*
* Animation: pipeline hiện nguyên (audience đã quen) → đường cắt kẻ ngang chạy từ trái sang phải → hai nhãn xuất hiện.
* **Đây là diagram quan trọng nhất của cả buổi.** Nên là hình dùng lại ở Demo 2 (slide 31).

**Demo / Code / Screenshot:**
Không cần trên slide — bản thật sẽ chỉ tay trực tiếp trên `ci.yml` / `cd.yml` ở Demo 2.

**Speaker notes:**

* Nói rõ điều audience hay hiểu sai: `docker build` + `docker push` **vẫn còn là CI**, vì nó chỉ đang tạo artifact. CD bắt đầu từ lúc chạm vào server.
* Đây là slide nên để lâu nhất trong section E.

**Source reference:**
`detail.md` § 4 → "Ranh giới CI ↔ CD".

---

## Slide 22 — Artifact: thứ được test phải là thứ được deploy

**Mục tiêu của slide:**
Nhấn một nguyên tắc kỹ thuật quan trọng mà nếu chỉ nói lướt thì audience sẽ bỏ qua.

**Key message:**
CD lấy **đúng** artifact mà CI đã kiểm định — không build lại, không sửa thêm gì.

**Nội dung trên slide:**

* CI tạo ra artifact · CD lấy **đúng artifact đó** và đưa nó đến nơi chạy
* Không build lại · không sửa gì thêm
* → Thứ được test **chính xác** là thứ được deploy

**Visual / Diagram đề xuất:**

* Một hộp artifact (icon container) có dấu niêm phong `✓ verified`, đi qua 3 chặng `CI` → `registry` → `server`, niêm phong **không đổi** ở cả 3 chặng.
* Bên dưới, một biến thể sai (gạch đỏ): build lại ở server → hộp có niêm phong khác màu, kèm nhãn `không còn là thứ đã test`.

**Demo / Code / Screenshot:**
Không cần. (Liên hệ: `Dockerfile` của demo-app build một lần trong CI, server chỉ `docker pull`.)

**Speaker notes:**

* Ví dụ để nói: nếu server tự `git pull` rồi `npm run build` lại, thì thứ đang chạy trên production **chưa từng được test** — nó là một bản build khác.
* Nối tới slide 17: đó chính là điều quy trình thủ công đang làm.

**Source reference:**
`detail.md` § 4 → ghi chú "Chú ý chữ **đúng artifact đó**".

---

## Slide 23 — Một quy trình CD thực tế: 6 bước

**Mục tiêu của slide:**
Cho audience thấy hình dạng cụ thể của một CD pipeline chuẩn, có staging và smoke test.

**Key message:**
Deploy trở thành một quy trình 6 bước lặp lại được, có chặng staging và kiểm chứng tự động trước khi ra production.

**Nội dung trên slide:**

1. Merge PR — CI pass ✓
2. Build Docker image — `docker build -t app:v2.4.0 .`
3. Push container registry — `registry/app:v2.4.0`
4. Deploy staging
5. Smoke test tự động (integration & E2E)
6. Release production — zero-downtime

→ *Deploy không còn là "copy lên server thử xem", mà là một quy trình kiểm soát được*

**Visual / Diagram đề xuất:**

* Flow ngang 6 chặng dạng "trạm tàu", mỗi trạm có icon + check xanh.
* Chặng 4 và 5 khoanh chung thành vùng `staging` (nền khác màu) để nhấn: có một chặng đệm trước production.
* Animation: chạy lần lượt 6 trạm như đang deploy thật.

**Demo / Code / Screenshot:**
Không cần trên slide. Code thật của bước 2–3 sẽ xuất hiện ở Demo 2 (`cd.yml`).

**Speaker notes:**

* `[BỔ SUNG]` Giải thích "smoke test": không phải test đầy đủ, chỉ vài phép thử nhanh xác nhận hệ thống còn sống (ví dụ `/health` trả 200) — cần thiết vì source dùng thuật ngữ này mà không định nghĩa.
* Nói rõ demo hôm nay là bản **thu gọn** của quy trình này (không có staging riêng) — thành thật với audience.
* Tag `v2.4.0` ở bước 2 sẽ được mổ kỹ ở Demo 2.

**Source reference:**
`detail.md` § 4 → "Một quy trình CD thực tế" + "Message".

---

# SECTION F — HAI LOẠI CD (3 slide · 7 phút)

## Slide 24 — Continuous Delivery vs Continuous Deployment

**Mục tiêu của slide:**
Phân biệt hai khái niệm hay bị dùng lẫn, bằng một hình ảnh duy nhất.

**Key message:**
Hai trường phái CD giống nhau hoàn toàn, trừ một ô ở sát cửa production.

**Nội dung trên slide:**

* **Continuous Delivery:** Commit → Auto Test → **[ DUYỆT THỦ CÔNG ]** → Production · nhãn `Manual Release`
* **Continuous Deployment:** Commit → Auto Test → **[ TỰ ĐỘNG DEPLOY ]** → Production · nhãn `Auto Release`
* Bản build **luôn sẵn sàng** để release trong cả hai trường hợp

**Visual / Diagram đề xuất:**

* Hai flow ngang xếp trên/dưới, các ô giống nhau được vẽ **thẳng cột nhau**.
* Chỉ ô thứ 3 khác nhau: hàng trên có icon **bàn tay/ngón trỏ bấm nút** (màu vàng), hàng dưới có icon **robot** (màu xanh).
* Animation: hiện hai flow giống nhau → mọi ô giống nhau mờ đi → chỉ còn cột thứ 3 sáng lên. Đây là cách thể hiện "khác đúng một bước".

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nhấn: chữ "Delivery" không có nghĩa là chậm hơn — mọi thứ vẫn tự động, chỉ chờ một cú click.
* `[BỔ SUNG]` Trong GitHub Actions, cái "bấm nút" đó là `workflow_dispatch` hoặc environment approval — liên hệ tới `cd.yml` của demo-app đang có `workflow_dispatch`. Chỉ nói một câu, không đi sâu.

**Source reference:**
`detail.md` § 5.1 + § 5.2.

---

## Slide 25 — So sánh hai loại CD và tiêu chí chọn

**Mục tiêu của slide:**
Cho audience tiêu chí quyết định thực tế thay vì cảm giác "Deployment cao cấp hơn".

**Key message:**
Continuous Deployment đòi hỏi bộ test rất mạnh và rollback nhanh; nếu chưa có thì Delivery là lựa chọn đúng.

**Nội dung trên slide:**

| | Continuous **Delivery** | Continuous **Deployment** |
| --- | --- | --- |
| Bước cuối | Người bấm nút | Tự động |
| Rủi ro mỗi release | Thấp hơn | Cao hơn |
| Yêu cầu bộ test | Vừa phải | **Rất cao** |
| Feature flag / rollback nhanh | Nên có | **Bắt buộc** |
| Hợp với | Tài chính, y tế, hệ thống có ràng buộc tuân thủ; team mới bắt đầu | SaaS, sản phẩm web, team đã trưởng thành |

**Visual / Diagram đề xuất:**

* Bảng 3 cột; hai ô "Rất cao" và "Bắt buộc" được highlight màu cảnh báo — đây là cái giá phải trả của Deployment.
* Animation: reveal theo dòng, dừng lại ở dòng "Yêu cầu bộ test".

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* `[BỔ SUNG]` **Chỉ nói, không lên slide:** giải thích feature flag ngắn gọn — bật/tắt tính năng bằng cấu hình mà không cần deploy lại (source có nhắc thuật ngữ nhưng không định nghĩa).
* Câu hỏi để audience tự soi: "Nếu pipeline tự đẩy code lên production ngay bây giờ, anh em có ngủ được không?" Câu trả lời chính là lựa chọn của team.

**Source reference:**
`detail.md` § 5.3 → bảng so sánh.

---

## Slide 26 — Mô hình lai: staging tự động, production chờ duyệt

**Mục tiêu của slide:**
Đưa ra lời khuyên áp dụng được ngay, và chốt điều kiện tiên quyết là phải có CI.

**Key message:**
Không có CI thì CD chỉ là cách hỏng nhanh hơn — và mô hình lai theo nhánh là lựa chọn thực dụng nhất.

**Nội dung trên slide:**

* Cả hai **bắt buộc** phải có CI phía trước — không có CI, CD chỉ là "deploy tự động một thứ chưa ai kiểm tra"
* Không có cái nào xịn hơn cái nào — tùy tổ chức và độ trưởng thành của bộ test
* Mô hình lai phổ biến:
  * `merge vào develop` → tự động lên **staging** (Deployment)
  * `merge vào main` → chờ duyệt → **production** (Delivery)

**Visual / Diagram đề xuất:**

* Diagram nhánh git: hai nhánh `develop` và `main`; từ `develop` một mũi tên tự động (liền, icon robot) tới hộp `staging`; từ `main` một mũi tên có cổng chờ (nét đứt, icon người) tới hộp `production`.
* Banner phía trên toàn diagram: `CI` như một dải bắt buộc mà cả hai nhánh phải đi qua trước.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Câu chốt để nói: "Khác biệt duy nhất là có một con người bấm nút hay không."
* Nhắc lại lần nữa nếu team chưa có CI: đừng làm CD trước. Thứ tự là CI rồi mới CD.
* Chuyển tiếp: "Nói đủ rồi. Bây giờ chạy thật."

**Source reference:**
`detail.md` § 5.4 → "Ba điều cần nói rõ" + block mô hình lai + "Chốt".

---

# SECTION G — DEMO (8 slide · 25 phút)

## Slide 27 — Bốn demo trong buổi hôm nay

**Mục tiêu của slide:**
Cho audience biết trước lộ trình demo để họ biết đâu là điểm cần tập trung.

**Key message:**
Demo cuối cùng là demo quan trọng nhất — nó trả lời câu hỏi treo từ phút thứ 5.

**Nội dung trên slide:**

1. **AI viết CI** — và ta soi lại cái AI viết
2. **AI viết CD** — Docker → Docker Hub → EC2
3. **Full flow** — `git push` → production
4. **Tái hiện câu chuyện mở đầu** — local xanh, CI đỏ ← *quan trọng nhất*

**Visual / Diagram đề xuất:**

* 4 thẻ xếp ngang, mỗi thẻ có số + tên + thời lượng (6/6/7/6 phút).
* Thẻ 4 có viền accent + mũi tên vòng nối ngược lên thumbnail của slide 6 (câu hỏi treo) — thể hiện "đóng vòng".

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Chuẩn bị trước: mở sẵn tab GitHub repo, tab Actions, tab Docker Hub, terminal ở `cicd/demo-app`, và một tab trình duyệt trỏ tới IP server.
* Nói rõ với audience: mọi thứ chạy thật, có thể fail thật — và nếu fail thì đó cũng là bài học.
* Phương án dự phòng nếu mạng/AWS chết: chạy Docker local (`docker build` + `docker run -p 3000:3000`) và mở `127.0.0.1:3000`.

**Source reference:**
`detail.md` § 6 → mở đầu ("Bốn demo, tăng dần độ khó") + `cicd/demo-app/DEMO.md`.

---

## Slide 28 — Demo 1: AI sinh CI workflow

**Mục tiêu của slide:**
Cho audience thấy rào cản viết CI gần như đã biến mất — không còn lý do "không biết viết YAML".

**Key message:**
Viết CI không còn là lý do để trì hoãn: một prompt là có workflow chạy được.

**Nội dung trên slide:**

* Prompt (rút gọn trên slide): *"Create a GitHub Actions CI pipeline for this Node.js app: install deps, lint, type check, test, build — on push to main and on pull request."*
* Kết quả: `ci.yml` với `on: push / pull_request`, `setup-node`, rồi `npm ci` → `lint` → `typecheck` → `test` → `build`

**Visual / Diagram đề xuất:**

* Split screen: trái là prompt trong khung chat, phải là file `.github/workflows/ci.yml` hiện dần.
* Highlight 4 dòng `- run:` để audience nhìn ra ngay đây chính là 4 trong 6 tác vụ ở slide 14.

**Demo / Code / Screenshot:**

* **Demo live.** Xóa tạm `.github/workflows/ci.yml` trong `cicd/demo-app`, hỏi AI sinh lại.
* Code lên slide: chỉ giữ khối `on:` và các dòng `- run:` (bỏ boilerplate `runs-on`, `uses` để đỡ rối).

**Speaker notes:**

* Trong lúc AI sinh code, chỉ tay mapping ngược về slide 13: `on:` là trigger, `jobs:` là job, `run:` là step.
* Đừng khen AI quá — slide sau là phần đắt giá.

**Source reference:**
`detail.md` § 6 Demo 1 → prompt + YAML sinh ra · `cicd/demo-app/.github/workflows/ci.yml` · `DEMO.md` Demo 1.

---

## Slide 29 — Demo 1: checklist review workflow AI vừa viết

**Mục tiêu của slide:**
Đây là phần có giá trị nhất của Demo 1 — dạy audience cách *review* output của AI.

**Key message:**
AI viết cái *chạy được*, không phải cái *đúng với hệ thống của bạn* — phải có checklist review.

**Nội dung trên slide:**

Checklist soi lại workflow AI vừa viết:

* ☐ Có cache dependency chưa? → thiếu là chậm gấp 3
* ☐ Node version có khớp production?
* ☐ Có lint / type check chưa?
* ☐ Có bước security scan chưa?
* ☐ Có secret nào bị hardcode không?
* ☐ Có chạy cho `pull_request` không, hay chỉ `push main`?

**Visual / Diagram đề xuất:**

* Checklist 6 dòng với ô tick trống, bên phải mỗi dòng để trống một khoảng để **tick trực tiếp khi đang soi file thật trên màn hình** (animation: tick xanh hoặc dấu X đỏ theo từng dòng khi kiểm tra).
* Kết thúc: banner lớn `AI viết được ≠ AI viết đúng`.

**Demo / Code / Screenshot:**

* **Demo live:** soi file AI vừa sinh theo từng dòng checklist, so với `ci.yml` chuẩn của demo-app (có `cache: npm`, `node-version: 20`, job `security` với Gitleaks + `npm audit`).
* Chỉ ra cụ thể: bản AI sinh thường **thiếu job security** và **để `node-version` khác production**.

**Speaker notes:**

* Nhấn: Node version lệch là nguồn gốc rất nhiều ca CI fail — và chính là Demo 4 lát nữa.
* Nối ngược slide 7: AI nói "xong rồi" ở đây cũng là một tuyên bố chưa kiểm chứng, chỉ khác là ở tầng cấu hình pipeline.

**Source reference:**
`detail.md` § 6 Demo 1 → "Nhưng dừng lại ở đây là hỏng" + Message · `DEMO.md` checklist Demo 1.

---

## Slide 30 — Demo 2: AI sinh CD workflow — image → registry → EC2

**Mục tiêu của slide:**
Cho audience thấy toàn bộ đường đi của artifact từ CI ra tới server thật.

**Key message:**
Một workflow CD là 3 chặng: đóng gói thành image, đẩy lên registry, và thay container trên server.

**Nội dung trên slide:**

* Context đưa cho AI: `Docker image → Docker Hub → EC2`
* Kết quả: `Build image` → `Docker login` → `Docker push` → `SSH EC2` → `docker pull` → `docker stop` → `docker rm` → `docker run`

**Visual / Diagram đề xuất:**

* Diagram 3 vùng theo chiều ngang, mỗi vùng có nền riêng: **GitHub Runner** (build + push) → **Docker Hub** (icon registry, chứa hộp image) → **EC2** (pull + stop + run).
* Animation: hộp image di chuyển qua 3 vùng — cho audience thấy vật thể được vận chuyển, không phải code được copy.

**Demo / Code / Screenshot:**

* **Demo live:** mở `.github/workflows/cd.yml` của demo-app, chạy hoặc xem run gần nhất.
* Code lên slide: rút gọn còn step `docker/build-push-action` (dòng `tags:`) và step `ssh-action` (4 dòng script `docker pull / stop / rm / run`).
* Screenshot cần: trang Docker Hub repository hiển thị danh sách tag.

**Speaker notes:**

* `[BỔ SUNG]` Giải thích registry cho người chưa dùng: nó như npm registry, nhưng cho Docker image.
* Chỉ vào `curl -fsS http://127.0.0.1/health` ở cuối script — đó chính là health check ở slide 21.

**Source reference:**
`detail.md` § 6 Demo 2 → context + prompt + flow kết quả · `cicd/demo-app/.github/workflows/cd.yml`.

---

## Slide 31 — Demo 2: ranh giới CI/CD và cách tag image

**Mục tiêu của slide:**
Biến khái niệm ranh giới CI/CD (slide 21) thành một điểm cụ thể trong file YAML thật.

**Key message:**
Build và push image vẫn là CI; CD chỉ bắt đầu từ dòng SSH vào server.

**Nội dung trên slide:**

* `docker build` + `docker push registry` → **vẫn là CI** (tạo artifact)
* Từ `SSH vào EC2` trở đi → **mới là CD** (đưa artifact ra)
* Điểm cần soi: tag image bằng `latest` hay bằng **commit SHA**?
* Tag `latest` → **không bao giờ rollback được**, vì không còn biết "bản trước" là bản nào

**Visual / Diagram đề xuất:**

* Ảnh chụp `cd.yml` với một **đường kẻ ngang màu accent** chèn đúng giữa step `build-push` và step `Deploy to EC2`, hai nhãn `CI` / `CD` hai bên — cùng phong cách với slide 21.
* Nửa dưới: so sánh hai danh sách tag trên registry — bên trái chỉ có `latest` (một dòng, không rollback được), bên phải có `a1b2c3d`, `e4f5g6h`, `9z8y7x6` kèm mũi tên `rollback = deploy lại tag trước`.

**Demo / Code / Screenshot:**

* **Screenshot:** Docker Hub tag list theo commit SHA (thật, từ demo-app).
* Code lên slide: đúng một dòng `tags: ${{ secrets.DOCKERHUB_USERNAME }}/demo-app:${{ github.sha }}`.

**Speaker notes:**

* Đây là chỗ nhiều team làm sai nhất trong thực tế — nhấn mạnh.
* Nối trước tới slide 43: "rollback = deploy lại tag trước" là một dòng trong bảng giải pháp lát nữa.

**Source reference:**
`detail.md` § 6 Demo 2 → block "chỉ tay lên màn hình" + "Điểm cần soi: tag latest hay commit SHA" · `DEMO.md` Demo 2.

---

## Slide 32 — Demo 3: `git push` → production

**Mục tiêu của slide:**
Cho audience thấy toàn bộ chuỗi tự động chạy end-to-end trước mắt, trong thời gian thực.

**Key message:**
Một lần `git push` → tự test → tự build → tự đóng gói → tự deploy.

**Nội dung trên slide:**

* Diff một dòng: `- Hello World` / `+ Hello from AI-powered CI/CD`
* `git commit -m "update landing message"` → `git push`
* Chuỗi tự động: `Push` → `CI (install, lint, typecheck, test, build)` → `Docker build → Docker Hub` → `CD (SSH, pull, restart, health check)`
* Kết quả trên `http://EC2-IP`: **Hello from AI-powered CI/CD**

**Visual / Diagram đề xuất:**

* Nửa trên: khối diff 2 dòng (đỏ/xanh), thật to — nhấn rằng thay đổi cực nhỏ.
* Nửa dưới: pipeline ngang với các trạm sáng xanh lần lượt theo thời gian thật (animation đồng bộ với run đang chạy trên màn hình).
* Cuối cùng: khung browser mockup hiển thị dòng chữ mới.

**Demo / Code / Screenshot:**

* **Demo live, quan trọng nhất về mặt cảm xúc.** Sửa `public/index.html` trong `cicd/demo-app`, commit, push, mở tab Actions cho cả phòng nhìn, rồi mở IP server.
* Screenshot dự phòng: một run xanh hoàn chỉnh + ảnh trang web sau khi đổi chữ.
* Backup không cần AWS: `npm run dev` hoặc `docker run -p 3000:3000` rồi mở `127.0.0.1:3000`.

**Speaker notes:**

* Trong lúc pipeline chạy (1–3 phút), đừng để im lặng: dùng thời gian đó chỉ lại trên màn hình đâu là CI, đâu là CD, và nhắc `npm ci` đang chạy trên máy sạch.
* Câu chốt để nói: "Không ai SSH. Không ai nhớ thứ tự lệnh. Không ai phải ngồi chờ."

**Source reference:**
`detail.md` § 6 Demo 3 → diff, lệnh git, flow, kết quả · `DEMO.md` Demo 3.

---

## Slide 33 — Demo 4: tái hiện local pass, CI fail

**Mục tiêu của slide:**
Đóng vòng câu hỏi treo bằng một lần chứng minh trực tiếp, ngay trước phần phân tích nguyên nhân.

**Key message:**
Local pass hoàn toàn, CI vẫn fail — và ta có thể tái hiện điều đó theo ý muốn.

**Nội dung trên slide:**

* Cách dựng tình huống: một file cấu hình nằm trong `.gitignore` — **máy local có, CI không có**
* Diễn tiến: `npm run typecheck ✓` · `npm test ✓` → `git push` → **CI ✗ FAILED**
* Nhắc lại câu hỏi từ slide 6 (đặt nguyên văn ở góc slide)

**Visual / Diagram đề xuất:**

* Hai cột đối xứng: **LOCAL** (nền xanh, 2 dấu ✓) ↔ **CI** (nền đỏ, dấu ✗), giữa là dấu `≠` — cùng motif với slide 6 để audience nhận ra ngay là đóng vòng.
* Bên dưới: hình cây thư mục nhỏ, file `local-session.ts` được vẽ **mờ/nét đứt** ở phía CI và **đậm** ở phía local.

**Demo / Code / Screenshot:**

* **Demo live:** `node scripts/demo4.mjs missing-file` → `npm run typecheck && npm test` (pass) → `node scripts/demo4.mjs simulate-ci` (fail giống CI checkout).
* Dự phòng A (đúng lỗi slide mở đầu): `node scripts/demo4.mjs type-error` → tái hiện `TS2322`.
* Dự phòng B: `node scripts/demo4.mjs node18` → lệch Node version.
* Screenshot cần: log CI fail vì thiếu file.

**Speaker notes:**

* Nếu chọn kịch bản lệch Node version thì dễ diễn hơn nhưng chậm hơn; kịch bản thiếu file gây "aha" mạnh hơn.
* Nói rõ: đây không phải trò ảo thuật — đó chính là ba dòng đầu trong bảng ở slide 36.
* Nhớ `node scripts/demo4.mjs off` sau khi diễn xong.

**Source reference:**
`detail.md` § 6 Demo 4 → "Dựng tình huống" + "Diễn tiến" · `DEMO.md` Demo 4.

---

## Slide 34 — Demo 4: vòng lặp AI sửa lỗi và bước developer review

**Mục tiêu của slide:**
Định vị đúng vai trò của AI trong quy trình: công cụ phân tích, không phải người ra quyết định.

**Key message:**
AI phân tích log rất nhanh, nhưng cổng quyết định vẫn là CI và bước developer review không được bỏ.

**Nội dung trên slide:**

* Prompt: *"This job failed. Analyze the logs, identify the root cause and suggest the minimal change needed to fix it."*
* Vòng lặp 6 bước:
  1. AI viết code & push
  2. CI kiểm tra tự động ← **cổng chặn**
  3. AI phân tích log lỗi
  4. ► **DEVELOPER REVIEW** ◄ ← bước này **không** được bỏ
  5. AI sửa code
  6. Pipeline chạy lại → **xanh**

**Visual / Diagram đề xuất:**

* Vòng tròn (loop) 6 node theo chiều kim đồng hồ; node 2 vẽ hình cổng chắn, node 4 vẽ hình người + màu accent nổi bật nhất và to hơn các node khác.
* Animation: chạy vòng lặp một lượt, dừng lại nhấn ở node 4.

**Demo / Code / Screenshot:**

* **Demo live:** copy log CI fail, dán cho AI, đọc phân tích, **review bằng miệng trước cả phòng** ("AI đề xuất thế này, tôi đồng ý/không đồng ý vì…"), rồi mới áp dụng và push lại → pipeline xanh.

**Speaker notes:**

* Câu chốt: "Cổng quyết định vẫn là CI, không phải AI."
* Đây là chỗ tốt nhất để trả lời sớm câu hỏi "có nên để AI tự merge khi pipeline xanh không?" → không: pipeline xanh chỉ nghĩa là *không vi phạm tiêu chuẩn ta đã đặt ra*, nó không thay được người chịu trách nhiệm.

**Source reference:**
`detail.md` § 6 Demo 4 → "Đưa log cho AI" + "Nhưng chưa merge vội" + "Message".

---

# SECTION H — CÁC VẤN ĐỀ PHÁT SINH KHI DEPLOY (7 slide · 12 phút)

## Slide 35 — Nhóm A: lệch môi trường giữa local và CI

**Mục tiêu của slide:**
Trả lời trực tiếp câu hỏi treo bằng nguyên nhân phổ biến nhất: lệch môi trường.

**Key message:**
Bốn yếu tố khác nhau giữa local và CI, và yếu tố đáng sợ nhất là phạm vi test.

**Nội dung trên slide:**

| Yếu tố | Máy local | CI / Production |
| --- | --- | --- |
| Node.js | `v20.11.0` | `v18.17.0` (runner) |
| Package | Cài sẵn trong dev cache | Dựng lại từ lockfile nghiêm ngặt |
| Env variable | `.env.local` riêng | Secrets thật của hệ thống |
| **Phạm vi test** | **Test 1 module / 1 file** | **Quét toàn bộ project** |

**Visual / Diagram đề xuất:**

* Bảng 2 cột đối xứng với icon đầu cột: laptop ↔ cloud/container.
* Ba dòng đầu tô màu trung tính; dòng cuối tô màu cảnh báo + icon cảnh báo.
* Animation: reveal 3 dòng đầu nhanh, dừng lâu ở dòng 4.
* Đặt lại câu hỏi của slide 6 ở đầu slide dạng banner mờ, rồi animation "gạch bỏ dấu ?" — đánh dấu đây là phần trả lời.

**Demo / Code / Screenshot:**
Không cần. Nếu Demo 4 dùng kịch bản Node version → chiếu lại thumbnail log fail.

**Speaker notes:**

* Nhấn: ba dòng đầu là chuyện hạ tầng, có thể ghim lại được. **Dòng cuối mới là dòng đáng sợ nhất** — AI thường chỉ chạy test trong đúng phạm vi nó vừa sửa, không chạy cả project.
* Hỏi phòng: "Ai từng thấy AI chạy `npm test -- path/to/file.test.ts` thay vì `npm test`?"

**Source reference:**
`detail.md` § 7.1 → "Nhóm A — Lệch môi trường" + ghi chú dòng cuối.

---

## Slide 36 — Nhóm B: những thứ chỉ có trên máy dev

**Mục tiêu của slide:**
Cho audience nhận diện những "hành lý ẩn" trên máy mình mà CI không có.

**Key message:**
Máy dev tích lũy trạng thái riêng — file chưa commit, cache cũ, env riêng — và chính nó tạo ra kết quả xanh giả.

**Nội dung trên slide:**

* **Dependency khác biên** — `node_modules` có package cài sẵn hoặc lệch minor version
* **File cấu hình riêng** — chưa commit hoặc chưa push
* **Cache ẩn cũ** — `.cache` / `build/` che giấu lỗi thật
* **Biến môi trường** — `.env.local` khác env của pipeline
* **Lệch command** — lệnh AI chạy ≠ lệnh pipeline dùng
* → *Local green không đồng nghĩa với Production green*

**Visual / Diagram đề xuất:**

* Hình một cái laptop mở, xung quanh là 5 "bóng mờ" (ghost icon) bám vào: `node_modules`, `uncommitted file`, `.cache`, `.env.local`, `custom command`.
* Bên cạnh là runner CI vẽ trống trơn, không có bóng nào.
* Animation: các bóng lần lượt hiện ra trên laptop — cảm giác "máy bạn đang bẩn dần".

**Demo / Code / Screenshot:**
Không cần (Demo 4 đã minh họa dòng "file chưa commit" bằng chạy thật).

**Speaker notes:**

* Dòng "lệch command" ít ai nghĩ tới nhưng rất hay xảy ra với AI agent: nó tự nghĩ ra lệnh test riêng thay vì dùng script trong `package.json`.
* Nối tới giải pháp: đây chính là lý do phải định nghĩa script chuẩn trong `package.json` (slide 42).

**Source reference:**
`detail.md` § 7.2 → "Nhóm B — Những thứ ẩn trên máy dev".

---

## Slide 37 — Monorepo: lỗi cross-package trong dependency graph

**Mục tiêu của slide:**
Cảnh báo một trường hợp đặc biệt mà xác suất lỗi cao hơn hẳn, thường gặp ở team lớn.

**Key message:**
Check từng package riêng lẻ có thể pass hết, nhưng contract giữa các package vẫn có thể đã vỡ.

**Nội dung trên slide:**

* Cây phụ thuộc: `@repo/web-app` → `@repo/auth-lib`, `@repo/ui-kit` → `@repo/core-types`
* Check riêng từng package: **PASS ✓** · Check cả dependency graph: **FAIL ✗**
* Lỗi thật: `@repo/auth-lib → @repo/core-types` — `TS2322: Type 'UserSession' missing required property 'tenantId'`
* *Isolated checks passed, but cross-package type graph contract is broken*

**Visual / Diagram đề xuất:**

* Vẽ đúng cây phụ thuộc dạng kim tự tháp ngược: `web-app` trên, `auth-lib` + `ui-kit` giữa, `core-types` dưới.
* Animation 2 nhịp: (1) mỗi node lần lượt sáng xanh với nhãn `PASS` → (2) toàn bộ các **đường nối** chuyển đỏ, node `core-types` nhấp nháy, banner `GRAPH TYPECHECK FAILED` hiện lên. Điểm nhấn thị giác: **lỗi nằm ở cạnh, không nằm ở node.**

**Demo / Code / Screenshot:**
Không cần demo. Code trên slide: chỉ giữ 2 dòng lỗi (`package:` và dòng `TS2322`).

**Speaker notes:**

* Nếu audience không dùng monorepo: nói ngắn 30 giây và đi tiếp; nếu có dùng thì đây là slide đáng dừng lâu.
* Giải pháp tương ứng ở slide 42: type check / test trên **toàn bộ workspace**, không chỉ package đang sửa.

**Source reference:**
`detail.md` § 7.3 → "Trường hợp đặc biệt — Monorepo".

---

## Slide 38 — Nhóm C: sự cố ngay lúc deploy

**Mục tiêu của slide:**
Chuyển từ lỗi "code/môi trường" sang lỗi "vận hành" — nhóm gây downtime thật.

**Key message:**
Kể cả code đúng, bản thân quá trình deploy vẫn có thể làm chết website nếu không có cơ chế phòng ngừa.

**Nội dung trên slide:**

* Build fail trên production runner (local build được, server thì không)
* Container cũ **đã stop**, container mới không lên → **downtime**
* Deploy xong mới phát hiện lỗi → **không có đường lùi**
* Không biết server đang chạy version nào
* Deploy đè lên nhau khi nhiều người cùng push

**Visual / Diagram đề xuất:**

* Timeline deploy ngang với 5 điểm nổ (icon cảnh báo) đặt tại đúng chặng có thể fail: `build` · `stop container` · `run container` · `sau deploy` · `nhiều deploy đồng thời`.
* Vùng giữa `stop` và `run` tô đỏ với nhãn `DOWNTIME`.

**Demo / Code / Screenshot:**
Không cần. Có thể chiếu lại thumbnail slide 17 (quy trình thủ công) để chỉ ra 5 điểm nổ nằm ở đâu.

**Speaker notes:**

* Nối lại slide 17–18: những câu hỏi không ai trả lời được ở đó chính là các mục ở đây.
* Nhấn cặp `stop → run`: đây là lý do người ta cần zero-downtime deploy và health check.

**Source reference:**
`detail.md` § 7.4 → "Nhóm C — Sự cố ngay lúc deploy".

---

## Slide 39 — Ngụy biện "trên máy em chạy được"

**Mục tiêu của slide:**
Đặt tên cho lối lập luận sai mà cả phòng đều đã từng dùng — dễ nhớ, dễ kể lại.

**Key message:**
"Local chạy được" chưa bao giờ đồng nghĩa với "production sẽ chạy được".

**Nội dung trên slide:**

* Câu quen thuộc: **"Trên máy em chạy được mà!"**
* `MÔI TRƯỜNG LOCAL ✓ PASS` **≠** `MÔI TRƯỜNG PRODUCTION ⚠ FAIL / UNKNOWN`

**Visual / Diagram đề xuất:**

* Slide punchy, gần như một meme: bubble thoại lớn ở giữa, phía dưới chia hai nhánh với dấu `≠` cỡ lớn ở chính giữa.
* Nhánh phải dùng chữ `UNKNOWN` chứ không chỉ `FAIL` — nhấn rằng ta thậm chí *không biết*.
* Animation: bubble hiện → hai nhánh tách ra → dấu `≠` đập vào.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nói nhẹ nhàng, có humour — đừng biến thành buổi phê phán. Ai cũng từng nói câu này.
* Chốt: từ hôm nay, câu trả lời cho "trên máy em chạy được mà" là "pipeline nói gì?".

**Source reference:**
`detail.md` § 7.5 → "Ngụy biện kinh điển".

---

## Slide 40 — Tốc độ AI sinh code vs tốc độ review thủ công

**Mục tiêu của slide:**
Giải thích vì sao vấn đề cũ này **nghiêm trọng hơn trước**, gắn với chủ đề AI của buổi.

**Key message:**
Tốc độ AI tăng × review vẫn thủ công = rủi ro lọt bug tăng vọt.

**Nội dung trên slide:**

* **AI Agent:** 50+ file/phút · refactor API service · tạo 20+ unit test · thêm DB schema → **bùng nổ tốc độ**
* **Con người review:** 2–3 file/giờ · 50+ PR chờ duyệt · đọc không kịp logic · bỏ sót lỗi môi trường → **nghẽn cổ chai**
* `Tốc độ AI tăng × Review vẫn thủ công = Rủi ro lọt bug tăng vọt`

**Visual / Diagram đề xuất:**

* Hai cột đối lập với **thanh đo tốc độ** rất lệch nhau (cột AI dài, cột người ngắn) — nhấn bằng tỉ lệ hình học, không bằng chữ.
* Giữa hai cột: một cái phễu bị tắc (bottleneck) với các PR xếp hàng.
* Animation: thanh AI chạy dài ra rất nhanh, thanh người nhích từng chút, PR dồn lại ở phễu.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Đây là slide "vì sao chủ đề này quan trọng **bây giờ**" — nói chậm, có sức nặng.
* Kết luận để dẫn sang slide 41: nếu review là cổ chai mà ta vẫn coi nó là cổng duy nhất, thì cổng đó sẽ bị bỏ qua.

**Source reference:**
`detail.md` § 7.6 → block AI Agent vs Con người review + công thức rủi ro.

---

## Slide 41 — Bỏ qua CI: chi phí sửa lỗi ở production

**Mục tiêu của slide:**
Chốt section H bằng chi phí — lý lẽ mạnh nhất để thuyết phục team và cấp trên.

**Key message:**
Càng phát hiện muộn càng đắt; AI sinh code nhanh hơn nghĩa là lỗi cũng sinh ra nhanh hơn.

**Nội dung trên slide:**

* `Local (Claude Code): TypeCheck ✓ UnitTest ✓` → *"tự chạy lại ở máy cá nhân đều báo thành công…"*
* → **DEPLOY TRỰC TIẾP (KHÔNG QUA CI)**
* → **LỖI TRÊN PRODUCTION** — chi phí sửa lỗi: cực kỳ đắt

**Visual / Diagram đề xuất:**

* Flow dọc 3 khối, màu chuyển dần xanh → vàng → đỏ.
* Bên phải flow: một trục **chi phí sửa lỗi** tăng theo hàm phi tuyến qua 4 mốc `local` → `CI` → `staging` → `production`, mốc production cao vọt.
* Animation: khối đỏ cuối cùng xuất hiện kèm rung nhẹ.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* `[BỔ SUNG]` Nói cụ thể "đắt" là gì: user nhìn thấy lỗi, hotfix ngoài giờ, mất niềm tin — không chỉ là thời gian dev. Source chỉ ghi "cực kỳ đắt".
* Chuyển tiếp: "Xong phần chẩn đoán. Giờ là phần chặn từng cái một."

**Source reference:**
`detail.md` § 7.6 → block "Và nếu bỏ qua CI" + Message ("Càng phát hiện muộn, càng đắt").

---

# SECTION I — CÁCH KHẮC PHỤC TRƯỚC KHI DEPLOY (7 slide · 10 phút)

## Slide 42 — Vấn đề → cách chặn (1): môi trường và code

**Mục tiêu của slide:**
Cho audience thấy các lỗi ở section H không phải định mệnh — mỗi cái có một biện pháp gọn.

**Key message:**
Toàn bộ nhóm lỗi "lệch môi trường" được chặn bằng bốn thao tác cấu hình đơn giản.

**Nội dung trên slide:**

| Vấn đề | Cách chặn |
| --- | --- |
| Lệch phiên bản runtime | Ghim version: `setup-node@v4` với `node-version` cố định, hoặc chạy trong Docker image cố định |
| Lệch dependency | `npm ci --frozen-lockfile`, **luôn commit lockfile** |
| Cache ẩn / máy bẩn | Chạy trong container sạch, dựng mới mỗi lần |
| File chưa commit | CI checkout từ repo — thiếu file là fail ngay |
| Lệch command | Định nghĩa script trong `package.json` — **dev và CI dùng chung một bộ lệnh** |
| Lỗi cross-package (monorepo) | Type check / test trên **toàn bộ workspace** |

**Visual / Diagram đề xuất:**

* Bảng 2 cột "vấn đề → cách chặn", cột trái màu đỏ mờ, cột phải màu xanh.
* Animation: mỗi dòng reveal theo cặp; khi dòng xuất hiện, ô đỏ bên trái được "khóa" bằng icon ổ khóa.
* Nếu có thời gian: thêm thumbnail nhỏ của slide tương ứng ở section H (44, 45, 46) cạnh mỗi dòng để audience thấy liên kết 1–1.

**Demo / Code / Screenshot:**
Có thể chỉ tay lại `ci.yml` của demo-app: `node-version: 20` + `npm ci` + các `npm run <script>` — bằng chứng sống của 3 dòng đầu.

**Speaker notes:**

* Nhấn dòng "lệch command": đây là dòng dễ làm nhất và bị bỏ qua nhiều nhất — mọi lệnh đều phải là script trong `package.json`, cả người và AI đều gọi đúng script đó.
* Dòng "file chưa commit": CI không "chặn" mà là **không thể lọt** — đó là thuộc tính miễn phí của việc checkout từ repo.

**Source reference:**
`detail.md` § 8.1 → bảng đối chiếu (6 dòng đầu).

---

## Slide 43 — Vấn đề → cách chặn (2): deploy và quy trình

**Mục tiêu của slide:**
Hoàn thiện bảng giải pháp cho nhóm lỗi vận hành và lỗi quy trình.

**Key message:**
Rollback, health check và branch protection là ba thứ biến deploy từ canh bạc thành thao tác an toàn.

**Nội dung trên slide:**

| Vấn đề | Cách chặn |
| --- | --- |
| Bug lọt xuống production | Deploy staging + smoke test trước, rồi mới release |
| Deploy hỏng | Tag image theo version/SHA → **rollback = deploy lại tag trước** |
| Không biết trạng thái thật | **Health check** sau deploy + monitoring + log tập trung |
| PR merge ẩu | **Branch protection:** bắt buộc CI xanh mới cho merge |

**Visual / Diagram đề xuất:**

* Bảng 2 cột cùng style slide 42 (để hai slide đọc như một).
* Bên cạnh dòng "PR merge ẩu": screenshot nhỏ màn hình GitHub báo `Required status checks must pass before merging` với nút Merge bị disable — đây là hình ảnh có sức thuyết phục cao nhất của cả section.

**Demo / Code / Screenshot:**

* **Screenshot cần chuẩn bị:** (1) GitHub branch protection settings; (2) PR có nút merge bị chặn vì CI đỏ.
* Code: một dòng health check thật từ `cd.yml` — `curl -fsS "http://127.0.0.1/health"`.

**Speaker notes:**

* Branch protection là thứ **làm được trong 2 phút** và đổi hẳn văn hóa team — nếu audience chỉ làm một việc sau buổi này, gợi ý làm cái này cùng với lộ trình bậc 1 ở slide 14.
* Nhắc lại Demo 2: tag SHA chính là điều kiện để rollback tồn tại.

**Source reference:**
`detail.md` § 8.1 → bảng đối chiếu (4 dòng cuối).

---

## Slide 44 — Container sạch: ba dòng lệnh mà CI thực sự làm

**Mục tiêu của slide:**
Rút gọn toàn bộ khái niệm CI về một hình ảnh cực đơn giản mà ai cũng nhớ được.

**Key message:**
CI về bản chất là: vứt bỏ mọi thứ riêng tư của máy bạn, dựng lại từ đầu, buộc project tự chứng minh nó chạy được.

**Nội dung trên slide:**

```bash
docker run --rm node:20-alpine     # môi trường mới tinh
npm ci --frozen-lockfile           # dựng đúng theo lockfile
npm run typecheck && npm test      # đúng bộ lệnh quy chuẩn
```

* `Máy Dev Local` [phụ thuộc cá nhân] → `CI Clean Sandbox` [độc lập 100%]
* Không được chấp nhận làm bằng chứng: *"code chạy được rồi"* · *"test log đã pass"*

**Visual / Diagram đề xuất:**

* Nửa trên: khung terminal 3 dòng, mỗi dòng có chú thích bên phải.
* Nửa dưới: dùng lại đúng cặp hộp của slide 12 (`Máy Dev` bẩn ↔ `CI Runner` sạch), nay hộp CI có thêm 3 tick: `cách ly hoàn toàn` · `container sạch, không cache` · `thực thi quy chuẩn khách quan`.
* Animation: `--rm` được highlight riêng với chú thích `xóa sạch sau khi chạy`.

**Demo / Code / Screenshot:**

* Code lên slide: đúng 3 dòng trên.
* Nếu có thời gian và mạng ổn: chạy thật `docker build -t demo-app:local .` để audience thấy `npm ci` chạy trong image sạch (`Dockerfile` của demo-app dùng `node:20-alpine`).

**Speaker notes:**

* Nhấn cờ `--rm` và ý nghĩa "mỗi lần chạy là một lần bắt đầu lại từ số 0".
* Chốt: CI đắt tiền hay rẻ tiền, tự host hay SaaS, bản chất vẫn chỉ là ba dòng này.

**Source reference:**
`detail.md` § 8.2 → "Trái tim của giải pháp — container sạch" + "Những gì không được chấp nhận làm bằng chứng".

---

## Slide 45 — Pipeline bắt buộc cho cả developer và AI

**Mục tiêu của slide:**
Thống nhất thông điệp: giải pháp không phải "kiểm soát AI", mà là một tiêu chuẩn chung không có ngoại lệ.

**Key message:**
Cùng một môi trường sạch, cùng một bộ lệnh, cùng một tiêu chuẩn — không có ngoại lệ cho ai.

**Nội dung trên slide:**

* `Developer`: *"Code nhìn có vẻ ổn, chắc không sao…"* → ⚠ có thể mắc sai lầm
* `AI Agent`: *"Test local pass, sẵn sàng push…"* → ⚠ bỏ sót sai lệch env
* Cả hai đều đi vào: **MANDATORY PIPELINE** — môi trường sạch · bộ tiêu chuẩn duy nhất · **không có ngoại lệ**

**Visual / Diagram đề xuất:**

* Hai luồng vào từ trên (icon người + icon robot), hội tụ vào một cổng duy nhất ở giữa có nhãn `ci-pipeline.yml`, rồi một đường ra duy nhất.
* Cổng vẽ dạng cửa an ninh (kiểu cửa từ sân bay) để nhấn tính "không đi đường khác được".
* Animation: cả hai luồng cố "đi vòng" (mũi tên nét đứt) nhưng bị chặn lại.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Câu chốt: "Pipeline không dựa trên cảm giác rằng code có vẻ ổn. Nó thực thi những tiêu chuẩn mà team đã định nghĩa."
* Đây cũng là câu trả lời cho lo ngại "vậy AI có được tin không?" — câu hỏi sai; câu hỏi đúng là "tiêu chuẩn của ta đã đủ chưa?".

**Source reference:**
`detail.md` § 8.3 → "Một pipeline mà cả người lẫn AI đều phải đi qua".

---

## Slide 46 — Đổi câu hỏi: "AI bảo pass chưa?" → "Pipeline đã xanh chưa?"

**Mục tiêu của slide:**
Cô đặc toàn bộ buổi thành một thay đổi hành vi cụ thể, đo được.

**Key message:**
Kỷ luật hệ thống thay thế sự tin tưởng cảm tính — chỉ bằng cách đổi một câu hỏi hằng ngày.

**Nội dung trên slide:**

* ✗ **CÂU HỎI CŨ (cảm tính):** *"Claude bảo pass chưa?"*
* ✓ **CÂU HỎI MỚI (chuẩn hóa):** *"Pipeline đã xanh chưa?"*
* Phía sau câu hỏi mới: Dependency · Linting · Type Check · Unit Test · Integration · Build

**Visual / Diagram đề xuất:**

* Hai thẻ câu hỏi xếp trên/dưới: thẻ trên xám + dấu ✗, thẻ dưới màu accent + dấu ✓.
* Dưới thẻ mới: 6 chip nhỏ tên các bước — thể hiện "câu hỏi này được bảo lãnh bởi 6 phép kiểm tra".
* Animation: thẻ cũ mờ dần và trượt lên, thẻ mới trượt vào.
* Thiết kế để audience chụp lại được: chữ to, ít chi tiết, đọc hiểu không cần người nói.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Gợi ý hành động cụ thể: đổi luôn câu hỏi này trong daily/standup và trong PR template.
* Nói rõ đây là slide chốt của cả phần giải pháp — nếu chỉ nhớ một slide, nhớ slide này.

**Source reference:**
`detail.md` § 8.4 → "Chuyển câu hỏi".

---

## Slide 47 — Giới hạn của CI/CD

**Mục tiêu của slide:**
Giữ độ tin cậy của buổi sharing — chủ động chỉ ra giới hạn thay vì để audience tự phản biện.

**Key message:**
Pipeline xanh chỉ phản chiếu đúng những gì ta đã yêu cầu nó kiểm tra — không hơn.

**Nội dung trên slide:**

* Viết test sai → pipeline vẫn xanh
* Business rule chưa có test → CI không tự biết
* Chưa cấu hình security scan → lỗ hổng vẫn lọt
* Coverage 100% nhưng test vô nghĩa → vẫn vô nghĩa
* → **CI chỉ mạnh bằng đúng những tiêu chuẩn mà chúng ta đặt vào nó**

**Visual / Diagram đề xuất:**

* Hình một pipeline xanh mượt, nhưng bên dưới có các "lỗ" (gap) vẽ nét đứt để bug đi xuyên qua — trực quan hóa "xanh nhưng vẫn lọt".
* Không dùng màu đỏ ở đây; dùng màu vàng/trung tính để giữ giọng điệu thành thật, không bi quan.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nói rõ mục đích slide này: "để buổi hôm nay không thành một buổi quảng cáo."
* `[BỔ SUNG]` Ví dụ cụ thể để nói: một test `expect(true).toBe(true)` vẫn làm coverage tăng và pipeline vẫn xanh — minh họa cho dòng "coverage 100% nhưng test vô nghĩa" của source.
* Chuyển tiếp tự nhiên sang slide 48: "Nếu CI chỉ mạnh bằng tiêu chuẩn ta đặt vào, thì ai đặt tiêu chuẩn?"

**Source reference:**
`detail.md` § 8.5 → "CI/CD không phải viên đạn bạc".

---

## Slide 48 — Vai trò của Software Engineer: định nghĩa tiêu chuẩn

**Mục tiêu của slide:**
Trả lời câu hỏi mà cả phòng đang nghĩ, và định vị lại vai trò của audience theo hướng tích cực.

**Key message:**
AI viết code, người kỹ sư định nghĩa tiêu chuẩn — vai trò không mất đi, nó dịch lên một tầng cao hơn.

**Nội dung trên slide:**

* Điều gì cần được kiểm tra? → phạm vi & ranh giới kiểm thử
* Test nào cần tồn tại? → kiến trúc bộ test Unit / Integration / E2E
* Coverage cần thế nào? → chỉ số chất lượng & ngưỡng đạt
* Security check nào cần chạy? → quét lỗ hổng, SAST
* Khi nào được merge & deploy? → tiêu chí quality gate
* Khi có lỗi thì xử lý ra sao? → phân loại sự cố & phương án dự phòng

**Visual / Diagram đề xuất:**

* 6 câu hỏi dạng thẻ xếp 2×3, mỗi thẻ có icon.
* Phía trên: hai vai được vẽ thành hai tầng — tầng dưới `AI: viết code` (rộng, xám), tầng trên `Engineer: định nghĩa tiêu chuẩn` (accent, có mũi tên hướng xuống điều khiển tầng dưới). Nhấn ý "dịch lên một tầng cao hơn".

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Đây là slide có giá trị cảm xúc cao với audience developer đang lo về AI — nói với giọng khẳng định.
* Liên hệ ngược slide 8: CI chỉ chạy "những bước kiểm tra **đã cấu hình**" — người cấu hình là kỹ sư.

**Source reference:**
`detail.md` § 8.6 → "Vậy nhiệm vụ của Software Engineer là gì?".

---

# SECTION J — TỔNG KẾT (4 slide · 4 phút)

## Slide 49 — Sau deploy: monitoring và vòng lặp tiếp theo

**Mục tiêu của slide:**
Mở rộng tầm nhìn: deploy xong không phải hết, monitoring đóng vòng lại.

**Key message:**
CI/CD là một vòng lặp: production → monitoring → phát hiện lỗi → vòng phát triển mới.

**Nội dung trên slide:**

1. **Production** — vận hành thực tế
2. **Monitoring** — thu thập telemetry
3. **Phát hiện lỗi** — phân tích log / issue
4. **Quay lại vòng phát triển mới** ↺

**Visual / Diagram đề xuất:**

* Vòng tròn 4 node, mũi tên khép kín, có ký hiệu ↺ ở node 4.
* Animation: chạy vòng 1,5 lượt rồi dừng — nhấn tính liên tục.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nói ngắn (30 giây): monitoring nằm ngoài phạm vi buổi hôm nay, nhưng nếu không có nó thì "deploy xong rồi không ai biết gì" vẫn còn nguyên.
* Nối lại slide 38: "không biết server đang chạy version nào" được giải quyết ở đúng vòng này.

**Source reference:**
`detail.md` § 8.7 → "Vòng lặp không kết thúc ở deploy".

---

## Slide 50 — Hệ sinh thái: AI Agent → Git → CI → CD → Monitoring

**Mục tiêu của slide:**
Đặt mọi thứ vừa nói vào một bức tranh duy nhất, để audience mang về một hình ảnh tổng thể.

**Key message:**
AI tăng tốc, Git lưu vết, CI xác minh, CD triển khai, Monitoring theo dõi — và vòng lặp quay lại.

**Nội dung trên slide:**

* `AI AGENT` (tăng tốc development) → `GIT` (lưu vết thay đổi) → `CI` (xác minh tiêu chuẩn) → `CD` (triển khai có kiểm soát) → `MONITORING` (theo dõi vận hành) → *quay lại vòng sau*

**Visual / Diagram đề xuất:**

* 5 khối ngang, mỗi khối có icon + tên + một dòng vai trò; một mũi tên lớn vòng từ khối cuối về khối đầu.
* Animation: 5 khối reveal lần lượt, mũi tên vòng khép lại sau cùng.
* **Đây là slide nên dùng làm ảnh đại diện khi share lại tài liệu.**

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nhấn rằng CI là khối duy nhất *nói không* — bốn khối kia đều tăng tốc hoặc quan sát, chỉ CI có quyền chặn.
* **Chỉ nói, không lên slide:** chi tiết bảng 5 trụ cột trong source (vai trò từng khối) — trên slide chỉ để một dòng ngắn mỗi khối.

**Source reference:**
`detail.md` § Tổng kết → "Hệ sinh thái hoàn chỉnh" + bảng 5 trụ cột.

---

## Slide 51 — Ba điều mang về

**Mục tiêu của slide:**
Đóng gói toàn bộ buổi thành ba câu audience có thể nhắc lại cho team của họ.

**Key message:**
AI giải quyết bài toán tốc độ; bài toán còn lại là kiểm soát chất lượng của lượng code đó.

**Nội dung trên slide:**

1. *"AI đã chạy test và tất cả đều pass"* **không phải điểm kết thúc** — hãy coi nó là **bước kiểm tra đầu tiên**
2. Vấn đề không còn là **viết code đủ nhanh hay không** — mà là **kiểm soát chất lượng của lượng code sinh ra với tốc độ đó**
3. Nếu AI Agent là một developer code cực nhanh, thì **CI/CD là dây chuyền kiểm định chất lượng mà ngay cả AI cũng phải đi qua**

**Visual / Diagram đề xuất:**

* Ba khối số lớn `1 2 3`, mỗi khối một câu, xếp dọc, nhiều khoảng trắng.
* Animation: reveal từng câu, mỗi câu người nói nhắc lại một lần.
* Câu 3 in đậm nhất — nó là câu tổng của cả buổi.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Nói chậm. Đây là 60–90 giây quan trọng nhất về mặt lưu lại trong đầu người nghe.
* Có thể mời audience chụp slide này.

**Source reference:**
`detail.md` § Tổng kết → "Ba câu mang về".

---

## Slide 52 — Slide kết: "Hãy để pipeline trả lời"

**Mục tiêu của slide:**
Đóng lại đúng hình ảnh đã mở ở slide 1, tạo cảm giác trọn vòng.

**Key message:**
AI có thể nói "code đã ổn", developer có thể nghĩ "chắc là ổn" — nhưng câu trả lời cuối cùng thuộc về pipeline.

**Nội dung trên slide:**

* `AI Agent — "Code đã ổn"` **(?)**
* `Developer — "Chắc là ổn"` **(?)**
* ───────────────
* **HÃY ĐỂ PIPELINE TRẢ LỜI**

**Visual / Diagram đề xuất:**

* **Dùng lại chính xác layout slide 1** (hai bubble + dấu `?`), nhưng lần này bên dưới có một đường kẻ ngang và dòng chữ kết luận in lớn, phát sáng.
* Animation: hai bubble hiện lại (audience nhận ra ngay) → đường kẻ chạy ngang → dòng kết luận sáng lên.
* Không thêm bất cứ nội dung nào khác.

**Demo / Code / Screenshot:**
Không cần.

**Speaker notes:**

* Không nói thêm gì sau khi đọc dòng cuối. Để 3 giây im lặng rồi chuyển sang Q&A.

**Source reference:**
`detail.md` § "Slide cuối".

---

## Slide 53 — Q&A

**Mục tiêu của slide:**
Mở sàn cho câu hỏi, đồng thời gợi ý sẵn những chủ đề dễ hỏi.

**Key message:**
Cứ hỏi từ chỗ team bạn đang tắc.

**Nội dung trên slide:**

* **Q&A**
* Vài gợi ý: *Project nhỏ có cần CI/CD không?* · *Pipeline chạy lâu thì làm gì?* · *Có nên để AI tự merge?* · *Chưa có test thì bắt đầu từ đâu?*
* Link/QR tới repo demo (`cicd/demo-app`)

**Visual / Diagram đề xuất:**

* Chữ `Q&A` lớn, 4 chip câu hỏi gợi ý bên dưới.
* `[BỔ SUNG]` QR code dẫn tới repo demo hoặc tài liệu — để audience không phải chép tay.
* Góc slide: thumbnail sơ đồ hệ sinh thái (slide 50) làm nền mờ, để trong lúc Q&A vẫn có bản đồ tham chiếu trên màn hình.

**Demo / Code / Screenshot:**
Chuẩn bị sẵn QR/link repo demo.

**Speaker notes (4 câu trả lời chuẩn bị trước — **không** lên slide):**

* *"Project nhỏ, 2 người, có cần CI/CD không?"* → Cần, ở mức tối giản: lint + test + build trên PR là đã đủ giá trị.
* *"Pipeline chạy 15 phút, chờ lâu quá thì sao?"* → Cache dependency, chạy job song song, tách test nhanh/chậm, Docker layer caching (nối slide 15).
* *"Có nên để AI tự merge khi pipeline xanh không?"* → Không. Pipeline xanh chỉ nghĩa là *không vi phạm tiêu chuẩn ta đã đặt ra* — nó không thay được người chịu trách nhiệm (nối slide 34, 47).
* *"Team chưa có test thì bắt đầu từ đâu?"* → Lint + type check + build. Ba bước đó không cần viết test nào mà đã chặn được rất nhiều lỗi (nối slide 14).

**Source reference:**
`detail.md` § "Q&A · 10 phút" → "Vài câu hỏi nên chuẩn bị trước".

---

# Presentation Summary

## Tổng số slide

**53 slide** (bao gồm 1 slide tiêu đề, 1 slide mục lục, 1 slide Q&A).

## Thời lượng ước tính

| Phần | Slide | Thời lượng |
| --- | --- | --- |
| A — Mở đầu: tình huống thực tế | 1–7 | 8 phút |
| B — CI là gì | 8–12 | 10 phút |
| C — Công cụ và tác vụ CI | 13–15 | 8 phút |
| D — Deploy trước khi có CD | 16–19 | 9 phút |
| E — CD là gì | 20–23 | 7 phút |
| F — Hai loại CD | 24–26 | 7 phút |
| G — Demo | 27–34 | 25 phút |
| H — Các vấn đề phát sinh khi deploy | 35–41 | 12 phút |
| I — Cách khắc phục trước khi deploy | 42–48 | 10 phút |
| J — Tổng kết | 49–52 | 4 phút |
| Q&A | 53 | 10 phút |
| **Tổng** | **53** | **≈ 110 phút (1h50)** |

Nếu phải cắt xuống 90 phút: bỏ slide 37 (monorepo), gộp 42+43, và giữ Demo 1 + Demo 4 (bỏ Demo 2, Demo 3 chuyển thành screenshot).

## Các slide quan trọng nhất (không được cắt)

| Slide | Lý do |
| --- | --- |
| **6** — Câu hỏi của cả buổi | Trục xuyên suốt, đóng lại ở slide 33 và 35 |
| **10** — Cổng kiểm tra | Khái niệm gate |
| **11** — Ba tầng kiểm tra | Ẩn dụ để kể lại cho team |
| **14** — Flow CI và bản đồ công cụ | Bộ xương pipeline + thị trường công cụ |
| **21** — Ranh giới CI ↔ CD | Diagram quan trọng nhất khi sang CD |
| **29** — Checklist review workflow AI | Giá trị cốt lõi phần AI |
| **34** — Vòng lặp AI sửa lỗi + developer review | Định vị vai trò AI |
| **35** — Lệch môi trường local vs CI | Trả lời câu hỏi slide 6 |
| **44** — Container sạch, 3 dòng lệnh | Rút gọn khái niệm CI |
| **46** — Đổi câu hỏi | Thay đổi hành vi, đo được |
| **47** — Giới hạn của CI/CD | Giữ độ tin cậy |
| **51/52** — Ba điều mang về + slide kết | Đóng vòng với slide 1 |

## Các slide cần demo live

| Slide | Demo | Thời lượng |
| --- | --- | --- |
| 28–29 | Demo 1 — AI sinh `ci.yml`, soi checklist | 6 phút |
| 30–31 | Demo 2 — image → Docker Hub → EC2; ranh giới CI/CD; tag SHA | 6 phút |
| 32 | Demo 3 — sửa 1 dòng → push → Actions → IP server | 7 phút |
| 33–34 | Demo 4 — local pass, CI fail → AI phân tích log → review → xanh | 6 phút |
| 44 (tùy chọn) | `docker build` + `docker run` local | 1–2 phút |

## Các diagram cần chuẩn bị

**Ưu tiên cao:**

1. **Flow CI + bản đồ công cụ** (slide 14) — infographic: pipeline 6 bước ở giữa, 5 cụm logo quanh. Crop phần giữa để dùng lại ở slide 21 và 31.
2. **Đường cắt CI ↔ CD** (slide 21) — crop flow slide 14, kẻ ngang CI/CD.
3. **Cổng kiểm tra / gate** (slide 10)
4. **Cặp hộp Máy Dev bẩn ↔ CI Runner sạch** (slide 12) — dùng lại slide 36, 44
5. **Mục lục 8 mục** (slide 2)
6. **Hệ sinh thái AI → Git → CI → CD → Monitoring** (slide 50)

**Ưu tiên trung bình:**

7. `trigger → job → step → gate` (slide 13)
8. Ẩn dụ 3 tầng nộp bài (slide 11)
9. 4 tầng thời điểm chạy check (slide 15)
10. Deploy thủ công 8 bước + downtime (slide 17)
11. Ba developer cùng deploy một server (slide 18)
12. Delivery vs Deployment thẳng cột (slide 24)
13. Nhánh git develop→staging / main→production (slide 26)
14. Artifact đi qua Runner → Docker Hub → EC2 (slide 30)
15. Cây dependency monorepo (slide 37)
16. Tốc độ AI vs review (slide 40)
17. Trục chi phí sửa lỗi (slide 41)
18. Hai luồng người + AI vào một pipeline (slide 45)
19. Vòng lặp production → monitoring (slide 49)

**Ưu tiên thấp:**

20. Hộp artifact niêm phong (slide 22)
21. Pipeline xanh có lỗ hổng (slide 47)
22. Hai tầng vai trò AI / Engineer (slide 48)

## Các screenshot / code cần chuẩn bị

**Screenshot:**

| # | Nội dung | Dùng ở slide |
| --- | --- | --- |
| 1 | Terminal typecheck pass | 3 |
| 2 | Terminal unit test pass | 4 |
| 3 | GitHub Actions run đỏ — type check fail | 5 |
| 4 | Log `TS2322` | 5 (thumbnail khi nói type check ở slide 14) |
| 5 | GitHub Actions run xanh full CI + CD | 32 |
| 6 | Trang web trên EC2 sau khi đổi chữ | 32 |
| 7 | Docker Hub tag list theo commit SHA | 31 |
| 8 | Actions log fail vì thiếu file | 33 |
| 9 | Chat AI phân tích log | 34 |
| 10 | Branch protection settings | 43 |
| 11 | PR bị chặn merge vì CI đỏ | 43 |

**Code / config lên slide:**

| # | Nội dung | Nguồn | Dùng ở slide |
| --- | --- | --- | --- |
| 1 | Bảng 5 step CI #108 FAILED | `detail.md` § 0 | 5 |
| 2 | `npm ci` trên bước 1 của flow | § 2.2 | 14 |
| 3 | `ci.yml` — `on:` + các dòng `- run:` | `ci.yml` | 28 |
| 4 | `ci.yml` — job `security` | `ci.yml` | 29 |
| 5 | `cd.yml` — tag theo `github.sha` | `cd.yml` | 31 |
| 6 | `cd.yml` — `docker pull / stop / rm / run` | `cd.yml` | 30 |
| 7 | `curl /health` | `cd.yml` | 43 |
| 8 | Diff Hello World | `public/index.html` | 32 |
| 9 | 3 dòng `docker run --rm node:20-alpine` | § 8.2 | 44 |
| 10 | 2 dòng lỗi monorepo graph | § 7.3 | 37 |
| 11 | Prompt Demo 1 và Demo 2 | § 6 | 28, 30 |
| 12 | Prompt phân tích log Demo 4 | § 6 | 34 |

---

# Slide Dependency

Danh sách asset cần chuẩn bị trước khi dựng slide, xếp theo mức độ chặn.

## 1. Chặn — phải có, không có thì không dựng được slide

| Asset | Trạng thái trong repo | Ghi chú |
| --- | --- | --- |
| **Repo demo Node.js/TS** | ✅ đã có — `cicd/demo-app` | Có `package.json` với script `lint`, `typecheck`, `test`, `build`, `dev` |
| **GitHub Actions CI workflow** | ✅ đã có — `.github/workflows/ci.yml` | Node 20, `cache: npm`, `npm ci`, lint, typecheck, test, E2E, build + job security (Gitleaks, `npm audit`) |
| **GitHub Actions CD workflow** | ✅ đã có — `.github/workflows/cd.yml` | Build & push image tag theo `github.sha`, SSH EC2, `docker pull/stop/rm/run`, health check |
| **Dockerfile** | ✅ đã có — multi-stage `node:20-alpine` | Dùng cho slide 44 (container sạch) và Demo 2 |
| **Script dựng lỗi Demo 4** | ✅ đã có — `scripts/demo4.mjs` | 4 chế độ: `missing-file`, `type-error`, `node18`, `off` |
| **Kịch bản demo** | ✅ đã có — `cicd/demo-app/DEMO.md` | Nguồn cho slide 27–34 |
| **Diagram flow CI + bản đồ công cụ** | ❌ cần dựng | Infographic slide 14: pipeline 6 bước giữa, 5 cụm logo quanh. Crop phần giữa dùng lại slide 21, 31 |
| **Diagram đường cắt CI ↔ CD** | ❌ cần dựng | Crop flow slide 14, kẻ ngang CI/CD |
| **Logo Kaopiz** | ✅ đã có — `cicd/sources/logo.svg` | Slide title + footer |

## 2. Hạ tầng cần dựng trước buổi (cho demo live)

| Asset | Ghi chú |
| --- | --- |
| **GitHub repository (remote, public hoặc org)** | Bắt buộc để Demo 3 và Demo 4 chạy Actions thật |
| **Branch protection trên `main`** | Cần cho screenshot #10, #11 (slide 43) |
| **Docker Hub repository** | Cần cho Demo 2 và screenshot #7 (tag theo SHA) |
| **EC2 instance có Docker + port 80 mở** | Đích deploy của `cd.yml` |
| **GitHub Secrets** | `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY` |
| **Ít nhất 2 lần deploy thành công trước buổi** | Để Docker Hub có nhiều tag SHA → chứng minh rollback được (slide 31) |
| **Phương án dự phòng offline** | `docker build -t demo-app:local .` + `docker run -p 3000:3000` + `curl /health` — dùng khi mạng/AWS chết |

## 3. Screenshot cần chụp trước (không chụp live)

* GitHub Actions run **đỏ** (type check fail + step bị hủy) — slide 5
* Log `TS2322` — slide 5 (nhắc lại khi đi bước type check ở slide 14)
* GitHub Actions run **xanh** full CI + CD — slide 32 (dự phòng cho Demo 3)
* Docker Hub tag list theo commit SHA — slide 31
* Actions log fail vì thiếu file (Demo 4) — slide 33
* Chat AI phân tích log + đề xuất fix — slide 34
* Branch protection settings + PR bị chặn merge — slide 43
* Terminal typecheck pass / test pass — slide 3, 4

## 4. Asset thiết kế cần chuẩn bị

* **Bộ logo cho infographic CI** (slide 14): GitHub Actions, GitLab CI, Jenkins, CircleCI, Bitbucket, Azure DevOps, Vitest, Jest, Playwright, Cypress, k6, Codecov, ESLint, Prettier, Biome, TypeScript, Hadolint, ShellCheck, actionlint, commitlint, Dependabot, Semgrep, CodeQL, Trivy, Gitleaks, TruffleHog, SonarQube, Husky, Danger
* **Component "khung terminal"** dùng lại cho mọi slide có log (slide 3, 4, 5, 17, 44)
* **Component "khung GitHub Actions"** mô phỏng UI danh sách step (slide 5, 32)
* **Component "browser mockup"** (slide 32)
* **Bảng màu trạng thái nhất quán toàn bộ deck:** xanh = pass, đỏ = fail, vàng = cần người quyết định, xám = bị hủy/không chạy
* **Icon người vs icon robot** dùng nhất quán cho mọi slide so sánh Developer / AI (slide 1, 7, 24, 40, 45, 48, 52)
* **QR code** trỏ tới repo demo (slide 53)

## 5. Việc cần làm trước buổi (checklist người trình bày)

* [ ] Chạy thử toàn bộ 4 demo end-to-end ít nhất **2 lần**, bấm đồng hồ
* [ ] Chuẩn bị sẵn các tab: repo, Actions, Docker Hub, IP server, terminal ở `cicd/demo-app`, cửa sổ AI
* [ ] `node scripts/demo4.mjs off` để đảm bảo repo ở trạng thái sạch trước khi bắt đầu
* [ ] Tăng font terminal và font editor lên cỡ trình chiếu
* [ ] Chuẩn bị bản screenshot dự phòng cho **cả 4** demo
* [ ] Nhớ tắt notification, ẩn secret/token trên màn hình trước khi share
