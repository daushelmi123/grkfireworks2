import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, setTemplateEnabled, AUTH_COOKIE } from "@/lib/admin";

export async function POST(req: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  const { id, enabled } = await req.json().catch(() => ({}));
  if (!id || typeof enabled !== "boolean") {
    return NextResponse.json({ ok: false, error: "Data tidak sah" }, { status: 400 });
  }
  try {
    setTemplateEnabled(String(id), enabled);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Ralat" },
      { status: 400 }
    );
  }
}
