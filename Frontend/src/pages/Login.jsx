import { Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import LoginForm from "../components/Login/LoginForm";

export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center gap-10 px-4 py-8 sm:px-6 lg:justify-between lg:px-10">
        <div className="hidden text-white lg:block">
          <div className="flex items-center gap-5">
            <div className="rounded-full bg-white p-5">
              <Landmark className="text-blue-900" size={55} />
            </div>
            <h1 className="text-5xl font-bold">
              Smart Banking
              <br />
              Assistant
            </h1>
          </div>

          <p className="mt-10 max-w-xl text-xl leading-10">
            {t("marketing.subtitle")}
          </p>

          <div className="mt-12 space-y-5 text-lg">
            <p>✔ {t("marketing.voiceGuided")}</p>
            <p>✔ {t("marketing.regional")}</p>
            <p>✔ {t("marketing.qr")}</p>
            <p>✔ {t("marketing.workflow")}</p>
            <p>✔ {t("marketing.forms")}</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
