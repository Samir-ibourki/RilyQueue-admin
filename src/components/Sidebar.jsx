import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: "⊞", label: "Dashboard", path: "/" },
  { icon: "👤", label: "Agents", path: "/agents" },
  { icon: "◎", label: "Missions", path: "/missions" },
  { icon: "△", label: "Litiges", path: "/litiges" },
  { icon: "≡", label: "Audit Logs", path: "/audit-logs" },
  { icon: "☺", label: "Profil", path: "/profil" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? 64 : 210,
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        color: "#cbd5e1",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid #334155",
          minHeight: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        {collapsed ? (
          <span style={{ color: "#38bdf8", fontWeight: 800, fontSize: 20 }}>R</span>
        ) : (
          <span style={{ fontWeight: 800, fontSize: 20, color: "#38bdf8", letterSpacing: "-0.5px", whiteSpace: "nowrap" }}>
            RiLyQueue
          </span>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              margin: "2px 8px",
              borderRadius: 8,
              cursor: "pointer",
              background: isActive ? "#38bdf8" : "transparent",
              color: isActive ? "#0f172a" : "#94a3b8",
              fontWeight: isActive ? 700 : 400,
              fontSize: 14,
              textDecoration: "none",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            })}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          padding: "16px",
          cursor: "pointer",
          color: "#64748b",
          fontSize: 13,
          borderTop: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          gap: 8,
          userSelect: "none",
        }}
      >
        <span
          style={{
            transform: collapsed ? "rotate(180deg)" : "none",
            transition: "0.2s",
            display: "inline-block",
          }}
        >
          ‹
        </span>
        {!collapsed && <span>Collapse</span>}
      </div>
    </aside>
  );
}