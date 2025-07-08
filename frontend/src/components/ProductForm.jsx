import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const CATEGORY_API = 'https://product-api-7ric.onrender.com/categories';

function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [quantity, setQuantity] = useState(product?.quantity || '');
  const [description, setDescription] = useState(product?.description || '');
  const [category, setCategory] = useState(product?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
      setQuantity(product.quantity || '');
      setDescription(product.description || '');
      setCategory(product.category || '');
    }
  }, [product]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(CATEGORY_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setCategories(res.data))
      .catch(() => toast.error('Failed to load categories'));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!price || isNaN(price) || Number(price) <= 0) return toast.error("Price must be positive");
    if (!quantity || isNaN(quantity) || Number(quantity) < 0) return toast.error("Quantity must be >= 0");
    if (!category) return toast.error("Please select a category");

    const payload = {
      _id: product?._id,
      name: name.trim(),
      price: Number(price),
      imageUrl: imageUrl.trim(),
      quantity: Number(quantity),
      description: description.trim(),
      category
    };

    onSave(payload);
  };

  return (
    <div className="product-form card p-4 mb-4">
      <h4 className="mb-4 fw-bold">{product?._id ? 'Edit Product' : 'Add New Product'}</h4>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Product Name</label>
        <input
          className="form-control"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Category</label>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Price</label>
        <input
          className="form-control"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Quantity</label>
        <input
          className="form-control"
          type="number"
          placeholder="Enter stock quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Image URL</label>
        <input
          className="form-control"
          placeholder="https://example.com/image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Description</label>
        <textarea
          className="form-control"
          placeholder="Enter product description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary w-100">
          {product?._id ? 'Update' : 'Add'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline-secondary w-100" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
    </div>
  );
}

export default ProductForm;
