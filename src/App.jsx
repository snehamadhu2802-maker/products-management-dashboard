import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import {setProducts, setLoading, setError, addProduct, deleteProduct, updateProduct,} from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (err) {
        dispatch(setError(err.message || "Something went wrong."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => {
    dispatch(addProduct(product));
  };

  const handleUpdate = (product) => {
    dispatch(updateProduct(product));
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      dispatch(deleteProduct(id));

      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-vh-100">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1"> Products Dashboard</span>
          <span className="text-white-50 small">Product Management</span>
        </div>
      </nav>

      <main className="container py-4">
        <div className="mb-4">
          <h2 className="text-center">Products Management Dashboard </h2>
          <p className="text-secondary text-center">
            Add, search, edit and delete your products.
          </p>
        </div>

        <ProductForm onAdd={handleAdd} onUpdate={handleUpdate}
         editingProduct={editingProduct} onCancel={handleCancel}/>
        <div className="row align-items-center g-3 mb-4">
          <div className="col-md-8">
            <input type="search"  className="form-control" placeholder="Search products by name..." value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="col-md-4 text-md-end">
            <span className="badge text-bg-dark fs-6">
              {filteredProducts.length} products
            </span>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-dark"
              role="status" >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading products...</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            <p className="mb-2">{error}</p>
            <button className="btn btn-outline-danger btn-sm" onClick={handleRetry} >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <ProductList
           products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <footer className="border-top bg-dark py-3 mt-5">
        <div className="container text-center text-white small">
          @ Products Management Dashboard 2026
        </div>
      </footer>
    </div>
  );
}

export default App;
