// src/components/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product._id}>
          <ProductCard
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
