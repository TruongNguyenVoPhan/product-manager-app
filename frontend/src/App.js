// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "https://product-api-7ric.onrender.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL, getAuthHeader());
      setProducts(res.data);
    } catch (error) {
      toast.error('Lỗi lấy sản phẩm. Có thể đã hết phiên đăng nhập.');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };

  const addProduct = async () => {
    if (!name || !price) return toast.warn("Name and price are required!");
    try {
      await axios.post(API_URL, { name, price: Number(price) }, getAuthHeader());
      setName('');
      setPrice('');
      toast.success("Product added!");
      fetchProducts();
    } catch {
      toast.error("Add product failed");
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(`${API_URL}/${editingProduct._id}`, {
        name: editingProduct.name,
        price: Number(editingProduct.price),
      }, getAuthHeader());
      toast.success("Product updated!");
      setEditingProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`${API_URL}/${productToDelete._id}`, getAuthHeader());
      toast.success("Product deleted!");
      setShowConfirm(false);
      setProductToDelete(null);
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);


  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <ToastContainer />
      </>
    );
  }


  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-3">🛒 Product Manager</h2>
      <button className="btn btn-outline-danger mb-3" onClick={handleLogout}>Logout</button>

      <div className="mb-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingProduct(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className="mt-4">
          <h4>Edit Product</h4>
          <input
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            className="form-control mb-2"
          />
          <button className="btn btn-success me-2" onClick={updateProduct}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}

      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: '#00000066' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Confirm Delete</h5></div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeleteConfirmed}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
