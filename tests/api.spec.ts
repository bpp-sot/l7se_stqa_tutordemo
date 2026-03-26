import { test, expect } from "@playwright/test";

test("GET /health returns ok", async ({ request }) => {
  const res = await request.get("http://localhost:8000/health");
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ status: "ok" });
});


test("GET /staff returns first page of staff", async ({ request }) => {
  const res = await request.get("http://localhost:8000/staff");
  expect(res.status()).toBe(200);

  const data = await res.json();

  expect(data.total).toBe(10);          // you have 10 staff in DB
  expect(data.page).toBe(1);
  expect(data.page_size).toBe(10);
  expect(data.items.length).toBe(10);
});
