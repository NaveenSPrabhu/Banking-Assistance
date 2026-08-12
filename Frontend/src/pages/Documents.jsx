import { useTranslation } from "react-i18next";

export default function Documents() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <h1 className="text-2xl font-bold">{t("navigation.documents")}</h1>
    </div>
  );
}
