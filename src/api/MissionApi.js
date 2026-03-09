import api from "./axios";

// Missions
export const getMissions = () =>
  api.get("/admin/missions").then((res) => res.data);

export const getMissionById = (id) =>
  api.get(`/admin/missions/${id}`).then((res) => res.data);

export const missionAssign = (id, data) =>
  api.post(`/admin/missions/${id}/assign`, data);
