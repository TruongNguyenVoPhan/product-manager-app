// src/services/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'https://product-api-7ric.onrender.com',
});

// Gắn token vào mọi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// axiosInstance.js
API.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      toast.error("Session expired. You have been logged out.");

      // Xoá token
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');

      // Gửi event sang các tab khác và chính tab hiện tại
      localStorage.setItem('logout-event', Date.now());
      window.dispatchEvent(new Event('tokenExpired'));
    }

    return Promise.reject(error);
  }
);



export default API;
