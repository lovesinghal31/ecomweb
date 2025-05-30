import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

// Load cart from localStorage if available
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return initialState;
  }
};

function cartReducer(state, action) {
  let updatedState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;

      if (existingItemIndex > -1) {
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
      break;
    }

    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex === -1) return state;

      let updatedItems;

      if (state.items[existingItemIndex].quantity === 1) {
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }

      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
      break;
    }

    case 'DELETE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);

      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity < 1) return state;

      const updatedItems = state.items.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });

      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalAmount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
      break;
    }

    case 'CLEAR_CART': {
      updatedState = {
        ...initialState
      };
      break;
    }

    default:
      return state;
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedState));
  return updatedState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const deleteItem = (product) => {
    dispatch({ type: 'DELETE_ITEM', payload: product });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const checkout = () => {
    // In a real application, this would connect to a payment processor
    // For now, we'll just clear the cart and show a success message
    alert('Checkout successful! Thank you for your order.');
    // Clear the cart after successful checkout
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      deleteItem,
      updateQuantity,
      checkout,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}