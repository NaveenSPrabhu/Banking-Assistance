import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Info, FileText, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import documents from "../data/documents";
import DocumentCard from "../components/DocumentCard";

const docKeys = {
  1: ["aadhaar", "pan", "photo", "address"],
  2: ["aadhaar", "pan", "business", "address"],
  3: ["aadhaar", "pan", "salary", "statement"],
  4: ["aadhaar", "pan", "income", "property"],
  5: ["aadhaar", "pan", "address"],
};

const ServiceDocuments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const service = documents.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <h2 className="text-xl font-semibold">
          {t("documents.serviceNotFound")}
        </h2>
      </div>
    );
  }

  const translatedDocuments = (docKeys[service.id] || []).map(
    (key, index) => ({
      name:
        t(`services.${service.id}.docs.${key}.0`) ||
        service.documents[index]?.name,
      description:
        t(`services.${service.id}.docs.${key}.1`) ||
        service.documents[index]?.description,
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-6 sm:px-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} />
        {t("documents.back")}
      </button>

      <div className="mb-7 rounded-2xl bg-white p-5 shadow-md sm:mb-8 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-100 p-3">
            <FileText className="text-blue-600" size={28} />
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold text-gray-800 sm:text-3xl">
              {t(`services.${service.id}.name`)}
            </h1>

            <p className="mt-1 text-gray-500">
              {t(`services.${service.id}.description`)}
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-5 text-xl font-semibold text-gray-800 sm:text-2xl">
        {t("documents.required")}
      </h2>

      <div className="space-y-4">
        {translatedDocuments.map((doc, index) => (
          <DocumentCard key={index} document={doc} />
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:mt-10 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Info className="text-blue-600" size={22} />
          <h3 className="text-lg font-semibold text-blue-700">
            {t("documents.important")}
          </h3>
        </div>

        <div className="space-y-3">
          <Note text={t("documents.original")} />
          <Note text={t("documents.copies")} />
          <Note text={t("documents.valid")} />
          <Note text={t("documents.matching")} />
        </div>
      </div>
    </div>
  );
};

function Note({ text }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 shrink-0 text-green-600" size={18} />
      <p>{text}</p>
    </div>
  );
}

export default ServiceDocuments;
