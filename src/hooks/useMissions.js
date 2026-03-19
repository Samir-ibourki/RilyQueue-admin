import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMissionById, 
  getMissions, 
  missionAssign
} from "../api/MissionApi";

export const useMissions = () => {
  return useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  });
};

export const useMissionById = (id) => {
  return useQuery({
    queryKey: ["missions", id],
    queryFn: () => getMissionById(id),
    enabled: !!id,
  });
};

export const useMissionAssign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, agentId }) => missionAssign(id, { agentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["missions"] });
    },
  });
};
