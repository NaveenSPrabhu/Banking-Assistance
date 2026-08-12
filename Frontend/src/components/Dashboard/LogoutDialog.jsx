import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LogoutDialog({ isOpen, onClose, onLogout }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="p-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <AlertTriangle size={40} className="text-red-600" />
            </div>
          </div>

          <h2 className="mt-5 text-center text-2xl font-bold">
            {t("menu.logoutTitle")}
          </h2>

          <p className="mt-3 text-center text-gray-600">
            {t("menu.logoutQuestion")}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
            >
              {t("menu.cancel")}
            </button>

            <button
              onClick={onLogout}
              className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
            >
              {t("menu.logout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
