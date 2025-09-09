import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="container text-center">
        <h2>Order Not Found</h2>
        <p>It seems there was an issue with your order confirmation.</p>
        <Link to="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container text-center">
      <div className="card">
        <h2 className="text-success">Order Placed Successfully!</h2>
        <p>Thank you for your order. We're preparing your food now.</p>
        
        <div className="mt-4">
          <h4>Order Details</h4>
          <p>Order ID: {order._id}</p>
          <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
          <p>Estimated Delivery: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}</p>
          <p>Status: <span className={`order-status status-${order.status}`}>{order.status}</span></p>
        </div>
        
        <div className="mt-4">
          <Link to="/orders" className="btn btn-primary me-3">
            View All Orders
          </Link>
          <Link to="/menu" className="btn btn-outline-primary">
            Order More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;