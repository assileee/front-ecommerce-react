// pages/Cart.jsx

import React, { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = Number(newQuantity);
    updateCart(newCart);
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Model</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.productName}</td>
                  <td>
                    <img src={item.imageUrl} alt={item.productName} style={{ width: 70, height: 50, objectFit: "cover" }} />
                  </td>
                  <td>{item.model}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      style={{ width: 60 }}
                      onChange={e => handleQuantityChange(idx, e.target.value)}
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(idx)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-end fw-bold">Total:</td>
                <td colSpan={2} className="fw-bold">${total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
