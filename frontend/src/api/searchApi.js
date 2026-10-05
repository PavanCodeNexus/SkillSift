import axiosClient from './axiosClient';

export const searchApi = {
  search: async (query, level = 'Beginner', lang = 'en') => {
    const response = await axiosClient.get('/search', {
      params: { q: query, level, lang }
    });
    return response.data;
  }
};
