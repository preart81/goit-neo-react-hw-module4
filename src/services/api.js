import axios from 'axios';

// API for unsplash.com

const ACCESS_KEY = '5KQQC6q7QFfFmDfhHemyY-tUcwjZXR2zf4XClHqdu7k';

axios.defaults.baseURL = 'https://api.unsplash.com';
axios.defaults.headers.common.Authorization = `Client-ID ${ACCESS_KEY}`;
axios.defaults.params = {
  'Accept-Version': 'v1',
  per_page: 12,
};

export const fetchPhotos = async (query, page) => {
  const response = await axios.get('/search/photos', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};
