// src/components/ProductCard.jsx
import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <img
        src={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={product.name}
        className="product-image"
      />
      <div className="product-title">{product.name}</div>
      <div className="product-price">${product.price}</div>
      <div className="product-actions">
        <button className="btn btn-warning btn-sm" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(product)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
