"use client";

import { useState } from "react";

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [nw2, setNw2] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (nw !== nw2) {
      setMsg({ ok: false, text: "Kata laluan baru tidak sepadan" });
      return;
    }
    setBusy(true);
    const r = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: cur, next: nw }),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) {
      setMsg({ ok: true, text: "✅ Kata laluan berjaya ditukar." });
      setCur("");
      setNw("");
      setNw2("");
    } else {
      setMsg({ ok: false, text: "❌ " + (d.error || "Gagal") });
    }
    setBusy(false);
  }

  const inputCls =
    "w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm focus:border-yellow-500 outline-none";

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-semibold text-sm">⚙️ Tetapan — Tukar Kata Laluan</span>
        <span className="text-neutral-500">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <form onSubmit={submit} className="px-4 pb-4 space-y-3 max-w-sm">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Kata laluan semasa</label>
            <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Kata laluan baru (min 8 aksara)</label>
            <input type="password" value={nw} onChange={(e) => setNw(e.target.value)} required minLength={8} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Sahkan kata laluan baru</label>
            <input type="password" value={nw2} onChange={(e) => setNw2(e.target.value)} required minLength={8} className={inputCls} />
          </div>
          {msg && (
            <p className={`text-xs ${msg.ok ? "text-green-400" : "text-red-400"}`}>{msg.text}</p>
          )}
          <button
            disabled={busy}
            className="bg-yellow-500 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:brightness-110 disabled:opacity-50"
          >
            {busy ? "Menukar..." : "Tukar Kata Laluan"}
          </button>
        </form>
      )}
    </div>
  );
}
