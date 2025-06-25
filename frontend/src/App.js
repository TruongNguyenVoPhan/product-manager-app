import React, { useEffect, useState } from 'react';
import axios from 'axios';

//  API backend đang chạy ở đây
const API_URL = "https://product-api-7ric.onrender.com/products";

function App() {
  //  STATE QUẢN LÝ DỮ LIỆU
  const [products, setProducts] = useState([]);             // Danh sách sản phẩm
  const [name, setName] = useState('');                     // Tên sản phẩm mới
  const [price, setPrice] = useState('');                   // Giá sản phẩm mới
  const [editingProduct, setEditingProduct] = useState(null); // Sản phẩm đang sửa (nếu có)

  //  Lấy dữ liệu sản phẩm từ API khi trang tải
  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  //  Thêm sản phẩm mới
  const addProduct = async () => {
    if (!name || !price) return alert("Name and price are required!");
    await axios.post(API_URL, { name, price: Number(price) });
    setName('');
    setPrice('');
    fetchProducts(); // Refresh danh sách
  };

  //  Xoá sản phẩm theo ID
  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  // Sửa sản phẩm đã chọn (PUT)
  const updateProduct = async () => {
    await axios.put(`${API_URL}/${editingProduct.id}`, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
    });
    setEditingProduct(null); // Xoá form sửa
    fetchProducts();         // Cập nhật danh sách
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
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}{' '}
            <button onClick={() => deleteProduct(p.id)}>Delete</button>{' '}
            <button onClick={() => setEditingProduct(p)}>Edit</button>
          </li>
        ))}
      </ul>

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

export default App;
