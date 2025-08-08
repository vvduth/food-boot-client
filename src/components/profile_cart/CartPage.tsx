import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";
import type { MenuItem } from "../../types/menus";
import type { Cart } from "../../types/cart";
const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();
  const [message, setMessage] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await ApiService.getCart();
      if (response.statusCode === 200) {
        const cartData = response.data as Cart;
        setCart(cartData);
      } else {
        showError("Failed to fetch cart details");
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrement = async (menuId: string) => {
    try {
      const response = await ApiService.incrementItem(menuId);
      if (response.statusCode === 200) {
        fetchCart
      } else {
        showError("Failed to increment item quantity");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const handleDecrement = async (menuId: string) => {
    try {
      const response = await ApiService.decrementItem(menuId);
      if (response.statusCode === 200) {
        fetchCart();
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const handleRemoveItemFromCart = async (cartItemId: string) => {
    try {
      const response = await ApiService.removeItem(cartItemId);
      if (response.statusCode === 200) {
        fetchCart();
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await ApiService.placeOrder();
      if (response.statusCode === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage(null);
          fetchCart();
          navigate("/my-orders-history");
        }, 5000);
      } else {
        showError("Failed to place order");
      }
    } catch (error: any) {
      showError(error.response?.data?.message || error.message);
    }
  };

  if (!cart || cart.cartItems.length === 0) {
    return (
      <div className="cart-container-empty">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>
            Please add some items to your cart before proceeding to checkout.
          </p>
          <button onClick={() => navigate("/menu")} className="browse-btn">
            Go to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Render the ErrorDisplay component */}
      <ErrorDisplay />

      {/* DISPLAY SUCCESS MESSAGE HERE */}
      {message && <p className="success">{message}</p>}

      <h1 className="cart-title">Your Shopping Cart</h1>

      <div className="cart-items">
        {cart.cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image-container">
              <img
                src={item.menu.imageUrl}
                alt={item.menu.name}
                className="item-image"
              />
            </div>

            <div className="item-details">
              <h3 className="item-name">{item.menu.name}</h3>
              <p className="item-description">{item.menu.description}</p>
              <p className="item-price">€{item.pricePerUnit.toFixed(2)} each</p>

              <div className="quantity-controls">
                <button
                  onClick={() => handleDecrement(item.menu.id)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.menu.id)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="item-subtotal">
              <p>€{item.subTotal.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItemFromCart(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>€{cart.totalAmount.toFixed(2)}</span>
        </div>

        <div className="summary-row total">
          <span>Total:</span>
          <span>€{cart.totalAmount.toFixed(2)}</span>
        </div>

        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
