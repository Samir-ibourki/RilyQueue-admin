// src/pages/Dashboard.jsx
export function Dashboard() {
  return (
    <div>
      <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>Dashboard</h1>
      <p style={{ color: "#64748b" }}>Welcome to RiLyQueue Admin.</p>
    </div>
  );
}

export function Missions() {
  return <Placeholder title="Missions" />;
}

// export function Litiges() {
//   return <Placeholder title="Litiges" />;
// }

export function AuditLogs() {
  return <Placeholder title="Audit Logs" />;
}

export function Profil() {
  return <Placeholder title="Profil" />;
}

function Placeholder({ title }) {
  return (
    <div>
      <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{title}</h1>
      <p style={{ color: "#64748b" }}>This page is under construction.</p>
    </div>
  );
}