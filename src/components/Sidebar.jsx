import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useThemeStore } from "../store/useTheme";
import { X } from "lucide-react";

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
  const { isMobileMenuOpen, closeMobileMenu } = useThemeStore();
  const location = useLocation();

  // Close sidebar on route change when in mobile mode
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`flex flex-col shrink-0 h-screen overflow-hidden transition-[width,transform] duration-250 ease-in text-slate-300 dark:bg-slate-950 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 fixed md:sticky top-0 z-50 md:z-0
        ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0"}`}
        style={{
          width: !isMobileMenuOpen && collapsed ? 64 : undefined,
          minWidth: !isMobileMenuOpen && !collapsed ? 210 : undefined,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-slate-700 min-h-[60px]"
        >
          {collapsed && !isMobileMenuOpen ? (
            <span className="text-blue-400 font-extrabold text-xl mx-auto">R</span>
          ) : (
            <span className="font-extrabold text-xl text-blue-400 tracking-tight whitespace-nowrap">
              RiLyQueue
            </span>
          )}

          {/* Close button inside mobile menu */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={closeMobileMenu}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
    </>
  );
}