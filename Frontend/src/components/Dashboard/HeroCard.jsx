import { QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HeroCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-600 p-6 text-white shadow-xl sm:p-8 lg:p-10">
      <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t("dashboard.verifyTitle")}
          </h2>

          <p className="text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
            {t("dashboard.verifyDescription")}
          </p>

          <ul className="mt-6 space-y-2 text-blue-100">
            <li>✅ {t("dashboard.secureBranch")}</li>
            <li>✅ {t("dashboard.personalized")}</li>
            <li>✅ {t("dashboard.multilingualAssistance")}</li>
          </ul>

          <button
            onClick={() => navigate("/scan")}
            className="mt-8 w-full rounded-xl bg-white px-8 py-4 font-semibold text-blue-900 transition hover:bg-blue-100 sm:w-auto"
          >
            {t("dashboard.scanQR")}
          </button>
        </div>

        <div className="rounded-full bg-white/20 p-6 sm:p-8">
          <QrCode size={90} className="sm:h-[120px] sm:w-[120px]" />
        </div>
      </div>
    </div>
  );
}
