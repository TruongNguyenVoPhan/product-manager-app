import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, onEdit, onDelete, onView }) {
  return (
    <div
      className="product-card"
      onClick={() => onView(product)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={product.imageUrl || '/images/noimage.png'}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/noimage.png';
        }}
      />
      <h5 className="product-title">{product.name}</h5>
      <p className="product-price">${product.price}</p>
      <div className="product-actions">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onView(product);
          }}
        >
          👁️
        </button>
        <button
          className="btn btn-outline-warning btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}
        >
          ✏️
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product);
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
