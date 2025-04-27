import React from "react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ product, title, description, price, imageUrl }) => {
  const navigate = useNavigate();

  // Add to cart handler
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if already in cart
    const found = cart.find(item => item._id === product._id);
    if (found) {
      found.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <article className="col">
      <div className="card shadow-sm">
        <img src={imageUrl} alt="Product" style={{ width: "100%", height: "auto" }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <strong>Price: ${price}</strong>
          </p>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleAddToCart}
              title="Add to cart"
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardComponent;
