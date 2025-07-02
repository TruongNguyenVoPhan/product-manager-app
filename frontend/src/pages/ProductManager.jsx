import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { toast } from 'react-toastify';
import '../styles/ProductManager.css';

const API_URL = 'https://product-api-7ric.onrender.com/products';

function ProductManager({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL, getAuthHeader());
      setProducts(res.data);
    } catch (err) {
      toast.error('Error fetching products!');
      localStorage.removeItem('token');
      onLogout();
    }
  };

  const addOrUpdateProduct = async () => {
    if (!name || !price) return toast.warn('Name and price required!');

    const payload = {
      name: name.trim(),
      price: Number(price),
      imageUrl: image.trim() || '',
    };

    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct._id}`, payload, getAuthHeader());
        toast.success('Product updated!');
      } else {
        await axios.post(API_URL, payload, getAuthHeader());
        toast.success('Product added!');
      }

      setName('');
      setPrice('');
      setImage('');
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to save product.');
      console.error('Error saving product:', err.response?.data || err.message);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/${product._id}`, getAuthHeader());
      toast.success('Product deleted!');
      fetchProducts();
    } catch {
      toast.error('Delete failed.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🛍️ Product Manager</h2>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>

        <ProductForm
          product={editingProduct}
          onSave={addOrUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />

        <ProductList
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setName(product.name);
            setPrice(product.price);
            setImage(product.imageUrl || '');
          }}
          onDelete={deleteProduct}
        />

      </div>
    </div>
  );
}

export default ProductManager;
