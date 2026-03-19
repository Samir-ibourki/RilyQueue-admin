
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AgentManagement from "./pages/Agentmanagement.jsx";
import Litiges from "./pages/Litiges.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Profil from "./pages/Profil.jsx";
import Missions from "./pages/Missions.jsx";
import AuditLogs from "./pages/AuditLogs.jsx";


const DEV_MODE = true;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={DEV_MODE ? <Navigate to="/" replace /> : <Login />} />

      {/* Bypass Protection in DEV_MODE */}
      <Route element={DEV_MODE ? <Layout /> : <ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/"           element={<Dashboard />} />
        <Route path="/agents"     element={<AgentManagement />} />
        <Route path="/missions"   element={<Missions />} />
        <Route path="/litiges"    element={<Litiges />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/profil"     element={<Profil />} />
      </Route>
    </Routes>
  );
}