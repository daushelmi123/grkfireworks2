import "server-only";
import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Direktori PDF service (di VPS). Config + template PDF sebenar duduk di sini,
 * BUKAN dalam app Next.js — jadi deploy Next tak sentuh fail template.
 */
export const PDF_SERVICE_DIR =
  process.env.PDF_SERVICE_DIR || "/var/www/grkfireworks.com/pdf-service";

export const CONFIG_PATH = path.join(PDF_SERVICE_DIR, "config/pdf-templates.json");
export const TEMPLATES_DIR = path.join(PDF_SERVICE_DIR, "pdf_templates");
export const BACKUP_DIR = path.join(TEMPLATES_DIR, "_backup");

export interface TemplateField {
  templateField: string;
  payloadField: string;
  transform?: string;
}
export interface Template {
  id: string;
  file: string;
  description?: string;
  enabled?: boolean;
  fields?: TemplateField[];
}
export interface TemplateRegistry {
  templates: Template[];
}

/** Perayaan -> id surat kebenaran yang betul (rujukan untuk UI). */
export const FESTIVAL_LETTERS: Record<string, string> = {
  "CNY": "surat-kebenaran-cny",
  "Raya": "surat-kebenaran-raya",
};

export function readConfig(): TemplateRegistry {
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(raw) as TemplateRegistry;
}

export function writeConfig(reg: TemplateRegistry) {
  // Tulis atomik: fail temp -> rename, elak config separuh bila crash.
  const tmp = CONFIG_PATH + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(reg, null, 2), "utf8");
  fs.renameSync(tmp, CONFIG_PATH);
}

export interface TemplateInfo extends Template {
  exists: boolean;
  sizeBytes: number;
  modified: string | null;
  festival: string | null;
}

export function listTemplates(): TemplateInfo[] {
  const reg = readConfig();
  return reg.templates.map((t) => {
    const fp = path.join(TEMPLATES_DIR, t.file);
    let exists = false,
      sizeBytes = 0,
      modified: string | null = null;
    try {
      const st = fs.statSync(fp);
      exists = true;
      sizeBytes = st.size;
      modified = st.mtime.toISOString();
    } catch {
      /* fail tiada */
    }
    const festival =
      t.id === "surat-kebenaran-cny"
        ? "CNY"
        : t.id === "surat-kebenaran-raya"
          ? "Raya"
          : null;
    return { ...t, exists, sizeBytes, modified, festival };
  });
}

/** Ganti fail template — backup yang lama dulu. Return path backup. */
export function replaceTemplateFile(
  templateId: string,
  buffer: Buffer
): { ok: true; backup: string | null } {
  const reg = readConfig();
  const t = reg.templates.find((x) => x.id === templateId);
  if (!t) throw new Error(`Template tidak dijumpai: ${templateId}`);

  // Sahkan ia PDF sebenar (magic bytes %PDF)
  if (buffer.subarray(0, 4).toString("latin1") !== "%PDF") {
    throw new Error("Fail bukan PDF yang sah.");
  }

  const dest = path.join(TEMPLATES_DIR, t.file);
  let backup: string | null = null;

  if (fs.existsSync(dest)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    // stamp masa dari mtime fail (elak Date.now — & deterministik pada fail)
    const stamp = fs
      .statSync(dest)
      .mtime.toISOString()
      .replace(/[:.]/g, "-");
    const backupName = `${t.file}.${stamp}.bak`;
    backup = path.join(BACKUP_DIR, backupName);
    fs.copyFileSync(dest, backup);
  }

  const tmp = dest + ".tmp";
  fs.writeFileSync(tmp, buffer);
  fs.renameSync(tmp, dest);
  return { ok: true, backup };
}

export function setTemplateEnabled(templateId: string, enabled: boolean) {
  const reg = readConfig();
  const t = reg.templates.find((x) => x.id === templateId);
  if (!t) throw new Error(`Template tidak dijumpai: ${templateId}`);
  t.enabled = enabled;
  writeConfig(reg);
}

export function listBackups(templateFile: string): Array<{
  name: string;
  sizeBytes: number;
  modified: string;
}> {
  try {
    return fs
      .readdirSync(BACKUP_DIR)
      .filter((f) => f.startsWith(templateFile + "."))
      .map((f) => {
        const st = fs.statSync(path.join(BACKUP_DIR, f));
        return { name: f, sizeBytes: st.size, modified: st.mtime.toISOString() };
      })
      .sort((a, b) => (a.modified < b.modified ? 1 : -1));
  } catch {
    return [];
  }
}

// ---------- Auth ringkas (cookie ditandatangani HMAC) ----------

const SECRET = process.env.ADMIN_SECRET || "grk-admin-dev-secret-change-me";
export const AUTH_COOKIE = "grk_admin";

export function makeToken(): string {
  // token = payload.signature; payload = "ok" (mudah, satu pengguna)
  const payload = "ok";
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (payload !== "ok" || !sig) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  // banding masa-tetap
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

/**
 * Password disimpan (hashed) dalam fail luar app supaya boleh ditukar dari
 * dashboard tanpa restart / redeploy. Fail duduk luar folder Next (deploy
 * rsync --delete tak sentuh). Kalau fail belum ada, guna ADMIN_PASSWORD env
 * sebagai bootstrap.
 */
const AUTH_DIR = process.env.ADMIN_DATA_DIR || "/var/www/grk-admin";
const AUTH_FILE = path.join(AUTH_DIR, "auth.json");

function hashPw(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function readAuthFile(): { salt: string; hash: string } | null {
  try {
    return JSON.parse(fs.readFileSync(AUTH_FILE, "utf8"));
  } catch {
    return null;
  }
}

export function checkPassword(input: string): boolean {
  const stored = readAuthFile();
  if (stored) {
    const candidate = hashPw(input, stored.salt);
    try {
      return crypto.timingSafeEqual(
        Buffer.from(candidate, "hex"),
        Buffer.from(stored.hash, "hex")
      );
    } catch {
      return false;
    }
  }
  // Bootstrap: belum pernah tukar — banding dengan env
  const pw = process.env.ADMIN_PASSWORD || "";
  if (!pw || input.length !== pw.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(pw));
  } catch {
    return false;
  }
}

/** Tukar password. Sahkan yang lama dulu; tulis hash baru ke fail. */
export function changePassword(current: string, next: string): void {
  if (!checkPassword(current)) throw new Error("Kata laluan semasa salah");
  if (next.length < 8) throw new Error("Kata laluan baru mesti sekurang-kurangnya 8 aksara");
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPw(next, salt);
  fs.mkdirSync(AUTH_DIR, { recursive: true });
  const tmp = AUTH_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify({ salt, hash }, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, AUTH_FILE);
}
