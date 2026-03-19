import React, { useState } from "react";
import { Search, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuditLogs } from "../hooks/useAuditLogs";

const typeStyles = {
  Admin: { background: "#e0f2fe", color: "#0284c7" },
  Agent: { background: "#dcfce7", color: "#16a34a" },
};

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const { data: auditLogsData = [], isLoading, error } = useAuditLogs();

  if (isLoading) return <div>Loading audit logs...</div>;
  if (error) return <div>Error loading audit logs</div>;

  const filteredLogs = auditLogsData.filter((log) => {
    const q = search.toLowerCase();
    return (
      log.requestId.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <h1 style={{ margin: "0 0 20px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
        Audit Logs
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 14px",
            flex: "1 1 300px",
            maxWidth: "400px",
          }}
        >
          <Search size={18} color="#94a3b8" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by request ID, action, or actor"
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 14px",
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          <span>Start date</span>
          <span>→</span>
          <span>End date</span>
          <CalendarDays size={18} color="#cbd5e1" style={{ marginLeft: 8 }} />
        </div>
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
        className="overflow-x-auto"
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Actor", "Type", "Action", "Timestamp", "Request ID", "Payload Summary"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr
                key={log.requestId}
                style={{
                  borderBottom: idx < filteredLogs.length - 1 ? "1px solid #f1f5f9" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "16px 20px", fontSize: 14, color: "#334155", fontWeight: 500 }}>
                  {log.actor}
                </td>
                <td style={{ padding: "16px 20px" }}>
                  <span
                    style={{
                      ...typeStyles[log.type],
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {log.type}
                  </span>
                </td>
                <td style={{ padding: "16px 20px", fontSize: 14, color: "#334155" }}>
                  {log.action}
                </td>
                <td style={{ padding: "16px 20px", fontSize: 14, color: "#334155" }}>
                  {log.timestamp}
                </td>
                <td style={{ padding: "16px 20px", fontSize: 14, color: "#64748b" }}>
                  {log.requestId}
                </td>
                <td
                  style={{
                    padding: "16px 20px",
                    fontSize: 13,
                    color: "#64748b",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {log.payloadSummary}
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: 15 }}>
                  No audit logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 6, marginTop: 24 }}>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            border: "1px solid #e2e8f0",
            background: "#fff",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "not-allowed",
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            border: "1px solid #38bdf8",
            background: "#fff",
            color: "#38bdf8",
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          1
        </button>
        <button
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "not-allowed",
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}
