import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://ec2-16-16-63-45.eu-north-1.compute.amazonaws.com',
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosApi;