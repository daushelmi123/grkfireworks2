"use client";

import { useMemo, useState } from "react";
import ipdData from "@/data/ipd.json";

/**
 * Borang automasi permit — payload & endpoint SAMA dengan SPA asal:
 * POST {API}/api/pdf-orders dengan header X-API-Key.
 * Field mengikut schema zod backend (jangan ubah nama field).
 */

interface Ipd {
  id: string;
  name: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
}

const IPDS = ipdData as Ipd[];

// Pilihan perayaan -> label utk tab (tanpa tahun), name utk dalam surat (dgn tahun + noktah)
const FESTIVALS = [
  { key: "cny-2027", label: "CNY", name: "CHINESE NEW YEAR 2027." },
  { key: "raya-2027", label: "Hari Raya Aidilfitri", name: "HARI RAYA AIDILFITRI 2027." },
  { key: "deepavali-2026", label: "Deepavali", name: "DEEPAVALI 2026." },
];

const API_URL = process.env.NEXT_PUBLIC_PDF_API_URL ?? "https://grkfireworks.com";
const API_KEY =
  process.env.NEXT_PUBLIC_PDF_API_KEY ??
  "grk_prod_HT6MnsVYfIrIhYDxrl-qIHaKNaF2VMouFqtX6UwyQUo";

// Negeri kediaman (senarai penuh, macam SPA)
const HOME_STATES = [
  "Johor","Kedah","Kelantan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis",
  "Pulau Pinang","Sabah","Sarawak","Selangor","Terengganu","Kuala Lumpur","Labuan","Putrajaya",
];

// Negeri tapak perniagaan -> kunci dalam data IPD (mapping sama macam SPA)
const SITE_STATE_KEYS: Record<string, string> = {
  Johor: "Johor",
  Kedah: "Kedah",
  Kelantan: "Kelantan",
  Melaka: "Melaka",
  "Negeri Sembilan": "Negeri Sembilan",
  Pahang: "Pahang",
  Perak: "Perak",
  Perlis: "Perlis",
  "Pulau Pinang": "Pulau Pinang",
  Selangor: "Selangor",
  Terengganu: "Terengganu",
  "Kuala Lumpur": "Wilayah Persekutuan Kuala Lumpur",
  Putrajaya: "Wilayah Persekutuan Putrajaya",
};

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground mt-1">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full bg-background border border-line rounded-xl px-4 py-3 text-sm focus:border-gold outline-none";

