import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, listTemplates, AUTH_COOKIE } from "@/lib/admin";

export async function GET() {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  return NextResponse.json({ templates: listTemplates() });
}
