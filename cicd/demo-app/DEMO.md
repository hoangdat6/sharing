# Kịch bản demo — CI/CD sharing

Chạy từ thư mục `cicd/demo-app`. Tất cả lệnh dưới đây copy-paste được khi đứng nói.

```bash
cd cicd/demo-app
npm install
```

Lệnh dùng chung cho người và CI:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run dev          # http://127.0.0.1:3000  →  Hello World
```

---

## Demo 1 — Dùng AI viết CI (6 phút)

Mở `.github/workflows/ci.yml` (đã có sẵn) **hoặc** xóa tạm file đó rồi hỏi AI:

> Create a GitHub Actions CI pipeline for this Node.js application. It should
> install dependencies, run lint, type check, tests, and build whenever code is
> pushed to main or a pull request is opened.

Soi lại YAML theo checklist trên slide:

- [ ] Có `cache: npm` chưa?
- [ ] `node-version` có khớp production (20)?
- [ ] Có lint / typecheck không?
- [ ] Có security scan không?
- [ ] Có secret hardcode không?
- [ ] Có chạy cho `pull_request` không?

**Chốt:** AI viết được ≠ AI viết đúng.

---

## Demo 2 — Dùng AI viết CD (6 phút)

Mở `.github/workflows/cd.yml`. Chỉ tay:

```text
docker build + push registry     ← vẫn là CI (tạo artifact)
SSH vào server, docker run       ← mới là CD (đưa artifact ra)
```

Nhấn: image được tag bằng **commit SHA**, không phải `latest`.
Tag `latest` = không rollback được.

Prompt nếu viết lại từ đầu:

> Create a GitHub Actions deployment workflow that builds a Docker image, tags it
> with the commit SHA, pushes it to Docker Hub, then SSHs into an EC2 server,
> pulls the image, stops the old container and starts the new one.

---

## Demo 3 — git push → thấy đổi chữ (7 phút)

Trong `public/index.html` sửa:

```diff
- <h1>Hello World</h1>
+ <h1>Hello from AI-powered CI/CD</h1>
```

Local, không cần GitHub:

```bash
npm run dev
# mở http://127.0.0.1:3000 — thấy chữ mới
```

Khi đã có remote:

```bash
git add public/index.html
git commit -m "update landing message"
git push
```

Mở tab Actions, rồi mở IP server.

---

## Demo 4 — local pass, CI fail (6 phút) — quan trọng nhất

### Cách chính — file bị gitignore

```bash
node scripts/demo4.mjs missing-file
npm run typecheck && npm test     # PASS trên máy này
node scripts/demo4.mjs simulate-ci  # FAIL: giống CI checkout
```

Giải thích: `src/services/user.ts` import `local-session.ts`, file này nằm
trong `.gitignore`. Máy local có file. CI chỉ checkout những gì có trong git.

Đưa log cho AI:

> This typecheck failed in CI but passed locally. Identify the root cause and
> suggest the minimal change needed to fix it.

Developer **review** đề xuất của AI → tắt kịch bản:

```bash
node scripts/demo4.mjs off
npm run typecheck && npm test
```

### Cách dự phòng A — đúng lỗi slide mở đầu (TS2322)

```bash
node scripts/demo4.mjs type-error
npm run typecheck
# src/services/user.ts  Type 'string' is not assignable to type 'number'
node scripts/demo4.mjs off
```

### Cách dự phòng B — lệch Node version

```bash
node scripts/demo4.mjs node18
# máy Node 20: npm run typecheck  → PASS
# ghim CI xuống Node 18 thì runner fail vì .toSorted()
node scripts/demo4.mjs off
```

**Chốt:** AI không tự sửa production. AI rút ngắn vòng debug. Cổng quyết định vẫn là CI.

---

## Docker local (không cần AWS)

```bash
docker build -t demo-app:local .
docker run --rm -p 3000:3000 demo-app:local
curl -fsS http://127.0.0.1:3000/health
```
