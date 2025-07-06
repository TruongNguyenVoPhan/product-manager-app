import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import '../styles/ProductCard.css';

function ProductCard({ product, onEdit, onDelete, onView }) {
  return (
    <div className="card h-100 shadow-sm product-card" onClick={() => onView(product)} style={{ cursor: 'pointer' }}>
      <img
        src={product.imageUrl || '/images/noimage.png'}
        className="card-img-top p-2 object-fit-contain"
        alt={product.name}
        style={{ height: 160 }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/noimage.png';
        }}
      />
      <div className="card-body text-center">
        <h6 className="fw-bold text-truncate">{product.name}</h6>
        <p className="text-muted mb-2">${product.price}</p>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={(e) => { e.stopPropagation(); onView(product); }}>👁️</button>
          <button className="btn btn-outline-warning btn-sm" onClick={(e) => { e.stopPropagation(); onEdit(product); }}>✏️</button>
          <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); onDelete(product); }}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
