import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Documents from "../pages/Documents";
import QRScanner from "../pages/QRScanner";
import BranchVerified from "../pages/BranchVerified";
import Language from "../pages/Language";
import Assistant from "../pages/Assistant";
import Workflow from "../pages/Workflow";
import RequiredDocuments from "../pages/RequiredDocuments";
import ServiceDocuments from "../pages/ServiceDocuments";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import RoleRoute from "../components/Auth/RoleRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<RoleRoute role="Customer" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/branch" element={<BranchVerified />} />
          <Route path="/language" element={<Language />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/documents" element={<RequiredDocuments />} />
          <Route path="/documents/:id" element={<ServiceDocuments />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RoleRoute role="Admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
