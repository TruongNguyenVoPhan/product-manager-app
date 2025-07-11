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

        // Xoá local
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        // Bắn event sang các tab khác
        localStorage.setItem('logout-event', Date.now());

        // Gọi event nội bộ luôn để tab hiện tại cũng logout
        window.dispatchEvent(new Event('tokenExpired')); // ✅ NẾU bạn vẫn dùng listener trong AppWrapper
        }
    }
);


export default API;
