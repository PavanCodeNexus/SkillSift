import axiosClient from './axiosClient';

export const historyApi = {
  getHistory: async () => {
    const response = await axiosClient.get('/history');
    return response.data;
  },

  recordWatch: async (videoData) => {
    const response = await axiosClient.post('/history', videoData);
    return response.data;
  },

  clearHistory: async () => {
    const response = await axiosClient.delete('/history');
    return response.data;
  }
};
