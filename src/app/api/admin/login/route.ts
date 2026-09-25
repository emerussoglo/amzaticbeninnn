import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const credentials = body as { username?: unknown; password?: unknown };
  if (
    typeof credentials.username !== "string" ||
    typeof credentials.password !== "string" ||
    credentials.username.length > 128 ||
    credentials.password.length > 256 ||
    !verifyAdminCredentials(credentials.username, credentials.password)
  ) {
    return NextResponse.json(
      { error: "Identifiants incorrects." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(
    adminSessionCookie.name,
    createAdminSessionToken(credentials.username),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: adminSessionCookie.maxAge,
    },
  );
  return response;
}
