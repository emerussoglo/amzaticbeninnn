import { NextResponse } from "next/server";
import { adminSessionCookie } from "@/lib/admin-session";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookie.name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
