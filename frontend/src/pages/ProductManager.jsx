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
import Spinner from '../components/Spinner';

const API_URL = 'https://product-api-7ric.onrender.com/products';

function ProductManager({ onLogout , userInfo}) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },  
  });

  const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL, getAuthHeader());
        setProducts(res.data);
      } catch (err) {
        toast.error('Error fetching products!');
        localStorage.removeItem('token');
        onLogout();
      } finally {
        setIsLoading(false); 
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

      await fetchProducts();
      const newTotalPages = Math.ceil((filteredProducts.length - 1) / itemsPerPage);

      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(1, newTotalPages));
      }

    } catch {
      toast.error('Delete failed.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


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
          <h5 className="mb-4">👋 Welcome, {userInfo?.username || 'User'}!</h5>
        </div>
        
        {view === 'dashboard' && <Dashboard products={products} />}

        
        {view === 'products' && 
        (
          
          <>
            {!showForm && !selectedProduct && (
              <div className="mb-4">
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Product</button>
              </div>
            )}
            {/*  Search Bar */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search product by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>


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
              isLoading ? (
                <Spinner />
              ) : filteredProducts.length === 0 ? (
                <p className="text-muted text-center">No matching products found.</p>
              ) : (
                <>
                  <div className="row">
                    {currentProducts.map((product) => (
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

                  {/* Pagination controls */}
                  <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      « Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next »
                    </button>
                  </div>
                </>
              )
            )}
          </>
        )}
        {view === 'profile' && <UserProfile />}
      </div>
    </div>
  );
}

export default ProductManager;
