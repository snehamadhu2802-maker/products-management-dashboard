import { useEffect, useState } from "react";

function ProductForm({ onAdd, onUpdate, editingProduct, onCancel }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.title);
      setImage(
        editingProduct.thumbnail ||
          editingProduct.images?.[0] ||
          ""
      );
      setPrice(String(editingProduct.price));
    } else {
      setName("");
      setImage("");
      setPrice("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !image.trim() ||
      price === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      alert("Please enter a name, image URL and valid price.");
      return;
    }

    const product = {
      ...(editingProduct || {}),
      id: editingProduct ? editingProduct.id : Date.now(),
      title: name.trim(),
      thumbnail: image.trim(),
      images: [image.trim()],
      price: Number(price),
    };

    if (editingProduct) {
      onUpdate(product);
    } else {
      onAdd(product);
    }

    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body p-4">
        <h5 className="mb-3">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="col-md-4">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control" placeholder="Enter product name" value={name}
                onChange={(e) => setName(e.target.value)} required/>
            </div>

            <div className="mb-4">
              <label className="form-label">Image URL</label>
              <input type="url" className="form-control" placeholder="https://example.com/image.jpg" value={image}
                onChange={(e) => setImage(e.target.value)} required/>
            </div>

            <div className="mb-4">
              <label className="form-label">Price ($)</label>
              <input type="number" className="form-control" placeholder="Price" min="0" step="0.01" value={price}
                onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="col-md-2 d-flex align-items-end gap-2">
              <button type="submit" className="btn btn-dark">
                {editingProduct ? "Update" : "Add"}
              </button>

              {editingProduct && (
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
