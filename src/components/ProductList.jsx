import ProductCard from "./ProductCard";

function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="alert alert-light border text-center">No products found.</div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
          <ProductCard product={product} onEdit={onEdit} onDelete={onDelete}/>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
