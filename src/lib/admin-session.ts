import "server-only";

import { createHmac, createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "amzatic_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getSigningSecret() {
  const password = process.env.ADMIN_PASSWORD;
  const databaseToken = process.env.TURSO_AUTH_TOKEN;
  if (!password || !databaseToken) {
    throw new Error("ADMIN_PASSWORD et TURSO_AUTH_TOKEN sont requis.");
  }
  return `${password}:${databaseToken}`;
}

function sign(value: string) {
  return createHmac("sha256", getSigningSecret())
    .update(value)
    .digest("base64url");
}

export function verifyAdminCredentials(username: string, password: string) {
  const configuredUsername = process.env.ADMIN;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredUsername || !configuredPassword) return false;

  const usernameHash = createHash("sha256").update(username).digest();
  const configuredUsernameHash = createHash("sha256")
    .update(configuredUsername)
    .digest();
  const passwordHash = createHash("sha256").update(password).digest();
  const configuredPasswordHash = createHash("sha256")
    .update(configuredPassword)
    .digest();
  return (
    timingSafeEqual(usernameHash, configuredUsernameHash) &&
    timingSafeEqual(passwordHash, configuredPasswordHash)
  );
}

export function createAdminSessionToken(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
    }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = Buffer.from(sign(payload));
  const receivedSignature = Buffer.from(signature);
  if (
    expectedSignature.length !== receivedSignature.length ||
    !timingSafeEqual(expectedSignature, receivedSignature)
  )
    return false;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { sub?: string; exp?: number };
    return (
      session.sub === process.env.ADMIN &&
      typeof session.exp === "number" &&
      session.exp > Date.now() / 1000
    );
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(COOKIE_NAME)?.value);
}

export const adminSessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_DURATION_SECONDS,
};
