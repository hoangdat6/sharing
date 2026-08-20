import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { login } from "./auth/login.js";
import { fetchUserSummary } from "./services/api.js";
import { parseUserId } from "./services/user.js";

const here = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.resolve(here, "../public")));

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "demo-app" });
  });

  app.post("/api/login", (req, res) => {
    const result = login(req.body);
    if (!result.ok) {
      res.status(401).json(result);
      return;
    }
    res.json(result);
  });

  app.get("/api/users/:id", (req, res) => {
    const id = parseUserId({ id: req.params.id });
    res.json(fetchUserSummary(id));
  });

  return app;
}
