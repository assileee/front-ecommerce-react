import { useEffect, useState } from "react"
import { fetchProducts } from "../utils/fetchProducts.js"
import CardComponent from "../components/CardComponent.jsx"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    brand: "",
    model: "",
    stock: "",
    price: "",
    image: null,
  })

  // Check admin status
  const isAdmin = localStorage.getItem("role") === "admin"

  useEffect(() => {
    loadProducts()
    // eslint-disable-next-line
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  // Handle add product submit
  const handleProductSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) data.append("image", value)
      else data.append(key, value)
    })
    const token = localStorage.getItem("token")
    try {
      const response = await fetch("http://localhost:3000/api/products/addProduct", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      })
      const result = await response.json()
      if (response.ok) {
        alert("Product added!")
        setShowForm(false)
        setForm({
          productName: "",
          productDescription: "",
          brand: "",
          model: "",
          stock: "",
          price: "",
          image: null,
        })
        loadProducts()
      } else {
        alert(result.message || "Failed to add product")
      }
    } catch (err) {
      alert(err.message || "Network error")
    }
  }

  // Handle delete product
  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/products/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete");
      }
    } catch (err) {
      alert(err.message || "Network error");
    }
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!products.length) return <p>No products found</p>

  return (
    <>
      {/* Products List */}
      <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map((product) => (
          <div key={product._id || product.id} className="col">
            <CardComponent
              title={product.productName}
              description={product.productDescription}
              price={product.price}
              imageUrl={product.imageUrl || "https://placehold.co/300x200"}
            />
            {/* Delete Button (Admins only) */}
            {isAdmin && (
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Add Product Button (Admins only) */}
      {isAdmin && (
        <div className="mb-3 mt-4 text-center">
          <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        </div>
      )}

      {/* Add Product Form (Admins only) */}
      {isAdmin && showForm && (
        <form onSubmit={handleProductSubmit} className="card p-3 mb-4" style={{ maxWidth: 500, margin: "0 auto" }}>
          <h5>Add New Product</h5>
          <input
            name="productName"
            className="form-control mb-2"
            placeholder="Name"
            value={form.productName}
            onChange={handleChange}
            required
          />
          <input
            name="brand"
            className="form-control mb-2"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
          <input
            name="model"
            className="form-control mb-2"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
          />
          <input
            name="stock"
            type="number"
            className="form-control mb-2"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="productDescription"
            className="form-control mb-2"
            placeholder="Description"
            value={form.productDescription}
            onChange={handleChange}
          />
          <input
            name="image"
            type="file"
            className="form-control mb-2"
            onChange={handleChange}
            accept="image/*"
          />
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      )}
    </>
  )
}

export default HomePage
