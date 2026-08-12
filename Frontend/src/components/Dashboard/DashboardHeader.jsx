import { Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProfileMenu from "./ProfileMenu";

export default function DashboardHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-4 rounded-2xl bg-white px-4 py-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="shrink-0 rounded-xl bg-blue-100 p-2.5 sm:p-3">
          <Landmark size={28} className="text-blue-800 sm:h-8 sm:w-8" />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-blue-900 sm:text-2xl">
            {t("app.name")}
          </h1>
          <p className="text-xs text-gray-500 sm:text-sm">
            {t("dashboard.secure")} • {t("dashboard.smart")} • {t("dashboard.multilingual")}
          </p>
        </div>
      </div>

      <ProfileMenu />
    </header>
  );
}
