import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import Dashboard from '../pages/Dashboard';
import { toast } from 'react-toastify';
import '../styles/ProductManager.css';
import UserProfile from '../pages/UserProfile';

const API_URL = 'https://product-api-7ric.onrender.com/products';

function ProductManager({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('dashboard');

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

  const handleSaveProduct = async (product) => {
    const payload = {
      name: product.name.trim(),
      price: Number(product.price),
      imageUrl: product.imageUrl.trim() || '',
    };

    try {
      if (product._id) {
        await axios.put(`${API_URL}/${product._id}`, payload, getAuthHeader());
        toast.success('Product updated!');
      } else {
        await axios.post(API_URL, payload, getAuthHeader());
        toast.success('Product added!');
      }

      setSelectedProduct(null);
      setShowForm(false);
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
    <div className="dashboard d-flex">
      <Sidebar
        view={view}
        onNavigate={(view) => {
          setView(view);
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onLogout={onLogout}
        onAdd={() => {
          setView('products');
          setShowForm(true);
          setSelectedProduct(null);
        }}
      />
      <div className="main-content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🛍️ Product Manager</h2>
        </div>

        {view === 'dashboard' && <Dashboard products={products} />}

        {view === 'products' && (
          <>
            {!showForm && !selectedProduct && (
              <div className="mb-4">
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Product</button>
              </div>
            )}

            {showForm && (
              <ProductForm
                product={selectedProduct}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedProduct(null);
                }}
              />
            )}

            {selectedProduct && !showForm && (
              <ProductDetail
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
              />
            )}

            {!showForm && !selectedProduct && (
              <div className="row">
                {products.map((product) => (
                  <div className="col-md-4 mb-4" key={product._id}>
                    <ProductCard
                      product={product}
                      onEdit={() => {
                        setShowForm(true);
                        setSelectedProduct(product);
                      }}
                      onDelete={deleteProduct}
                      onView={() => setSelectedProduct(product)}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {view === 'profile' && <UserProfile />}
      </div>
    </div>
  );
}

export default ProductManager;
