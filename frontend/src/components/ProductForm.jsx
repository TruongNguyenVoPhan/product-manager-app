import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault(); //  Ngăn reload form
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    onSave({ _id: product?._id, name, price, imageUrl });

  };


  return (
    <div className="product-form card p-4 mb-4">
      <h4 className="mb-4 fw-bold">
        {product && product._id ? 'Edit Product' : 'Add New Product'}
      </h4>
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
          <label className="form-label fw-semibold">Price</label>
          <input
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Image URL</label>
          <input
            className="form-control"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">
            {product && product._id ? 'Update' : 'Add'}
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
