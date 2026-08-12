import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, Mic, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BranchVerified() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("branchContext") || "null");
    if (!saved) {
      navigate("/scan", { replace: true });
      return;
    }
    setBranch(saved);
  }, [navigate]);

  if (!branch) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate("/dashboard")} className="mb-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-100">
          <ArrowLeft size={18} />
          {t("common.back")}
        </button>

        <div className="rounded-3xl bg-white p-6 text-center shadow-xl sm:p-10">
          <CheckCircle2 className="mx-auto text-green-600" size={76} />
          <h1 className="mt-4 text-3xl font-bold text-green-700">{t("qr.verified")}</h1>
          <p className="mt-2 text-gray-500">{t("qr.connected")}</p>

          <div className="mt-7 rounded-2xl bg-green-50 p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white p-3 text-green-700 shadow-sm"><MapPin size={25} /></div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-gray-900">{branch.branchName}</h2>
                <p className="mt-1 text-sm text-gray-600">{branch.branchCode}</p>
                <p className="mt-2 text-sm text-gray-700">{branch.area}, {branch.city}, {branch.state}</p>
                <p className="mt-1 text-sm text-gray-500">{branch.address}</p>
              </div>
            </div>
          </div>

          <h2 className="mt-9 text-2xl font-bold text-gray-900">{t("assistance.choose")}</h2>
          <p className="mt-2 text-gray-500">{t("assistance.subtitle")}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button onClick={() => navigate("/assistant")} className="group rounded-2xl border-2 border-blue-100 bg-blue-50 p-6 text-left transition hover:border-blue-500 hover:bg-blue-100">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-700 p-3 text-white"><Mic size={26} /></div>
                <span className="text-2xl">→</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-blue-900">{t("assistance.voice")}</h3>
              <p className="mt-2 text-sm text-gray-600">{t("assistance.voiceDescription")}</p>
            </button>

            <button onClick={() => navigate("/workflow")} className="group rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-6 text-left transition hover:border-emerald-500 hover:bg-emerald-100">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-emerald-600 p-3 text-white"><FileText size={26} /></div>
                <span className="text-2xl">→</span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-emerald-900">{t("assistance.written")}</h3>
              <p className="mt-2 text-sm text-gray-600">{t("assistance.writtenDescription")}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
