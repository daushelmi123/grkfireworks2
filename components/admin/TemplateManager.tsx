"use client";

import { useState, useRef } from "react";
import type { TemplateInfo } from "@/lib/admin";

function fmtSize(b: number) {
  if (!b) return "—";
  return b > 1024 * 1024
    ? (b / 1024 / 1024).toFixed(2) + " MB"
    : Math.round(b / 1024) + " KB";
}
function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TemplateManager({ initial }: { initial: TemplateInfo[] }) {
  const [rows, setRows] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ id: string; text: string; ok: boolean } | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  async function refresh() {
    // muat semula senarai dari server (selepas ubah)
    const r = await fetch("/api/admin/templates");
    if (r.ok) setRows((await r.json()).templates);
  }

  async function upload(id: string, file: File) {
    setBusyId(id);
    setMsg(null);
    const fd = new FormData();
    fd.append("id", id);
    fd.append("file", file);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setMsg({ id, text: "✅ Berjaya diganti. Fail lama dibackup.", ok: true });
      await refresh();
    } else {
      setMsg({ id, text: "❌ " + (d.error || "Gagal"), ok: false });
    }
    setBusyId(null);
    if (fileRefs.current[id]) fileRefs.current[id]!.value = "";
  }

  async function toggle(id: string, enabled: boolean) {
    setBusyId(id);
    const r = await fetch("/api/admin/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, enabled }),
    });
    if (r.ok) {
      setRows((rs) => rs.map((x) => (x.id === id ? { ...x, enabled } : x)));
    }
    setBusyId(null);
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="bg-yellow-500/10 border border-yellow-600/40 rounded-xl p-4 text-sm text-yellow-200">
        <strong>Nota penting:</strong> Ganti fail PDF di sini bila borang PDRM
        berubah tahun baru. Fail lama auto-backup sebelum diganti. Surat kebenaran
        perayaan: <code>CNY</code> dan <code>Raya</code> berasingan — pastikan
        awak ganti yang betul.
      </div>

      {rows.map((t, i) => (
        <div
          key={t.id}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-neutral-500 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold">{t.id}</h3>
                {t.festival && (
                  <span className="text-[11px] font-bold bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                    {t.festival}
                  </span>
                )}
                {!t.enabled && (
                  <span className="text-[11px] bg-neutral-700 text-neutral-300 px-2 py-0.5 rounded-full">
                    dimatikan
                  </span>
                )}
                {!t.exists && (
                  <span className="text-[11px] bg-red-900 text-red-200 px-2 py-0.5 rounded-full">
                    fail tiada!
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1 font-mono">{t.file}</p>
              <p className="text-xs text-neutral-500 mt-0.5">
                {fmtSize(t.sizeBytes)} · dikemaskini {fmtDate(t.modified)}
                {t.fields && t.fields.length > 0 ? ` · ${t.fields.length} medan auto-isi` : ""}
              </p>
              {t.fields && t.fields.length > 0 && (
                <p className="text-xs text-amber-400/90 mt-1.5 bg-amber-500/10 border border-amber-600/30 rounded-md px-2 py-1 inline-block">
                  ⚠️ Ada auto-isi (nama/IC/alamat) — <strong>test borang selepas ganti</strong> untuk pastikan data masuk betul
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`/api/admin/download?id=${t.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs border border-neutral-700 rounded-lg px-3 py-2 hover:border-yellow-500"
              >
                Lihat semasa
              </a>
              <label
                className={`text-xs font-bold rounded-lg px-3 py-2 cursor-pointer ${
                  busyId === t.id
                    ? "bg-neutral-700 text-neutral-400"
                    : "bg-yellow-500 text-black hover:brightness-110"
                }`}
              >
                {busyId === t.id ? "..." : "Ganti PDF"}
                <input
                  ref={(el) => {
                    fileRefs.current[t.id] = el;
                  }}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  disabled={busyId === t.id}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) upload(t.id, f);
                  }}
                />
              </label>
              <button
                onClick={() => toggle(t.id, !t.enabled)}
                disabled={busyId === t.id}
                className={`text-xs rounded-lg px-3 py-2 border ${
                  t.enabled
                    ? "border-green-700 text-green-400"
                    : "border-neutral-700 text-neutral-400"
                }`}
                title="Aktif/matikan dalam gabungan PDF"
              >
                {t.enabled ? "Aktif" : "Mati"}
              </button>
            </div>
          </div>

          {msg?.id === t.id && (
            <p className={`text-xs mt-2 ${msg.ok ? "text-green-400" : "text-red-400"}`}>
              {msg.text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
