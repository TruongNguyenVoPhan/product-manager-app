import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import '../styles/ProductCard.css';

function ProductCard({ product, onEdit, onDelete, onView }) {
  return (
    <div className="product-card shadow-sm border rounded-4 p-3 bg-white h-100 d-flex flex-column justify-content-between">
      <div className="text-center">
        <img
          src={product.imageUrl || "/images/noimage.png"}
          alt={product.name}
          className="img-fluid rounded-3 mb-3"
          style={{ maxHeight: '180px', objectFit: 'cover' }}
        />
        <h6 className="fw-bold mb-1">{product.name}</h6>
        <p className="text-muted">${product.price}</p>
      </div>
      <div className="d-flex justify-content-around mt-2">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onView(product)}>
          <FaEye />
        </button>
        <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(product)}>
          <FaEdit />
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
