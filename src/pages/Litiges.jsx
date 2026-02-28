import { useState } from "react";

const LITIGES = [
  {
    id: "LIT-001",
    agent: "Mohammed Alami",
    agentId: "AG001",
    client: "Karim Berrada",
    montant: 450,
    type: "Non-livraison",
    status: "Ouvert",
    date: "2026-02-20",
    description: "Le client affirme ne pas avoir reçu sa commande malgré la confirmation de livraison par l'agent.",
    messages: [
      { from: "Client", text: "Je n'ai jamais reçu mon colis.", time: "10:32" },
      { from: "Agent", text: "J'ai une preuve de dépôt signée.", time: "11:05" },
      { from: "Client", text: "Ce n'est pas ma signature.", time: "11:20" },
    ],
  },
  {
    id: "LIT-002",
    agent: "Fatima Bennani",
    agentId: "AG002",
    client: "Sara Moussaoui",
    montant: 200,
    type: "Montant incorrect",
    status: "Ouvert",
    date: "2026-02-22",
    description: "Le client a été facturé 200 MAD de plus que le montant prévu dans le bon de commande.",
    messages: [
      { from: "Client", text: "On m'a facturé 700 MAD au lieu de 500 MAD.", time: "09:15" },
      { from: "Agent", text: "Il y avait des frais supplémentaires non prévus.", time: "09:50" },
    ],
  },
  {
    id: "LIT-003",
    agent: "Youssef Idrissi",
    agentId: "AG003",
    client: "Omar Tahiri",
    montant: 320,
    type: "Colis endommagé",
    status: "Résolu",
    date: "2026-02-10",
    resolution: "Remboursement partiel de 160 MAD effectué.",
    messages: [
      { from: "Client", text: "Mon colis est arrivé cassé.", time: "14:00" },
      { from: "Admin", text: "Remboursement de 50% accordé.", time: "15:30" },
    ],
  },
  {
    id: "LIT-004",
    agent: "Aicha El Fassi",
    agentId: "AG004",
    client: "Nadia Chraibi",
    montant: 600,
    type: "Non-livraison",
    status: "Fermé",
    date: "2026-01-28",
    resolution: "Litige rejeté après vérification GPS — livraison confirmée.",
    messages: [
      { from: "Client", text: "Pas de livraison reçue.", time: "08:00" },
      { from: "Admin", text: "Vérification GPS confirme la livraison à 08:45.", time: "16:00" },
    ],
  },
  {
    id: "LIT-005",
    agent: "Hassan Tazi",
    agentId: "AG005",
    client: "Amine Lahlou",
    montant: 150,
    type: "Comportement",
    status: "Ouvert",
    date: "2026-02-25",
    description: "Le client signale un comportement inapproprié de l'agent lors de la livraison.",
    messages: [
      { from: "Client", text: "L'agent a été très impoli.", time: "17:10" },
    ],
  },
];

