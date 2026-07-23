import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, changePassword, AUTH_COOKIE } from "@/lib/admin";

export async function POST(req: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  const { current, next } = await req.json().catch(() => ({}));
  try {
    changePassword(String(current || ""), String(next || ""));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Ralat" },
      { status: 400 }
    );
  }
}
