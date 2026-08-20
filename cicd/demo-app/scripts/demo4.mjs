#!/usr/bin/env node
/**
 * Bật / tắt kịch bản Demo 4: local pass, CI fail.
 *
 *   node scripts/demo4.mjs missing-file   # file gitignore — cách chính
 *   node scripts/demo4.mjs type-error     # TS2322 giống slide mở đầu
 *   node scripts/demo4.mjs node18         # dùng API chỉ có từ Node 20
 *   node scripts/demo4.mjs off            # khôi phục code sạch
 *   node scripts/demo4.mjs simulate-ci    # typecheck như CI (ẩn file gitignore)
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const userFile = path.join(root, "src/services/user.ts");
const localSession = path.join(root, "src/services/local-session.ts");
const stateFile = path.join(root, ".demo4-state.json");

const ORIGINAL = `export function parseUserId(params: { id: string }): number {
  const userId = Number(params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("invalid user id");
  }
  return userId;
}
`;

const MISSING_FILE = `import { sessionSecret } from "./local-session.js";

export function parseUserId(params: { id: string }): number {
  const userId = Number(params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("invalid user id");
  }
  void sessionSecret;
  return userId;
}
`;

const TYPE_ERROR = `export function parseUserId(params: { id: string }): number {
  const userId: number = params.id;
  return userId;
}
`;

const NODE18 = `export function parseUserId(params: { id: string }): number {
  const userId = Number(params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error("invalid user id");
  }
  // Array.prototype.toSorted chỉ có từ Node 20 / ES2023
  const _probe = [userId].toSorted((a, b) => a - b);
  return _probe[0] ?? userId;
}
`;

const LOCAL_SESSION = `export const sessionSecret = "local-only-secret";
`;

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function saveState(mode) {
  write(stateFile, JSON.stringify({ mode }, null, 2));
}

function restore() {
  write(userFile, ORIGINAL);
  if (fs.existsSync(localSession)) fs.unlinkSync(localSession);
  if (fs.existsSync(stateFile)) fs.unlinkSync(stateFile);
  console.log("Đã khôi phục src/services/user.ts về trạng thái sạch.");
}

const mode = process.argv[2] ?? "help";

if (mode === "off") {
  restore();
} else if (mode === "missing-file") {
  write(localSession, LOCAL_SESSION);
  write(userFile, MISSING_FILE);
  saveState(mode);
  console.log(`
Đã bật kịch bản missing-file.
  Local: file ${path.relative(root, localSession)} tồn tại → typecheck PASS
  CI:    file nằm trong .gitignore nên không được checkout → typecheck FAIL

Chạy local:     npm run typecheck && npm test
Giả lập CI:     node scripts/demo4.mjs simulate-ci
Tắt kịch bản:   node scripts/demo4.mjs off
`);
} else if (mode === "type-error") {
  write(userFile, TYPE_ERROR);
  saveState(mode);
  console.log(`
Đã bật kịch bản type-error (TS2322 giống slide mở đầu).
  const userId: number = params.id;

Chạy: npm run typecheck
Tắt:  node scripts/demo4.mjs off
`);
} else if (mode === "node18") {
  write(userFile, NODE18);
  saveState(mode);
  console.log(`
Đã bật kịch bản node18.
  Local Node 20+:  .toSorted() → PASS
  CI runner Node 18: thiếu API → FAIL

Nhớ ghim node-version: 18 trong .github/workflows/ci.yml khi demo.
Tắt: node scripts/demo4.mjs off
`);
} else if (mode === "simulate-ci") {
  const hidden = path.join(root, ".local-session.hidden.ts");
  const hadLocal = fs.existsSync(localSession);
  try {
    if (hadLocal) fs.renameSync(localSession, hidden);
    console.log("Đang typecheck như CI (ẩn file gitignore)...\n");
    execSync("npm run typecheck", { cwd: root, stdio: "inherit" });
    console.log("\nsimulate-ci: PASS (bất ngờ — kịch bản có thể chưa bật).");
  } catch {
    console.log("\nsimulate-ci: FAIL — đúng như CI sẽ chặn.");
    process.exitCode = 1;
  } finally {
    if (hadLocal && fs.existsSync(hidden)) fs.renameSync(hidden, localSession);
  }
} else {
  console.log(`Usage:
  node scripts/demo4.mjs missing-file
  node scripts/demo4.mjs type-error
  node scripts/demo4.mjs node18
  node scripts/demo4.mjs simulate-ci
  node scripts/demo4.mjs off`);
}
