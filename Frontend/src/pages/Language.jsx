import { useState } from "react";
import { ArrowLeft, Globe2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGE_NAMES, setApplicationLanguage } from "../i18n";

import { API_BASE_URL } from "../config/api";
const languageKey = {
  English: "english",
  Kannada: "kannada",
  Hindi: "hindi",
  Tamil: "tamil",
  Telugu: "telugu",
  Malayalam: "malayalam",
  Marathi: "marathi",
};

export default function Language() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [saving, setSaving] = useState(false);

  const currentCode = i18n.language || "en";
  const currentLanguage =
    LANGUAGE_NAMES.find(
      (name) =>
        ({
          English: "en",
          Kannada: "kn",
          Hindi: "hi",
          Tamil: "ta",
          Telugu: "te",
          Malayalam: "ml",
          Marathi: "mr",
        }[name] === currentCode)
    ) || "English";

  const chooseLanguage = async (language) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      await setApplicationLanguage(language);

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (user && token) {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              mobile: user.mobile,
              preferredLanguage: language,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.token) localStorage.setItem("token", data.token);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          {t("profile.back")}
        </button>

        <div className="rounded-3xl bg-white p-5 shadow-lg sm:p-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-100 p-3">
              <Globe2 className="text-blue-800" size={30} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
                {t("language.change")}
              </h1>
              <p className="mt-1 text-gray-500">
                {t("language.select")}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {LANGUAGE_NAMES.map((language) => {
              const selected = language === currentLanguage;

              return (
                <button
                  key={language}
                  type="button"
                  disabled={saving}
                  onClick={() => chooseLanguage(language)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition hover:bg-gray-50 ${
                    selected
                      ? "border-blue-700 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span className="font-semibold text-gray-800">
                    {t(`language.${languageKey[language]}`)}
                  </span>

                  {selected && (
                    <Check
                      size={20}
                      className="text-blue-700"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
