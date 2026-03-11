import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchLitiges,
  resolveLitige,
  refundLitige,
  closeLitige,
} from "../api/Litiges.api";

export const LITIGES_QUERY_KEY = ["litiges"];

// ─── Queries ────────────────────────────────────────────────────────────────

export function useLitiges() {
  return useQuery({
    queryKey: LITIGES_QUERY_KEY,
    queryFn: fetchLitiges,
  });
}

// ─── Mutations ──────────────────────────────────────────────────────────────

function useLitigeMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LITIGES_QUERY_KEY });
    },
  });
}

export function useResolveLitige() {
  return useLitigeMutation(resolveLitige);
}

export function useRefundLitige() {
  return useLitigeMutation(refundLitige);
}

export function useCloseLitige() {
  return useLitigeMutation(closeLitige);
}