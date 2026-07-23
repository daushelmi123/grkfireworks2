import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { verifyToken, readConfig, TEMPLATES_DIR, AUTH_COOKIE } from "@/lib/admin";

export async function GET(req: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id") || "";
  const t = readConfig().templates.find((x) => x.id === id);
  if (!t) return NextResponse.json({ ok: false, error: "Tiada" }, { status: 404 });

  const fp = path.join(TEMPLATES_DIR, t.file);
  if (!fs.existsSync(fp)) {
    return NextResponse.json({ ok: false, error: "Fail tiada" }, { status: 404 });
  }
  const data = fs.readFileSync(fp);
  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${t.file}"`,
    },
  });
}
