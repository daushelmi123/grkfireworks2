import { NextResponse } from "next/server";
import { checkPassword, makeToken, AUTH_COOKIE } from "@/lib/admin";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password || ""))) {
    return NextResponse.json({ ok: false, error: "Kata laluan salah" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, makeToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 jam
  });
  return res;
}
