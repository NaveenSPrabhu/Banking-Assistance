import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  UserCircle,
  Mail,
  Phone,
  Globe,
  Building2,
  User,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LANGUAGE_NAMES,
  setApplicationLanguage,
} from "../i18n";
import { API_BASE_URL } from "../config/api";

const languageKey = {
  English: "english",
  Kannada: "kannada",
  Hindi: "hindi",
  Tamil: "tamil",
  Telugu: "telugu",
  Malayalam: "malayalam",
  Marathi: "marathi",
};

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    preferredLanguage: "English",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
        preferredLanguage:
          user.preferredLanguage || "English",
      });
    }
  }, [user]);

  const branchContext = JSON.parse(
    localStorage.getItem("branchContext") || "null"
  );

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_BASE_URL}/api/auth/profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      if (response.data.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      await setApplicationLanguage(
        updatedUser.preferredLanguage
      );

      setEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t("common.error")
      );
    } finally {
      setSaving(false);
    }
  };

  const currentLanguage =
    user?.preferredLanguage || "English";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:py-6 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          {t("profile.back")}
        </button>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-6 text-white sm:p-8">
            <div className="flex flex-col items-center">

              <UserCircle
                size={90}
                className="sm:h-[110px] sm:w-[110px]"
              />

              <h1 className="mt-4 max-w-full truncate px-4 text-center text-2xl font-bold sm:text-3xl">
                {user?.fullName ||
                  user?.username ||
                  t("menu.user")}
              </h1>

              <p className="text-blue-100">
                {user?.role ||
                  t("profile.customer")}
              </p>

            </div>
          </div>

          {/* Profile Information */}
          <div className="grid gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">

            <InfoCard
              icon={<User size={22} />}
              title={t("profile.username")}
              value={user?.username || "-"}
            />

            <InfoCard
              icon={<Mail size={22} />}
              title={t("profile.email")}
              value={user?.email || "-"}
            />

            <InfoCard
              icon={<Phone size={22} />}
              title={t("profile.mobile")}
              value={user?.mobile || "-"}
            />

            <InfoCard
              icon={<Globe size={22} />}
              title={t("profile.preferredLanguage")}
              value={t(
                `language.${
                  languageKey[currentLanguage] ||
                  "english"
                }`
              )}
            />

            <InfoCard
              icon={<Building2 size={22} />}
              title={t("profile.branch")}
              value={
                branchContext?.branch_name ||
                branchContext?.branchName ||
                t("profile.notVerified")
              }
            />

            <InfoCard
              icon={<User size={22} />}
              title={t("profile.accountType")}
              value={
                user?.role ||
                t("profile.customer")
              }
            />

          </div>

          {/* Edit Profile Button */}
          <div className="px-5 pb-5 sm:px-8 sm:pb-8">
            <button
              onClick={() => {
                setError("");
                setEditing(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              <Pencil size={18} />
              {t("profile.edit")}
            </button>
          </div>

        </div>

        {/* Edit Profile Modal */}
        {editing && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">

            <form
              onSubmit={handleSave}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
            >

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900">
                  {t("profile.editDetails")}
                </h2>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-300 bg-red-100 p-3 text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-5">

                {/* Full Name */}
                <Field
                  label={t("profile.name")}
                  value={form.fullName}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      fullName: value,
                    })
                  }
                />

                {/* Username */}
                <Field
                  label={t("profile.username")}
                  value={form.username}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      username: value,
                    })
                  }
                />

                {/* Email */}
                <Field
                  label={t("profile.email")}
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      email: value,
                    })
                  }
                />

                {/* Mobile */}
                <Field
                  label={t("profile.mobile")}
                  value={form.mobile}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      mobile: value,
                    })
                  }
                />

                {/* Language */}
                <div>
                  <label className="mb-2 block font-medium">
                    {t(
                      "profile.preferredLanguage"
                    )}
                  </label>

                  <select
                    value={form.preferredLanguage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        preferredLanguage:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-700"
                  >
                    {LANGUAGE_NAMES.map(
                      (language) => (
                        <option
                          key={language}
                          value={language}
                        >
                          {t(
                            `language.${
                              languageKey[
                                language
                              ] || "english"
                            }`
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    setEditing(false)
                  }
                  className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
                >
                  {t("profile.cancel")}
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? t("profile.saving")
                    : t("profile.save")}
                </button>

              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

/* Input Field */
function Field({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-700"
      />
    </div>
  );
}

/* Information Card */
function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-4 sm:p-5">

      <div className="mb-3 flex items-center gap-3 text-blue-700">
        {icon}

        <h3 className="font-semibold">
          {title}
        </h3>
      </div>

      <p className="break-words text-gray-700">
        {value}
      </p>

    </div>
  );
}