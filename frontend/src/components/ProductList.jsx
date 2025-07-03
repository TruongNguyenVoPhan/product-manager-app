function ProductList({ products, onEdit, onDelete, onView }) {
  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product._id}>
          <div className="card" onClick={() => onView(product)} style={{ cursor: 'pointer' }}>
            <img src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}</p>
              <div className="d-flex justify-content-between">
                <button className="btn btn-warning btn-sm" onClick={(e) => { e.stopPropagation(); onEdit(product); }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); onDelete(product); }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ProductList;