import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
      <Search size={20} className="shrink-0 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("documents.search")}
        className="min-w-0 w-full py-3 outline-none"
      />
    </div>
  );
}
