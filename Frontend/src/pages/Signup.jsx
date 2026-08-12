import { Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import SignupForm from "../components/Signup/SignupForm";

export default function Signup() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="hidden text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mb-6 flex items-center gap-3">
            <Landmark size={48} />
            <h1 className="text-5xl font-bold">Smart Banking</h1>
          </div>

          <h2 className="mb-6 text-3xl font-semibold">
            Voice Assistant
          </h2>

          <p className="text-lg leading-8 text-blue-100">
            {t("marketing.signupIntro")}
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <p>{t("marketing.secureAuth")}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <p>{t("marketing.multiLanguage")}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎤</span>
              <p>{t("marketing.aiVoice")}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <p>{t("marketing.documentVerification")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
