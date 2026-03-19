import api from './axios';

export const ProfileAPI = {
  fetchUserDetails: async () => {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (e) {
      console.error(e);
      return {
        name: "Admin User",
        role: "Administrator",
        phone: "+212 6XX XXX 900",
        roles: "Admin / Support",
        lastLogin: "2026-02-24 11:45:23",
        avatarLetter: "A"
      };
    }
  },
};
