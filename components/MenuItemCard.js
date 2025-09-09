import React from 'react';
import { useCart } from '../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
  };

  return (
    <div className="menu-item-card">
      <img 
        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image}`} 
        alt={item.name}
        className="menu-item-image"
      />
      <div className="menu-item-content">
        <h3 className="menu-item-title">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;