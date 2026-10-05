import axiosClient from './axiosClient';

export const profileApi = {
  getProfile: async () => {
    const response = await axiosClient.get('/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await axiosClient.put('/profile', profileData);
    return response.data;
  },

  getNote: async (videoId) => {
    const response = await axiosClient.get(`/profile/notes/${videoId}`);
    return response.data.noteContent;
  },

  saveNote: async (videoId, noteContent) => {
    const response = await axiosClient.post(`/profile/notes/${videoId}`, { noteContent });
    return response.data;
  }
};
