import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch single product
    fetch(`${API_URL}/api/products/seeProduct/${id}`)
    .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mt-4">
      <div className="card" style={{ maxWidth: 600, margin: "0 auto" }}>
        <img
          src={product.imageUrl || "https://placehold.co/300x200"}
          alt={product.productName}
          className="card-img-top"
          style={{ maxHeight: 300, objectFit: "cover" }}
        />
        <div className="card-body">
          <h3 className="card-title">{product.productName}</h3>
          <p className="card-text"><strong>Brand:</strong> {product.brand}</p>
          <p className="card-text"><strong>Model:</strong> {product.model}</p>
          <p className="card-text"><strong>Description:</strong> {product.productDescription}</p>
          <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
          <p className="card-text"><strong>Price:</strong> ${product.price}</p>
          {/* Add to Cart button */}
          <button
            className="btn btn-success mt-2"
            onClick={async () => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("You must be logged in to add to cart");
                return;
              }
              try {
                const res = await fetch(`${API_URL}/api/cart/add`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                  }),
                });
                if (!res.ok) throw new Error("Failed to add to cart");
                alert("Added to cart!");
              } catch (err) {
                alert(err.message || "Error adding to cart");
              }
            }}
          >
            Add to Cart
          </button>
          <button className="btn btn-secondary mt-2 ms-2" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
