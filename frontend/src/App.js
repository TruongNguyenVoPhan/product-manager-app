import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  API backend đang chạy ở đây
const API_URL = "https://product-api-7ric.onrender.com/products";

function App() {
  //  STATE QUẢN LÝ DỮ LIỆU
  const [products, setProducts] = useState([]);             // Danh sách sản phẩm
  const [name, setName] = useState('');                     // Tên sản phẩm mới
  const [price, setPrice] = useState('');                   // Giá sản phẩm mới
  const [editingProduct, setEditingProduct] = useState(null); // Sản phẩm đang sửa (nếu có)
  const [showConfirm, setShowConfirm] = useState(false); // Hiển thị thông báo xác nhận
  const [productToDelete, setProductToDelete] = useState(null); // Sản phẩm cần xoá

  //  Lấy dữ liệu sản phẩm từ API khi trang tải
  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  //  Thêm sản phẩm mới
  const addProduct = async () => {
    if (!name || !price) return alert("Name and price are required!");
    await axios.post(API_URL, { name, price: Number(price) });
    toast.success("Product added!");
    setName('');
    setPrice('');
    fetchProducts(); // Refresh danh sách
  };

  //  Xoá sản phẩm theo ID
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    await axios.delete(`${API_URL}/${productToDelete._id}`);
    setShowConfirm(false);
    setProductToDelete(null);
    fetchProducts();
    toast.success("Product deleted!");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };


  // Sửa sản phẩm đã chọn (PUT)
  const updateProduct = async () => {
    await axios.put(`${API_URL}/${editingProduct._id}`, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
    });
    setEditingProduct(null); // Xoá form sửa
    fetchProducts();         // Cập nhật danh sách
    toast.success("Product updated!");
  };

  // 🌀 useEffect: gọi API lần đầu khi load trang
  useEffect(() => {
    fetchProducts();
  }, []);

  //  GIAO DIỆN TRẢ VỀ
  return (
    <div style={{ padding: 20 }}>
      <h2> Product Manager</h2>

      {/*  Form thêm sản phẩm */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/*  Danh sách sản phẩm */}
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>No.</th>
          <th>Product Name</th>
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
              <button
                onClick={() => setEditingProduct(p)}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(p)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
        </table>

      </table>

      {/* Hiển thị thông báo xác nhận xoá */}
      {/* Bootstrap Confirm Modal */}
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: '#00000066' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDeleteConfirmed}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/*  Form sửa sản phẩm */}
      {editingProduct && (
        <div style={{ marginTop: 20 }}>
          <h4>Edit Product</h4>
          <input
            placeholder="Name"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            style={{ marginRight: 10 }}
          />
          <input
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            style={{ marginRight: 10 }}
          />
          <button onClick={updateProduct}>Save</button>{' '}
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
<ToastContainer position="top-right" autoClose={3000} />

export default App;