export default function SuratForm() {
  const [f, setF] = useState({
    festivalType: "cny-2027",
    fullName: "",
    icNumber: "",
    occupation: "",
    countryCode: "60",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postcode: "",
    state: "Johor",
    companyName: "",
    companySsm: "",
    applicationDate: "",
    businessLocation: "",
    businessAddress1: "",
    businessAddress2: "",
    businessState: "Johor",
    ipd: "",
    ipdOther: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const siteIpds = useMemo(() => {
    const stateName = SITE_STATE_KEYS[f.businessState];
    return IPDS.filter((i) => i.state === stateName).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [f.businessState]);

  const ipdLabel = (i: Ipd) => i.name.replace(/Ibu Pejabat Polis Daerah\s*/gi, "IPD ");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      const chosen = IPDS.find((i) => i.id === f.ipd);
      // Surat kebenaran kini SATU template dgn slot nama perayaan (CNY/Raya/Deepavali).
      // WAJIB hantar senarai `templates`, kalau tidak backend merge SEMUA template.
      const templates = [
        "permohonan-ipd",
        "lampiran-a",
        "surat-agen",
        "surat-kebenaran",
        "surat-kelulusan",
        "borang-e-1",
        "borang-e-2",
        "borang-a",
        "penutup",
      ];
      const payload = {
        ...f,
        templates,
        festivalName: (FESTIVALS.find((x) => x.key === f.festivalType) || {}).name || "",
        ipdName: f.ipd === "other" ? f.ipdOther : chosen ? ipdLabel(chosen) : "",
        ipdAddress: chosen?.address ?? "",
        ipdCity: chosen?.city ?? "",
        ipdState: chosen?.state ?? "",
      };
      const r = await fetch(`${API_URL}/api/pdf-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": API_KEY },
        body: JSON.stringify(payload),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.message || `HTTP ${r.status}`);
      setStatus("ok");
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "Ralat tidak diketahui");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-card border border-gold/40 rounded-2xl p-8 text-center">
        <p className="text-4xl mb-3">✅</p>
        <h2 className="text-xl font-bold mb-2">Permohonan Diterima!</h2>
        <p className="text-sm text-muted-foreground">
          PDF automatik dijana dalam masa 10-15 minit. Kami akan hubungi anda melalui
          WhatsApp dengan pautan muat turun dan arahan seterusnya.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {/* Jenis Permohonan */}
      <fieldset className="bg-card border border-line rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-1">Jenis Permohonan</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Pilih jenis permohonan berdasarkan perayaan yang anda mohon.
        </p>
        <Field label="Permohonan Untuk" required hint="Sistem akan auto pilih Surat Kebenaran yang bersesuaian dengan perayaan.">
          <select value={f.festivalType} onChange={set("festivalType")} className={inputCls}>
            {FESTIVALS.map((x) => (
              <option key={x.key} value={x.key}>
                {x.label}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      {/* Maklumat Pemohon */}
      <fieldset className="bg-card border border-line rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-lg mb-1">Maklumat Pemohon</h2>
          <p className="text-xs text-muted-foreground">
            Pastikan maklumat sama seperti dalam IC untuk elak permohonan ditolak.
          </p>
        </div>
        <Field label="Nama Penuh" required>
          <input value={f.fullName} onChange={set("fullName")} required minLength={3} className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="No. Kad Pengenalan" required>
            <input
              value={f.icNumber}
              onChange={set("icNumber")}
              required
              pattern="[0-9]{6}-?[0-9]{2}-?[0-9]{4}"
              placeholder="900101-01-1234"
              className={inputCls}
            />
          </Field>
          <Field label="Pekerjaan" required>
            <input value={f.occupation} onChange={set("occupation")} required className={inputCls} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-[140px_1fr] gap-4">
          <Field label="Kod Negara">
            <select value={f.countryCode} onChange={set("countryCode")} className={inputCls}>
              <option value="60">+60 (Malaysia)</option>
            </select>
          </Field>
          <Field label="No. Telefon" required hint="Taip nombor tanpa kod negara. Sistem akan simpan sebagai 60XXXXXXXXX.">
            <input value={f.phone} onChange={set("phone")} required placeholder="137340415" className={inputCls} />
          </Field>
        </div>
      </fieldset>

      {/* Alamat Kediaman */}
      <fieldset className="bg-card border border-line rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-lg mb-1">Alamat Kediaman</h2>
          <p className="text-xs text-muted-foreground">Digunakan untuk tujuan rujukan dan verifikasi PDRM.</p>
        </div>
        <Field label="Alamat Rumah 1" required>
          <input value={f.addressLine1} onChange={set("addressLine1")} required className={inputCls} />
        </Field>
        <Field label="Alamat Rumah 2">
          <input value={f.addressLine2} onChange={set("addressLine2")} className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Bandar" required>
            <input value={f.city} onChange={set("city")} required className={inputCls} />
          </Field>
          <Field label="Poskod" required>
            <input value={f.postcode} onChange={set("postcode")} required pattern="[0-9]{5}" className={inputCls} />
          </Field>
          <Field label="Negeri" required>
            <select value={f.state} onChange={set("state")} className={inputCls}>
              {HOME_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* Maklumat Syarikat */}
      <fieldset className="bg-card border border-line rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-lg mb-1">Maklumat Syarikat</h2>
          <p className="text-xs text-muted-foreground">
            Maklumat ini digunakan untuk surat lantikan dan dokumen sokongan.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama Syarikat (SSM)" required>
            <input value={f.companyName} onChange={set("companyName")} required className={inputCls} />
          </Field>
          <Field label="No. SSM" required>
            <input value={f.companySsm} onChange={set("companySsm")} required className={inputCls} />
          </Field>
        </div>
        <Field label="Tarikh Permohonan" required>
          <input type="date" value={f.applicationDate} onChange={set("applicationDate")} required className={inputCls} />
        </Field>
      </fieldset>

      {/* Tapak Perniagaan */}
      <fieldset className="bg-card border border-line rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-lg mb-1">Maklumat Tapak Perniagaan</h2>
          <p className="text-xs text-muted-foreground">
            Pilih negeri tapak berniaga dan IPD yang menjaga kawasan tersebut. Kami akan semak sebelum dihantar ke PDRM.
          </p>
        </div>
        <Field label="Tempat Berniaga" required>
          <input value={f.businessLocation} onChange={set("businessLocation")} required className={inputCls} />
        </Field>
        <Field label="Alamat Berniaga 1" required>
          <input value={f.businessAddress1} onChange={set("businessAddress1")} required className={inputCls} />
        </Field>
        <Field label="Alamat Berniaga 2">
          <input value={f.businessAddress2} onChange={set("businessAddress2")} className={inputCls} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Negeri Tapak" required>
            <select
              value={f.businessState}
              onChange={(e) => setF((p) => ({ ...p, businessState: e.target.value, ipd: "" }))}
              className={inputCls}
            >
              {Object.keys(SITE_STATE_KEYS).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="IPD Bertanggungjawab" required hint='Jika tidak jumpa IPD anda, pilih "IPD Lain" dan isi secara manual.'>
            <select value={f.ipd} onChange={set("ipd")} required className={inputCls}>
              <option value="" disabled>Pilih IPD</option>
              {siteIpds.map((i) => (
                <option key={i.id} value={i.id}>{ipdLabel(i)}</option>
              ))}
              <option value="other">IPD Lain (Isi Manual)</option>
            </select>
          </Field>
        </div>
        {f.ipd === "other" && (
          <Field label="Nama IPD (Manual)" required>
            <input value={f.ipdOther} onChange={set("ipdOther")} required className={inputCls} />
          </Field>
        )}
      </fieldset>

      {/* Apa jadi selepas submit */}
      <div className="bg-card border border-gold/30 rounded-2xl p-6 text-sm space-y-2">
        <p className="font-bold">Apa jadi selepas submit?</p>
        <p className="text-muted-foreground">1. Team GRK semak maklumat dan padankan dengan template dokumen rasmi.</p>
        <p className="text-muted-foreground">2. PDF automatik dijana dalam masa 10-15 minit dan disimpan ke server selamat.</p>
        <p className="text-muted-foreground">3. Kami hubungi anda melalui WhatsApp dengan pautan muat turun dan arahan seterusnya.</p>
      </div>

      {status === "err" && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-xl px-4 py-3">
          Gagal hantar: {errMsg}. Cuba lagi atau WhatsApp kami terus.
        </p>
      )}

      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-4">
          Dengan menekan submit, anda bersetuju maklumat adalah tepat dan akan digunakan untuk proses permit.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold text-gold-foreground font-bold px-10 py-4 rounded-xl hover:brightness-110 disabled:opacity-50"
        >
          {status === "sending" ? "Menghantar..." : "Hantar Permohonan"}
        </button>
      </div>
    </form>
  );
}
