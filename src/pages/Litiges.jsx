import { useState } from "react";
import { useLitiges, useResolveLitige, useRefundLitige, useCloseLitige } from "../hooks/useLitiges";

const STATUS_STYLES = {
  Ouvert: { background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa" },
  Résolu: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  Fermé:  { background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" },
};

const TYPE_COLORS = {
  "Non-livraison":     "#3b82f6",
  "Montant incorrect": "#8b5cf6",
  "Colis endommagé":   "#f59e0b",
  "Comportement":      "#ef4444",
};

const STATUS_FILTERS = ["Tous", "Ouvert", "Résolu", "Fermé"];


function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", top: 24, right: 24, background: toast.color, color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, zIndex: 1000, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
      {toast.msg}
    </div>
  );
}

function StatCards({ litiges, filter, setFilter }) {
  const counts = STATUS_FILTERS.reduce((acc, f) => {
    acc[f] = f === "Tous" ? litiges.length : litiges.filter((l) => l.status === f).length;
    return acc;
  }, {});
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      {STATUS_FILTERS.map((f) => (
        <div key={f} onClick={() => setFilter(f)} style={{ flex: 1, background: filter === f ? "#0f172a" : "#fff", color: filter === f ? "#fff" : "#64748b", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{counts[f]}</div>
          <div style={{ fontSize: 13, marginTop: 2 }}>{f}</div>
        </div>
      ))}
    </div>
  );
}

function LitigeCard({ litige, isSelected, onClick }) {
  return (
    <div onClick={onClick} style={{ background: isSelected ? "#f0f9ff" : "#fff", border: isSelected ? "1.5px solid #38bdf8" : "1px solid #e2e8f0", borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.15s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{litige.id}</span>
        <span style={{ ...STATUS_STYLES[litige.status], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{litige.status}</span>
      </div>
      <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
        <span>👤 {litige.agent}</span><span style={{ margin: "0 6px" }}>→</span><span>🧑 {litige.client}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: TYPE_COLORS[litige.type] + "18", color: TYPE_COLORS[litige.type], padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{litige.type}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{litige.montant} MAD</span>
      </div>
    </div>
  );
}

function LitigeDetail({ litige, onClose, onToast }) {
  const [resolution, setResolution] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [showRefund, setShowRefund] = useState(false);

  const { mutate: resolve, isPending: resolving } = useResolveLitige();
  const { mutate: refund,  isPending: refunding  } = useRefundLitige();
  const { mutate: close,   isPending: closing    } = useCloseLitige();

  const handleResolve = () => {
    if (!resolution.trim()) return;
    resolve({ id: litige.id, resolution }, { onSuccess: () => { onToast("✅ Litige marqué comme résolu.", "#16a34a"); setResolution(""); } });
  };
  const handleRefund = () => {
    if (!refundAmount || isNaN(refundAmount)) return;
    refund({ id: litige.id, montant: refundAmount }, { onSuccess: () => { onToast(`💸 Remboursement de ${refundAmount} MAD effectué.`, "#ea580c"); setRefundAmount(""); setShowRefund(false); } });
  };
  const handleClose = () => {
    close({ id: litige.id }, { onSuccess: () => onToast("🔒 Litige fermé.", "#475569") });
  };
  
  return (
    <div style={{ flex: 1, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 24, alignSelf: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{litige.id}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Créé le {litige.date}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ ...STATUS_STYLES[litige.status], padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{litige.status}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}>✕</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[["Agent", `${litige.agent} (${litige.agentId})`], ["Client", litige.client], ["Type", litige.type], ["Montant en litige", `${litige.montant} MAD`]].map(([label, value]) => (
          <div key={label} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{value}</div>
          </div>
        ))}
      </div>

      {litige.description && (
        <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>📋 DESCRIPTION</div>
          <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{litige.description}</p>
        </div>
      )}

      {litige.resolution && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 4 }}>✅ RÉSOLUTION</div>
          <p style={{ margin: 0, fontSize: 13, color: "#166534" }}>{litige.resolution}</p>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>💬 Historique</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 180, overflowY: "auto" }}>
          {litige.messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "Admin" ? "center" : m.from === "Agent" ? "flex-end" : "flex-start" }}>
              <div style={{ background: m.from === "Admin" ? "#f1f5f9" : m.from === "Agent" ? "#dbeafe" : "#f0fdf4", color: "#0f172a", padding: "8px 12px", borderRadius: 10, maxWidth: "75%", fontSize: 13 }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#64748b", marginBottom: 2 }}>{m.from} · {m.time}</div>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {litige.status === "Ouvert" && (
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>⚙️ Actions</div>
          <textarea value={resolution} onChange={(e) => setResolution(e.target.value)} placeholder="Décrivez la résolution..." rows={2}
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", marginBottom: 8 }} />
          <button onClick={handleResolve} disabled={resolving} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", marginBottom: 8, opacity: resolving ? 0.6 : 1 }}>
            {resolving ? "En cours..." : "✅ Marquer comme résolu"}
          </button>
          <button onClick={() => setShowRefund(!showRefund)} style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", marginBottom: 8 }}>
            💸 Effectuer un remboursement
          </button>
          {showRefund && (
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} placeholder={`Max ${litige.montant} MAD`}
                style={{ flex: 1, border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none" }} />
              <button onClick={handleRefund} disabled={refunding} style={{ background: "#ea580c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: refunding ? 0.6 : 1 }}>
                {refunding ? "..." : "Confirmer"}
              </button>
            </div>
          )}
          <button onClick={handleClose} disabled={closing} style={{ background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", opacity: closing ? 0.6 : 1 }}>
            {closing ? "Fermeture..." : "🔒 Fermer le litige"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Litiges() {
  const [filter, setFilter]     = useState("Tous");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast]       = useState(null);

  const { data: litiges = [], isLoading, isError } = useLitiges();

  const showToast = (msg, color = "#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = litiges.filter((l) => {
    const matchFilter = filter === "Tous" || l.status === filter;
    const matchSearch = l.id.toLowerCase().includes(search.toLowerCase()) || l.agent.toLowerCase().includes(search.toLowerCase()) || l.client.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const selectedFresh = selected ? litiges.find((l) => l.id === selected.id) ?? null : null;

  if (isLoading) return <div style={{ padding: 40, color: "#64748b" }}>Chargement des litiges...</div>;
  if (isError)   return <div style={{ padding: 40, color: "#ef4444" }}>Erreur lors du chargement.</div>;

  return (
    <div style={{ position: "relative" }}>
      <Toast toast={toast} />
      <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>Gestion des Litiges</h1>
      <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14 }}>Gérez, résolvez et remboursez les litiges entre agents et clients.</p>
      <StatCards litiges={litiges} filter={filter} setFilter={setFilter} />
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: selectedFresh ? "0 0 45%" : "1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", marginBottom: 14 }}>
            <span style={{ color: "#94a3b8" }}>🔍</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher par ID, agent, client..." style={{ border: "none", outline: "none", fontSize: 14, width: "100%", background: "transparent" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>Aucun litige trouvé.</div>}
            {filtered.map((l) => <LitigeCard key={l.id} litige={l} isSelected={selectedFresh?.id === l.id} onClick={() => setSelected(l)} />)}
          </div>
        </div>
        {selectedFresh && <LitigeDetail litige={selectedFresh} onClose={() => setSelected(null)} onToast={showToast} />}
      </div>
    </div>
  );
}