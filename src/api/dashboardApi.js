import api from './axios';

export const DashboardAPI = {
  fetchStatistics: async () => {
    try {
      // Fetching all necessary resources from MVP endpoints for Admin
      const [missionsRes, agentsRes, disputesRes] = await Promise.all([
        api.get('/admin/missions'),
        api.get('/admin/agents'),
        api.get('/admin/disputes')
      ]);
      
      const missions = missionsRes.data || [];
      const agents = agentsRes.data || [];
      const disputes = disputesRes.data || [];

      return {
        missionsCreated: missions.length || 0,
        missionsPaid: "$ 0", // Can be calculated based on paid missions later
        openLitiges: disputes.length || 0,
        averageTrustScore: "Silver",
        pendingAgents: agents.filter(a => a.status === 'pending').length || 0,
        activeAgents: agents.filter(a => a.status === 'active').length || 0,
      };
    } catch (e) {
      console.error('Failed fetching stats, returning mock', e);
      // Fallback
      return {
        missionsCreated: 30,
        missionsPaid: "$ 142",
        openLitiges: 8,
        averageTrustScore: "Silver",
        pendingAgents: 12,
        activeAgents: 87,
      };
    }
  },
  
  fetchLineChartData: async () => {
    try {
      // Replace with specific metric/aggregation backend endpoints once created
      await api.get('/admin/missions');
      // For MVP, if returning raw items, you'd aggregate them into days here.
      // Returning mock for safety until aggregation logic matches backend structure.
      throw new Error("Aggregation not implemented for chart");
    } catch (e) {
      console.error(e);
      return [
        { name: "Feb 18", missions: 12 },
        { name: "Feb 19", missions: 19 },
        { name: "Feb 20", missions: 15 },
        { name: "Feb 21", missions: 22 },
        { name: "Feb 22", missions: 18 },
        { name: "Feb 23", missions: 25 },
        { name: "Feb 24", missions: 30 },
      ];
    }
  },

  fetchPieChartData: async () => {
    try {
      await api.get('/admin/missions');
      // Aggregation logic placeholder
      throw new Error("Aggregation not implemented for chart");
    } catch (e) {
      console.error(e);
      return [
        { name: "Queue", value: 35, color: "#3b82f6" },
        { name: "Depot", value: 25, color: "#65a30d" },
        { name: "Recup", value: 20, color: "#f59e0b" },
        { name: "Course", value: 20, color: "#ef4444" },
      ];
    }
  }
};
