import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return {
          ...state,
          items: updatedItems
        };
      }
      
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return {
        ...state,
        items: newItems
      };
    
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems));
      return {
        ...state,
        items: filteredItems
      };
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter(item => item._id !== action.payload.id);
        localStorage.setItem('cartItems', JSON.stringify(filteredItems));
        return {
          ...state,
          items: filteredItems
        };
      }
      
      const updatedItems = state.items.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return {
        ...state,
        items: updatedItems
      };
    
    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return {
        ...state,
        items: []
      };
    
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: cart.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};