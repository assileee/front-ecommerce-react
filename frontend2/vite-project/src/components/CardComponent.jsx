import React from "react";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ product, title, description, price, imageUrl }) => {
    const navigate = useNavigate();
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
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };
  

export default CardComponent