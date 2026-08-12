import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import HeroCard from "../components/Dashboard/HeroCard";
import ServiceCard from "../components/Dashboard/ServiceCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <DashboardHeader />

      <div className="mt-6 rounded-3xl bg-gradient-to-r from-blue-800 to-cyan-600 p-6 text-white shadow-lg sm:mt-8 sm:p-8">
        <h2 className="text-2xl font-bold sm:text-4xl">
          {t("dashboard.welcome")} 👋
        </h2>

        <p className="mt-3 max-w-2xl text-base text-blue-100 sm:text-lg">
          {t("dashboard.description")}
        </p>
      </div>

      <HeroCard />

      <section className="mt-8 sm:mt-12">
        <h2 className="mb-5 text-xl font-bold text-gray-800 sm:mb-6 sm:text-2xl">
          {t("dashboard.quickServices")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            icon="📄"
            title={t("dashboard.requiredDocuments")}
            description={t("dashboard.documentsDescription")}
            onClick={() => navigate("/documents")}
          />
        </div>
      </section>
    </div>
  );
}
