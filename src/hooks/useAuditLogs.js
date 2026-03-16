import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../api/AuditApi";

export const useAuditLogs = () => {
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: getAuditLogs,
  });
};
