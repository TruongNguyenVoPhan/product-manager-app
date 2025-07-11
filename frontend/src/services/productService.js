import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = 'https://product-api-7ric.onrender.com';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const lockProduct = async (productId) => {
  try {
    await axios.put(`${API_BASE}/products/${productId}/lock`, {}, getAuthHeader());
    return true;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to lock product');
    throw false;
  }
}

export const unlockProduct = async (productId) => {
  try {
    await axios.put(`${API_BASE}/products/${productId}/unlock`, {}, getAuthHeader());
    return true;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to unlock product');
    throw false;
  }
}