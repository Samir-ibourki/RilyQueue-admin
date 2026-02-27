import { useState } from "react";

const agents = [
  { id: "AG001", name: "Mohammed Alami",  phone: "+212 6XX XXX 001", kyc: "Pending",  trust: "Bronze", city: "Rabat",      joinDate: "2026-02-20" },
  { id: "AG002", name: "Fatima Bennani",  phone: "+212 6XX XXX 002", kyc: "Approved", trust: "Gold",   city: "Casablanca", joinDate: "2026-01-15" },
  { id: "AG003", name: "Youssef Idrissi", phone: "+212 6XX XXX 003", kyc: "Approved", trust: "Silver", city: "Rabat",      joinDate: "2026-02-01" },
  { id: "AG004", name: "Aicha El Fassi",  phone: "+212 6XX XXX 004", kyc: "Pending",  trust: "Bronze", city: "Marrakech",  joinDate: "2026-02-22" },
  { id: "AG005", name: "Hassan Tazi",     phone: "+212 6XX XXX 005", kyc: "Rejected", trust: "Bronze", city: "Fes",        joinDate: "2026-02-18" },
];

const trustColors = {
  Bronze: "#cd7f32",
  Silver: "#9ca3af",
  Gold:   "#f59e0b",
};

const kycStyles = {
  Pending:  { background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa" },
  Approved: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  Rejected: { background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" },
};

export default function AgentManagement() {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filtered = agents.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search);
    const matchStatus = statusFilter === "All Status" || a.kyc === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <h1 style={{ margin: "0 0 20px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
        Agent Management (KYC)
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 14px",
            flex: "0 0 260px",
          }}
        >
          <span style={{ color: "#94a3b8" }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or phone"
            style={{
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#0f172a",
              background: "transparent",
              width: "100%",
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 36px 8px 14px",
            fontSize: 14,
            color: "#0f172a",
            outline: "none",
            cursor: "pointer",
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["ID", "Full Name", "Phone", "KYC Status", "Trust Score", "City", "Join Date", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#64748b",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((agent, idx) => (
              <tr
                key={agent.id}
                style={{
                  borderBottom: idx < filtered.length - 1 ? "1px solid #f1f5f9" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "16px 18px", fontSize: 14, color: "#64748b", fontWeight: 600 }}>{agent.id}</td>
                <td style={{ padding: "16px 18px", fontSize: 14, color: "#0f172a", fontWeight: 600 }}>{agent.name}</td>
                <td style={{ padding: "16px 18px", fontSize: 14, color: "#475569" }}>{agent.phone}</td>
                <td style={{ padding: "16px 18px" }}>
                  <span style={{ ...kycStyles[agent.kyc], padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    {agent.kyc}
                  </span>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 14, color: "#334155" }}>
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: trustColors[agent.trust] || "#ccc",
                        flexShrink: 0,
                      }}
                    />
                    {agent.trust}
                  </span>
                </td>
                <td style={{ padding: "16px 18px", fontSize: 14, color: "#475569" }}>{agent.city}</td>
                <td style={{ padding: "16px 18px", fontSize: 14, color: "#475569" }}>{agent.joinDate}</td>
                <td style={{ padding: "16px 18px" }}>
                  <button
                    style={{
                      background: "#38bdf8",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0ea5e9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#38bdf8")}
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: 15 }}>
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginTop: 20 }}>
        {["‹", "1", "›"].map((btn, i) => (
          <button
            key={btn}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: i === 1 ? "none" : "1px solid #e2e8f0",
              background: i === 1 ? "#38bdf8" : "#fff",
              color: i === 1 ? "#fff" : "#64748b",
              fontWeight: i === 1 ? 700 : 400,
              fontSize: i === 1 ? 14 : 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </>
  );
}