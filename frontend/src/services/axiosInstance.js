// services/axiosInstance.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://product-api-7ric.onrender.com',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Nếu token hết hạn, phát ra sự kiện "tokenExpired"
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      window.dispatchEvent(new Event('tokenExpired'));
    }
    return Promise.reject(err);
  }
);

export default API;
