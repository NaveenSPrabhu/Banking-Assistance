import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Building2,
  CheckCircle2,
  Edit3,
  LogOut,
  Plus,
  QrCode,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

const API = API_URL;

const emptyForm = {
  branchCode: "",
  branchName: "",
  area: "",
  city: "",
  state: "Karnataka",
  address: "",
};

function authConfig() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

function qrUrl(branchCode) {
  const payload = JSON.stringify({
    branchId: branchCode,
  });

  return `https://api.qrserver.com/v1/create-qr-code/?size=420x420&data=${encodeURIComponent(
    payload
  )}`;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [qrBranch, setQrBranch] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const activeCount = useMemo(
    () => branches.filter((branch) => branch.isActive).length,
    [branches]
  );

  const loadBranches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/branches`,
        authConfig()
      );

      setBranches(response.data.branches || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load branches."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setError("");
  };

  const openEdit = (branch) => {
    setEditing(branch.id);

    setForm({
      branchCode: branch.branchCode || "",
      branchName: branch.branchName || "",
      area: branch.area || "",
      city: branch.city || "",
      state: branch.state || "Karnataka",
      address: branch.address || "",
    });

    setShowForm(true);
    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = editing
        ? await axios.put(
            `${API}/branches/${editing}`,
            form,
            authConfig()
          )
        : await axios.post(
            `${API}/branches`,
            form,
            authConfig()
          );

      setBranches((current) => {
        if (editing) {
          return current.map((branch) =>
            branch.id === editing
              ? response.data.branch
              : branch
          );
        }

        return [
          response.data.branch,
          ...current,
        ];
      });

      setShowForm(false);
      setForm({ ...emptyForm });
      setEditing(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save branch."
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleBranch = async (branch) => {
    try {
      setError("");

      const response = await axios.patch(
        `${API}/branches/${branch.id}/toggle`,
        {},
        authConfig()
      );

      setBranches((current) =>
        current.map((item) =>
          item.id === branch.id
            ? response.data.branch
            : item
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update branch status."
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const downloadQr = (branch) => {
    const link = document.createElement("a");

    link.href = qrUrl(branch.branchCode);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${branch.branchCode}-branch-qr.png`;

    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <header className="flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3">
              <ShieldCheck
                className="text-green-700"
                size={30}
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-blue-900 sm:text-2xl">
                {t("admin.title")}
              </h1>

              <p className="text-sm text-gray-500">
                {user?.fullName || "Administrator"} ·{" "}
                {t("admin.branchManagement")}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            {t("menu.logout")}
          </button>
        </header>

        {/* Statistics */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Building2 />}
            label={t("admin.totalBranches")}
            value={branches.length}
          />

          <StatCard
            icon={<CheckCircle2 />}
            label={t("admin.activeBranches")}
            value={activeCount}
          />

          <StatCard
            icon={<QrCode />}
            label={t("admin.qrCodes")}
            value={branches.length}
          />
        </section>

        {/* Branch Management */}
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-lg sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t("admin.manageBranches")}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {t("admin.manageDescription")}
              </p>
            </div>

            <button
              onClick={openCreate}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900"
            >
              <Plus size={19} />
              {t("admin.addBranch")}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              {t("common.loading")}
            </div>
          ) : branches.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              {t("admin.noBranches")}
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-2xl border">
              <table className="min-w-[900px] w-full text-left">
                <thead className="bg-slate-50 text-sm text-gray-600">
                  <tr>
                    <th className="px-4 py-4">
                      {t("admin.branchCode")}
                    </th>

                    <th className="px-4 py-4">
                      {t("admin.branchName")}
                    </th>

                    <th className="px-4 py-4">
                      {t("admin.area")}
                    </th>

                    <th className="px-4 py-4">
                      {t("admin.city")}
                    </th>

                    <th className="px-4 py-4">
                      {t("admin.status")}
                    </th>

                    <th className="px-4 py-4">
                      {t("admin.actions")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {branches.map((branch) => (
                    <tr
                      key={branch.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-semibold text-blue-900">
                        {branch.branchCode}
                      </td>

                      <td className="px-4 py-4">
                        {branch.branchName}
                      </td>

                      <td className="px-4 py-4">
                        {branch.area}
                      </td>

                      <td className="px-4 py-4">
                        {branch.city}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            branch.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {branch.isActive
                            ? t("admin.active")
                            : t("admin.inactive")}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">

                          {/* Edit */}
                          <button
                            onClick={() =>
                              openEdit(branch)
                            }
                            className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                            title={t(
                              "admin.editBranch"
                            )}
                          >
                            <Edit3 size={18} />
                          </button>

                          {/* QR */}
                          <button
                            onClick={() =>
                              setQrBranch(branch)
                            }
                            className="rounded-lg p-2 text-purple-700 hover:bg-purple-50"
                            title={t(
                              "admin.generateQr"
                            )}
                          >
                            <QrCode size={18} />
                          </button>

                          {/* Activate / Deactivate */}
                          <button
                            onClick={() =>
                              toggleBranch(branch)
                            }
                            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                            title={t(
                              "admin.toggleBranch"
                            )}
                          >
                            {branch.isActive ? (
                              <ToggleRight size={20} />
                            ) : (
                              <ToggleLeft size={20} />
                            )}
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Add / Edit Branch Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleSave}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">
                {editing
                  ? t("admin.editBranch")
                  : t("admin.addBranch")}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label={t("admin.branchCode")}
                value={form.branchCode}
                onChange={(value) =>
                  setForm({
                    ...form,
                    branchCode: value,
                  })
                }
                required
              />

              <Field
                label={t("admin.branchName")}
                value={form.branchName}
                onChange={(value) =>
                  setForm({
                    ...form,
                    branchName: value,
                  })
                }
                required
              />

              <Field
                label={t("admin.area")}
                value={form.area}
                onChange={(value) =>
                  setForm({
                    ...form,
                    area: value,
                  })
                }
                required
              />

              <Field
                label={t("admin.city")}
                value={form.city}
                onChange={(value) =>
                  setForm({
                    ...form,
                    city: value,
                  })
                }
                required
              />

              <Field
                label={t("admin.state")}
                value={form.state}
                onChange={(value) =>
                  setForm({
                    ...form,
                    state: value,
                  })
                }
                required
              />

              <Field
                label={t("admin.address")}
                value={form.address}
                onChange={(value) =>
                  setForm({
                    ...form,
                    address: value,
                  })
                }
                required
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
              >
                {t("common.cancel")}
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900 disabled:opacity-50"
              >
                {saving
                  ? t("profile.saving")
                  : t("common.save")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* QR Modal */}
      {qrBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-900">
                {t("admin.generateQr")}
              </h2>

              <button
                onClick={() => setQrBranch(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-gray-500">
              {qrBranch.branchName} ·{" "}
              {qrBranch.branchCode}
            </p>

            <img
              src={qrUrl(qrBranch.branchCode)}
              alt={`QR for ${qrBranch.branchCode}`}
              className="mx-auto mt-5 h-64 w-64 rounded-xl border p-2"
            />

            <p className="mt-3 text-xs text-gray-500">
              {t("admin.qrOnlyContext")}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() =>
                  downloadQr(qrBranch)
                }
                className="flex-1 rounded-xl bg-blue-800 px-4 py-3 font-semibold text-white hover:bg-blue-900"
              >
                {t("admin.downloadQr")}
              </button>

              <button
                onClick={() =>
                  window.open(
                    qrUrl(qrBranch.branchCode),
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex-1 rounded-xl border px-4 py-3 font-semibold hover:bg-gray-50"
              >
                {t("admin.openQr")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">
      <div className="flex items-center gap-3 text-blue-800">
        {icon}

        <span className="font-semibold text-gray-700">
          {label}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-medium text-gray-800">
        {label}
      </span>

      <input
        required={required}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-700"
      />
    </label>
  );
}