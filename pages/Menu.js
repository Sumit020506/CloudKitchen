import React, { useState, useEffect } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import api from '../utils/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' 
        ? '/menu' 
        : `/menu?category=${selectedCategory}`;
      
      const response = await api.get(url);
      setMenuItems(response.data.data.menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">Our Menu</h1>
      
      <div className="text-center mb-4">
        <button 
          className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        <button 
          className={`btn ${selectedCategory === 'appetizer' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedCategory('appetizer')}
        >
          Appetizers
        </button>
        <button 
          className={`btn ${selectedCategory === 'main course' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedCategory('main course')}
        >
          Main Courses
        </button>
        <button 
          className={`btn ${selectedCategory === 'dessert' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setSelectedCategory('dessert')}
        >
          Desserts
        </button>
        <button 
          className={`btn ${selectedCategory === 'beverage' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setSelectedCategory('beverage')}
        >
          Beverages
        </button>
      </div>
      
      <div className="menu-grid">
        {menuItems.map(item => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
      
      {menuItems.length === 0 && (
        <div className="text-center mt-5">
          <h3>No items found in this category</h3>
        </div>
      )}
    </div>
  );
};

export default Menu;