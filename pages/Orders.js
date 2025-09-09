import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'preparing': return 'status-preparing';
      case 'out for delivery': return 'status-preparing';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (loading) {
    return <div className="container text-center">Loading orders...</div>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">Your Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center">
          <h4>No orders found</h4>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4>Order #{order._id.slice(-6)}</h4>
                <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
                <p className="mt-2">Total: ${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-3">
              <h5>Items:</h5>
              {order.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.quantity}x {item.menuItem?.name}</span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            {order.specialInstructions && (
              <div className="mt-3">
                <h5>Special Instructions:</h5>
                <p>{order.specialInstructions}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;