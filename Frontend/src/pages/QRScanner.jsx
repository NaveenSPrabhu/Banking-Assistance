import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CameraScanner from "../components/QR/CameraScanner";
import VerificationLoader from "../components/QR/VerificationLoader";

import { API_BASE_URL } from "../config/api";
export default function QRScanner() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleScanSuccess = async (data) => {
    setVerifying(true);
    setError("");

    try {
      let branchCode = data;

      try {
        const parsed = JSON.parse(data);
        branchCode = parsed.branchId || parsed.branchCode || data;
      } catch {
        branchCode = String(data).trim();
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/branches/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ branchCode }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to verify branch.");
      }

      localStorage.setItem("branchContext", JSON.stringify(result.branch));
      navigate("/branch");
    } catch (err) {
      console.error("Branch verification error:", err);
      setError(err.message || "Unable to verify branch.");
      setVerifying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-3 py-6 sm:px-4 sm:py-10"
    >
      <div className="w-full max-w-3xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">{t("qr.back")}</span>
        </button>

        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
        >
          {!verifying ? (
            <>
              <div className="px-5 pb-5 pt-7 text-center sm:px-8 sm:pb-6 sm:pt-8">
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                  {t("qr.title")}
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
                  {t("qr.description")}
                </p>
              </div>

              <div className="px-3 pb-6 sm:px-6 sm:pb-8">
                <CameraScanner onScanSuccess={handleScanSuccess} />
                {error && (
                  <div className="mx-auto mt-5 max-w-xl rounded-xl border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-16 sm:py-20">
              <VerificationLoader />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
