import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          Cloud Kitchen
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/menu" className="nav-link">Menu</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          
          {currentUser ? (
            <>
              <li>
                <Link to="/cart" className="nav-link">
                  Cart
                  {getCartItemsCount() > 0 && (
                    <span className="cart-badge">{getCartItemsCount()}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="nav-link">Orders</Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;