
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AgentManagement from "./pages/Agentmanagement.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profil from "./pages/Profil.jsx";
import { Missions, Litiges, AuditLogs } from "./pages/Placeholders.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"           element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        <Route path="/agents"     element={<AgentManagement />} />
        <Route path="/missions"   element={<Missions />} />
        <Route path="/litiges"    element={<Litiges />} />
        <Route path="/audit-logs" element={<AuditLogs />} />
        <Route path="/profil"     element={<Profil />} />
      </Route>
    </Routes>
  );
}