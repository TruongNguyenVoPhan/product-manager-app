import React from 'react';
import '../styles/ProductDetail.css';

function ProductDetail({ product, onBack }) {
  return (
    <div className="card p-4">
      <h4>Product Detail</h4>
      <img
        src={product.imageUrl || "/images/noimage.png"}
        alt={product.name}
        className="product-detail-image mb-3"
        />

      <h5 className="mt-3">{product.name}</h5>
      <p><strong>Price:</strong> ${product.price}</p>
      <button className="btn btn-secondary mt-3" onClick={onBack}>Back</button>
    </div>
  );
}

export default ProductDetail;
