import API from './axiosInstance';
import { toast } from 'react-toastify';

export const lockProduct = async (productId) => {
  try {
    await API.put(`/products/${productId}/lock`);
    return true;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Cannot lock product');
    return false;
  }
};

export const unlockProduct = async (productId) => {
  try {
    await API.put(`/products/${productId}/unlock`);
  } catch (err) {
    console.error('Unlock failed:', err.response?.data?.message);
  }
};
