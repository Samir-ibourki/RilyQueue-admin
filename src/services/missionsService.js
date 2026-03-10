import api from './api';

export const MissionService = {
  /**
   * Fetch all missions
   */
  getAllMissions: async () => {
    const response = await api.get('/missions');
    return response.data;
  },

  /**
   * Fetch mission by ID
   * @param {string | number} id 
   */
  getMissionById: async (id) => {
    const response = await api.get(`/missions/${id}`);
    return response.data;
  },

  /**
   * Create a new mission
   * @param {Object} data 
   */
  createMission: async (data) => {
    const response = await api.post('/missions', data);
    return response.data;
  },

  // other specific calls
};
