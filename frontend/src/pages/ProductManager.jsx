import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

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
    try {
      const payload = { name, price: Number(price), imageUrl: image };

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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛍️ Product Manager</h2>
        <button className="btn btn-outline-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="card p-3 mb-4">
        <h5>{editingProduct ? 'Edit Product' : 'Add Product'}</h5>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="btn btn-success me-2" onClick={addOrUpdateProduct}>
          {editingProduct ? 'Update' : 'Add'}
        </button>
        {editingProduct && (
          <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>
            Cancel
          </button>
        )}
      </div>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <ProductCard
              product={product}
              onEdit={(p) => {
                setEditingProduct(p);
                setName(p.name);
                setPrice(p.price);
                setImage(p.imageUrl || '');
              }}
              onDelete={deleteProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;
