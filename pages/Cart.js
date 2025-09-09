import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();
  const { currentUser } = useAuth();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container text-center">
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious items from our menu</p>
        <Link to="/menu" className="btn btn-primary">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">Your Cart</h2>
      
      {items.map(item => (
        <div key={item._id} className="cart-item">
          <div>
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)} each</p>
          </div>
          
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
            >
              -
            </button>
            
            <span className="mx-3">{item.quantity}</span>
            
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
            >
              +
            </button>
            
            <span className="mx-3">${(item.price * item.quantity).toFixed(2)}</span>
            
            <button 
              className="btn btn-sm btn-danger"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div className="cart-total">
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
      </div>
      
      <div className="text-right mt-4">
        {currentUser ? (
          <Link to="/checkout" className="btn btn-primary btn-lg">
            Proceed to Checkout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-lg">
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;