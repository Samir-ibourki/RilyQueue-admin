import api from "./axios";
import { auditLogsData } from "../utils/auditLogsData";

export const getAuditLogs = async () => {
  try {
    const res = await api.get("/admin/audit-logs");
    return res.data;
  } catch (error) {
    console.warn("Returning mock audit logs data", error);
    return auditLogsData;
  }
};
