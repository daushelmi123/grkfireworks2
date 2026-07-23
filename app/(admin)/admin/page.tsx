import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, listTemplates, AUTH_COOKIE } from "@/lib/admin";
import TemplateManager from "@/components/admin/TemplateManager";
import SettingsPanel from "@/components/admin/SettingsPanel";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const jar = await cookies();
  if (!verifyToken(jar.get(AUTH_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const templates = listTemplates();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Template PDF Permit</h1>
          <p className="text-sm text-neutral-400">
            Ganti fail template setiap tahun bila PDRM keluarkan borang baru.
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            formAction="/api/admin/logout"
            className="text-sm text-neutral-400 hover:text-white border border-neutral-700 rounded-lg px-3 py-1.5"
          >
            Log Keluar
          </button>
        </form>
      </div>

      <div className="mt-6">
        <SettingsPanel />
      </div>
      <TemplateManager initial={templates} />
    </div>
  );
}
