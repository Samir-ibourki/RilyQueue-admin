export const auditLogsData = [
  { actor: "+212 6XX XXX 900", type: "Admin", action: "Login", timestamp: "2026-02-24 11:45:23", requestId: "REQ-001", payloadSummary: '{ phone: "+212 6XX XXX 900", otp: "verified" }' },
  { actor: "+212 6XX XXX 900", type: "Admin", action: "Approve Agent", timestamp: "2026-02-24 11:50:15", requestId: "REQ-002", payloadSummary: '{ agentId: "AG001", status: "approved" }' },
  { actor: "+212 6XX XXX 001", type: "Agent", action: "Complete Mission", timestamp: "2026-02-24 10:15:42", requestId: "REQ-003", payloadSummary: '{ missionId: "M002", proofs: ["img1.jpg"] }' },
  { actor: "+212 6XX XXX 900", type: "Admin", action: "Resolve Dispute", timestamp: "2026-02-24 09:30:18", requestId: "REQ-004", payloadSummary: '{ disputeId: "D003", resolution: "full_refund" }' },
  { actor: "+212 6XX XXX 002", type: "Agent", action: "Accept Mission", timestamp: "2026-02-24 09:40:55", requestId: "REQ-005", payloadSummary: '{ missionId: "M003", agentId: "AG002" }' },
  { actor: "+212 6XX XXX 900", type: "Admin", action: "Reject Agent", timestamp: "2026-02-24 08:20:30", requestId: "REQ-006", payloadSummary: '{ agentId: "AG005", reason: "invalid documents" }' },
  { actor: "+212 6XX XXX 003", type: "Agent", action: "Upload KYC", timestamp: "2026-02-24 07:15:12", requestId: "REQ-007", payloadSummary: '{ agentId: "AG003", documents: ["cin_front", "cin_back", "selfie"] }' },
  { actor: "+212 6XX XXX 900", type: "Admin", action: "View Mission Details", timestamp: "2026-02-23 16:45:00", requestId: "REQ-008", payloadSummary: '{ missionId: "M005" }' },
];
