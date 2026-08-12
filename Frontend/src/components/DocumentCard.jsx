import { motion } from "framer-motion";
import { FileText, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const DocumentCard = ({ document }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-4">
          <div className="shrink-0 rounded-xl bg-blue-100 p-3">
            <FileText className="text-blue-600" size={24} />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-lg font-semibold text-gray-800">
              {document.name}
            </h3>

            <p className="mt-1 break-words text-gray-500">
              {document.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 sm:px-3 sm:text-sm">
          <BadgeCheck size={16} />
          <span className="hidden sm:inline">Mandatory</span>
          <span className="sm:hidden">✓</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
