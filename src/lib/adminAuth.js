import { createHash } from "crypto";

export const COOKIE_NAME = "admin_session";

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function sessionToken() {
  return hash("admin-session:" + (process.env.ADMIN_PASSWORD || ""));
}

export function passwordMatches(input) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || typeof input !== "string") return false;
  return hash(input) === hash(real);
}

export function isAdmin(request) {
  if (!process.env.ADMIN_PASSWORD) return false;
  return request.cookies.get(COOKIE_NAME)?.value === sessionToken();
}
