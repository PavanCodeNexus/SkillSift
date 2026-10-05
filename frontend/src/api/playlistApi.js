import axiosClient from './axiosClient';

export const playlistApi = {
  getPlaylists: async () => {
    const response = await axiosClient.get('/playlists');
    return response.data;
  },

  createPlaylist: async (name) => {
    const response = await axiosClient.post('/playlists', { name });
    return response.data;
  },

  addItem: async (playlistId, itemData) => {
    const response = await axiosClient.post(`/playlists/${playlistId}/items`, itemData);
    return response.data;
  },

  removeItem: async (playlistId, itemId) => {
    const response = await axiosClient.delete(`/playlists/${playlistId}/items/${itemId}`);
    return response.data;
  }
};
