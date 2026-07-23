"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (r.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = await r.json().catch(() => ({}));
      setErr(d.error || "Gagal log masuk");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
      >
        <div className="text-center mb-6">
          <p className="text-2xl mb-1">🎆</p>
          <h1 className="text-xl font-bold">GRK Admin</h1>
          <p className="text-sm text-neutral-400">Pengurusan Template PDF</p>
        </div>
        <label className="block text-sm font-medium mb-1.5">Kata Laluan</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm focus:border-yellow-500 outline-none mb-4"
        />
        {err && <p className="text-sm text-red-400 mb-4">{err}</p>}
        <button
          disabled={busy}
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:brightness-110 disabled:opacity-50"
        >
          {busy ? "Sedang masuk..." : "Log Masuk"}
        </button>
      </form>
    </div>
  );
}
