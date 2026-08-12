import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBar from "../components/SearchBar";
import { ArrowLeft } from "lucide-react";
import documents from "../data/documents";
import ServiceCard from "../components/ServiceCard";

const RequiredDocuments = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const filteredServices = documents.filter((service) =>
    t(`services.${service.id}.name`)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} />
        {t("documents.back")}
      </button>

      <div className="mb-7 sm:mb-8">
        <h1 className="text-2xl font-bold text-blue-900 sm:text-4xl">
          📄 {t("documents.title")}
        </h1>
        <p className="mt-2 text-base text-gray-600 sm:text-lg">
          {t("documents.description")}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-gray-500">
              {t("documents.notFound")}
            </p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => navigate(`/documents/${service.id}`)}
              title={t(`services.${service.id}.name`)}
              description={t(`services.${service.id}.description`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RequiredDocuments;
