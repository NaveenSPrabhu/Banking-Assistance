import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function VerificationLoader() {
  const { t } = useTranslation();

  return (
    <div className="py-10 text-center">
      <LoaderCircle
        size={50}
        className="mx-auto animate-spin text-blue-700"
      />
      <h2 className="mt-4 text-2xl font-semibold">
        {t("qr.verifying")}
      </h2>
      <p className="mt-2 px-4 text-gray-500">
        {t("qr.verifyWait")}
      </p>
    </div>
  );
}
