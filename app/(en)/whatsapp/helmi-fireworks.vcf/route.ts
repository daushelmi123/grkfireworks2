import { NextResponse } from "next/server";

/**
 * Kad kenalan (vCard) untuk butang "Simpan No. Telefon" pada /link.
 *
 * SENGAJA bukan di bawah /api — Apache memproksi /api ke servis PDF (port 4000).
 */

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:;Helmi Fireworks;;;",
  "FN:Helmi Fireworks",
  "ORG:GRK Pyrotechnics Sdn Bhd",
  "TEL;TYPE=CELL,VOICE:+601124430415",
  "URL:https://grkfireworks.com",
  "ADR;TYPE=WORK:;;10 Jalan Pelepas 4/2\\, Taman Perindustrian Gelang Patah;Johor Bahru;81550;Johor;Malaysia",
  "NOTE:WhatsApp +60 11-2443 0415",
  "END:VCARD",
].join("\r\n");

export function GET() {
  return new NextResponse(`${VCARD}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      // Tanpa `attachment`: telefon (iOS/Android) terus buka kad contact — 1 tap sahaja.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
