import React from 'react';
import '../styles/ProductDetail.css';

function ProductDetail({ product, onBack }) {
  return (
    <div className="product-detail">
      <img
        src={product.imageUrl || '/images/noimage.png'}
        alt={product.name}
        onError={(e) => { e.target.onerror = null; e.target.src = '/images/noimage.png'; }}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity ?? 'N/A'}</p>
        <p><strong>Description:</strong> {product.description || 'No description available.'}</p>

        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
      </div>
    </div>
  );
}

export default ProductDetail;
