import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setApplicationLanguage } from "../../i18n";

import { API_BASE_URL } from "../../config/api";
export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t("auth.fillAllFields"));
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email: username, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const preferredLanguage =
        response.data.user.preferredLanguage || "English";

      await setApplicationLanguage(preferredLanguage);

      const role = String(response.data.user.role || "Customer").toLowerCase();
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || t("auth.invalidCredentials")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-5 sm:p-8 shadow-2xl">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900">
          {t("auth.welcomeBack")}
        </h2>
        <p className="mt-2 text-gray-500">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            {t("auth.username")}
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 px-4">
            <User size={20} className="shrink-0 text-gray-500" />
            <input
              type="text"
              placeholder={t("auth.enterEmail")}
              className="min-w-0 w-full p-4 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            {t("auth.password")}
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 px-4">
            <Lock size={20} className="shrink-0 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.enterPassword")}
              className="min-w-0 w-full p-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            {t("auth.rememberMe")}
          </label>

          <button
            type="button"
            className="self-start text-sm text-blue-700 hover:underline"
          >
            {t("auth.forgotPassword")}
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-900 py-4 text-white font-semibold transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t("auth.loggingIn") : t("auth.login")}
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">
            {t("auth.dontHaveAccount")}
          </span>
          <Link
            to="/signup"
            className="ml-2 font-semibold text-blue-700 hover:text-blue-900 hover:underline"
          >
            {t("auth.createAccount")}
          </Link>
        </div>
      </form>
    </div>
  );
}