const statusStyle = {
  Ouvert:  { background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa" },
  Résolu:  { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  Fermé:   { background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" },
};

const typeColors = {
  "Non-livraison":    "#3b82f6",
  "Montant incorrect":"#8b5cf6",
  "Colis endommagé":  "#f59e0b",
  "Comportement":     "#ef4444",
};

export default function Litiges() {
  const [filter, setFilter]       = useState("Tous");
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState(null);
  const [resolution, setResolution] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [showRefund, setShowRefund]   = useState(false);
  const [litiges, setLitiges]     = useState(LITIGES);
  const [toast, setToast]         = useState(null);

  const filters = ["Tous", "Ouvert", "Résolu", "Fermé"];

  const filtered = litiges.filter((l) => {
    const matchFilter = filter === "Tous" || l.status === filter;
    const matchSearch =
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.agent.toLowerCase().includes(search.toLowerCase()) ||
      l.client.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const showToast = (msg, color = "#16a34a") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleResolve = () => {
    if (!resolution.trim()) return;
    setLitiges((prev) =>
      prev.map((l) =>
        l.id === selected.id
          ? { ...l, status: "Résolu", resolution }
          : l
      )
    );
    setSelected((prev) => ({ ...prev, status: "Résolu", resolution }));
    setResolution("");
    showToast("✅ Litige marqué comme résolu.");
  };

  const handleRefund = () => {
    if (!refundAmount || isNaN(refundAmount)) return;
    setLitiges((prev) =>
      prev.map((l) =>
        l.id === selected.id
          ? { ...l, status: "Résolu", resolution: `Remboursement de ${refundAmount} MAD effectué.` }
          : l
      )
    );
    setSelected((prev) => ({
      ...prev,
      status: "Résolu",
      resolution: `Remboursement de ${refundAmount} MAD effectué.`,
    }));
    setRefundAmount("");
    setShowRefund(false);
    showToast(`💸 Remboursement de ${refundAmount} MAD effectué.`);
  };

  const handleClose = () => {
    setLitiges((prev) =>
      prev.map((l) =>
        l.id === selected.id ? { ...l, status: "Fermé" } : l
      )
    );
    setSelected((prev) => ({ ...prev, status: "Fermé" }));
    showToast("🔒 Litige fermé.", "#475569");
  };

  const counts = {
    Tous:   litiges.length,
    Ouvert: litiges.filter((l) => l.status === "Ouvert").length,
    Résolu: litiges.filter((l) => l.status === "Résolu").length,
    Fermé:  litiges.filter((l) => l.status === "Fermé").length,
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            background: toast.color,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            zIndex: 1000,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          {toast.msg}
        </div>
      )}

      <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
        Gestion des Litiges
      </h1>
      <p style={{ margin: "0 0 24px", color: "#64748b", fontSize: 14 }}>
        Gérez, résolvez et remboursez les litiges entre agents et clients.
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {filters.map((f) => (
          <div
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              background: filter === f ? "#0f172a" : "#fff",
              color: filter === f ? "#fff" : "#64748b",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "14px 16px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>{counts[f]}</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>{f}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {/* LEFT — Liste */}
        <div style={{ flex: selected ? "0 0 45%" : "1" }}>
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              padding: "8px 14px",
              marginBottom: 14,
            }}
          >
            <span style={{ color: "#94a3b8" }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par ID, agent, client..."
              style={{ border: "none", outline: "none", fontSize: 14, width: "100%", background: "transparent" }}
            />
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>Aucun litige trouvé.</div>
            )}
            {filtered.map((l) => (
              <div
                key={l.id}
                onClick={() => { setSelected(l); setShowRefund(false); setResolution(""); }}
                style={{
                  background: selected?.id === l.id ? "#f0f9ff" : "#fff",
                  border: selected?.id === l.id ? "1.5px solid #38bdf8" : "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{l.id}</span>
                  <span style={{ ...statusStyle[l.status], padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    {l.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
                  <span>👤 {l.agent}</span> <span style={{ margin: "0 6px" }}>→</span> <span>🧑 {l.client}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      background: typeColors[l.type] + "18",
                      color: typeColors[l.type],
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {l.type}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{l.montant} MAD</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Détail */}
        {selected && (
          <div
            style={{
              flex: 1,
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 24,
              alignSelf: "flex-start",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{selected.id}</h2>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b" }}>Créé le {selected.date}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ ...statusStyle[selected.status], padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  {selected.status}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Info */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Agent", value: `${selected.agent} (${selected.agentId})` },
                { label: "Client", value: selected.client },
                { label: "Type", value: selected.type },
                { label: "Montant en litige", value: `${selected.montant} MAD` },
              ].map((item) => (
                <div key={item.label} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {selected.description && (
              <div style={{ background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, padding: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>📋 DESCRIPTION</div>
                <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.6 }}>{selected.description}</p>
              </div>
            )}

            {/* Resolution affichée */}
            {selected.resolution && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 4 }}>✅ RÉSOLUTION</div>
                <p style={{ margin: 0, fontSize: 13, color: "#166534" }}>{selected.resolution}</p>
              </div>
            )}

            {/* Messages */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>
                💬 Historique
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 180, overflowY: "auto" }}>
                {selected.messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: m.from === "Admin" ? "center" : m.from === "Agent" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        background: m.from === "Admin" ? "#f1f5f9" : m.from === "Agent" ? "#dbeafe" : "#f0fdf4",
                        color: "#0f172a",
                        padding: "8px 12px",
                        borderRadius: 10,
                        maxWidth: "75%",
                        fontSize: 13,
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 11, color: "#64748b", marginBottom: 2 }}>
                        {m.from} · {m.time}
                      </div>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {selected.status === "Ouvert" && (
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>
                  ⚙️ Actions
                </div>

                {/* Resolution */}
                <div style={{ marginBottom: 12 }}>
                  <textarea
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Décrivez la résolution..."
                    rows={2}
                    style={{
                      width: "100%",
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "10px 12px",
                      fontSize: 13,
                      outline: "none",
                      resize: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    onClick={handleResolve}
                    style={{
                      marginTop: 8,
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 18px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    ✅ Marquer comme résolu
                  </button>
                </div>

                {/* Refund */}
                <button
                  onClick={() => setShowRefund(!showRefund)}
                  style={{
                    background: "#fff7ed",
                    color: "#ea580c",
                    border: "1px solid #fed7aa",
                    borderRadius: 8,
                    padding: "8px 18px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                    marginBottom: 8,
                  }}
                >
                  💸 Effectuer un remboursement
                </button>

                {showRefund && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <input
                      type="number"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      placeholder={`Max ${selected.montant} MAD`}
                      style={{
                        flex: 1,
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 13,
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={handleRefund}
                      style={{
                        background: "#ea580c",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Confirmer
                    </button>
                  </div>
                )}

                {/* Close */}
                <button
                  onClick={handleClose}
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "8px 18px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  🔒 Fermer le litige
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}