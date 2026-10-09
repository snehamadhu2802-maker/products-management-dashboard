function ProductCard({ product, onEdit, onDelete }) {
  const image = product.thumbnail || product.images?.[0];

  return (
    <div className="card h-100 shadow-sm">
      <div className="product-image bg-white p-3">
        {image ? (
          <img src={image} alt={product.title} />
        ) : (
          <span className="text-muted">No image</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <h5 className="text-primary mt-2">
          ${Number(product.price).toFixed(2)}
        </h5>

        <div className="d-flex gap-2 mt-auto pt-3">
          <button className="btn btn-outline-dark btn-sm flex-fill"
            onClick={() => onEdit(product)} > Edit</button>
          <button className="btn btn-outline-danger btn-sm flex-fill" 
            onClick={() => onDelete(product.id)} > Delete </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
