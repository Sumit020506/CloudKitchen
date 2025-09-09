import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    paymentMethod: 'cash',
    specialInstructions: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const orderData = {
        items: items.map(item => ({
          menuItem: item._id,
          quantity: item.quantity
        })),
        deliveryAddress: currentUser.address,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions
      };
      
      const response = await api.post('/orders', orderData);
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success', { state: { order: response.data.data.order } });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Checkout</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <h4>Order Summary</h4>
            {items.map(item => (
              <div key={item._id} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${getCartTotal().toFixed(2)}</strong>
            </div>
          </div>
          
          <div className="card mt-4">
            <h4>Delivery Address</h4>
            <p>
              {currentUser.address.street}<br />
              {currentUser.address.city}, {currentUser.address.state} {currentUser.address.zipCode}
            </p>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <h4>Payment Method</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  name="paymentMethod"
                  className="form-control"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  className="form-control"
                  rows="3"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Any special instructions for delivery..."
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block w-100"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;