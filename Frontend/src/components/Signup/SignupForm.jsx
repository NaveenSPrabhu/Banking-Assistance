import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_NAMES } from "../../i18n";

import { API_BASE_URL } from "../../config/api";
export default function SignupForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    preferredLanguage: "English",
    password: "",
    confirmPassword: "",
  });

  const languageLabelKey = {
    English: "english",
    Kannada: "kannada",
    Hindi: "hindi",
    Tamil: "tamil",
    Telugu: "telugu",
    Malayalam: "malayalam",
    Marathi: "marathi",
  };

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.mobile ||
      !formData.preferredLanguage ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError(t("auth.fillAllFields"));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          preferredLanguage: formData.preferredLanguage,
        }
      );

      alert(res.data.message || t("auth.accountCreated"));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || t("auth.signupFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-8 shadow-2xl"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
          {t("auth.createAccount")}
        </h2>
        <p className="mt-2 text-gray-500">
          Join Smart Banking Voice Assistant
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium">{t("auth.fullName")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <User className="shrink-0 text-gray-500" size={20} />
            <input
              type="text"
              name="fullName"
              placeholder={t("auth.enterFullName")}
              value={formData.fullName}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">{t("auth.username")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <User className="shrink-0 text-gray-500" size={20} />
            <input
              type="text"
              name="username"
              placeholder={t("auth.chooseUsername")}
              value={formData.username}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">{t("auth.email")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <Mail className="shrink-0 text-gray-500" size={20} />
            <input
              type="email"
              name="email"
              placeholder={t("auth.enterEmail")}
              value={formData.email}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">{t("auth.mobile")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <Phone className="shrink-0 text-gray-500" size={20} />
            <input
              type="tel"
              name="mobile"
              placeholder={t("auth.enterMobile")}
              value={formData.mobile}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">{t("language.title")}</label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-700"
          >
            {LANGUAGE_NAMES.map((language) => (
              <option key={language} value={language}>
                {t(`language.${languageLabelKey[language]}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">{t("auth.password")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <Lock className="shrink-0 text-gray-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("auth.createPassword")}
              value={formData.password}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="font-medium">{t("auth.confirmPassword")}</label>
          <div className="mt-2 flex items-center rounded-xl border px-4">
            <Lock className="shrink-0 text-gray-500" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder={t("auth.confirmPassword")}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="min-w-0 w-full p-4 outline-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" required className="mt-1" />
          <span>{t("auth.terms")}</span>
        </label>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-900 py-4 text-white font-semibold transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? t("auth.creatingAccount")
            : t("auth.createAccount")}
        </button>

        <div className="text-center">
          <span className="text-gray-500">
            {t("auth.alreadyHaveAccount")}
          </span>
          <Link
            to="/"
            className="ml-2 font-semibold text-blue-700 hover:underline"
          >
            {t("auth.loginLink")}
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
