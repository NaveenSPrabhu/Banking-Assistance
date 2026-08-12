import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  Bell,
  ChevronDown,
  User,
  Languages,
  LogOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoutDialog from "./LogoutDialog";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const displayName = user?.fullName || user?.username || t("menu.user");
  const role = user?.role || t("menu.customer");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowLogout(false);
    navigate("/");
  };

  return (
    <>
      <div className="relative flex w-full items-center justify-end gap-2 sm:w-auto sm:gap-4">
        <button
          className="relative rounded-full p-2 transition hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={22} className="text-gray-700 hover:text-blue-800 sm:h-6 sm:w-6" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex max-w-[calc(100vw-80px)] items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-gray-100 sm:gap-3 sm:px-3"
          >
            <UserCircle size={34} className="shrink-0 text-blue-800 sm:h-[38px] sm:w-[38px]" />

            <div className="hidden min-w-0 text-left xs:block sm:block">
              <p className="max-w-32 truncate font-semibold text-gray-900 sm:max-w-44">
                {displayName}
              </p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>

            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-100"
              >
                <User size={18} />
                {t("menu.myProfile")}
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/language");
                }}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-100"
              >
                <Languages size={18} />
                {t("menu.changeLanguage")}
              </button>

              <hr className="border-gray-200" />

              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogout(true);
                }}
                className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                {t("menu.logout")}
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutDialog
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
