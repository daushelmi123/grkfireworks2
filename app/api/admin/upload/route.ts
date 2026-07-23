import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, replaceTemplateFile, AUTH_COOKIE } from "@/lib/admin";

export async function POST(req: Request) {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Tidak dibenarkan" }, { status: 401 });
  }

  const form = await req.formData();
  const id = String(form.get("id") || "");
  const file = form.get("file");
  if (!id || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Data tidak lengkap" }, { status: 400 });
  }
  if (file.type && file.type !== "application/pdf") {
    return NextResponse.json({ ok: false, error: "Fail mesti PDF" }, { status: 400 });
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const { backup } = replaceTemplateFile(id, buf);
    return NextResponse.json({ ok: true, backup });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Ralat" },
      { status: 400 }
    );
  }
}
