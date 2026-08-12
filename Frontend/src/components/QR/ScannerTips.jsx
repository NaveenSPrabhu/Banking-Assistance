import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ScannerTips() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 rounded-2xl bg-blue-50 p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Info className="text-blue-700" />
        <h3 className="font-semibold text-blue-800">
          {t("qr.scannerTips")}
        </h3>
      </div>

      <ul className="mt-4 space-y-2 text-gray-700">
        <li>✔ {t("qr.keepInside")}</li>
        <li>✔ {t("qr.steady")}</li>
        <li>✔ {t("qr.lighting")}</li>
      </ul>
    </div>
  );
}
