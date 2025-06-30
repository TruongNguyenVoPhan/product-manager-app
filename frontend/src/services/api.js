// src/services/api.js
import axios from 'axios';

const API_BASE = 'https://product-api-7ric.onrender.com';

export const login = (data) => axios.post(`${API_BASE}/auth/login`, data);
export const register = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const getProducts = (token) =>
  axios.get(`${API_BASE}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
