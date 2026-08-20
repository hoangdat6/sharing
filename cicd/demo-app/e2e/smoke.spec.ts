import { expect, test } from "@playwright/test";

test("landing page renders the greeting", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hello World" })).toBeVisible();
});

test("health endpoint is ok", async ({ request }) => {
  const res = await request.get("/health");
  expect(res.ok()).toBeTruthy();
  await expect(res.json()).resolves.toMatchObject({ ok: true });
});
