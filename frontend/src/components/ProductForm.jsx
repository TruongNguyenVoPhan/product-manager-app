import React, { useState, useEffect } from 'react';

function ProductForm({ product, onSave, onCancel }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
    } else {
      setName('');
      setPrice('');
      setImageUrl('');
    }
  }, [product]);

  const handleSubmit = () => {
    onSave({ ...product, name, price, imageUrl });
  };

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">{product ? 'Edit Product' : 'Add Product'}</h5>
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
        className="form-control mb-3"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="d-flex">
        <button className="btn btn-success me-2" onClick={handleSubmit}>Save</button>
        {onCancel && (
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </div>
  );
}

export default ProductForm;
