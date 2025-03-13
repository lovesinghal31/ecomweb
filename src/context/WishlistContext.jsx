import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
};

// Load wishlist from localStorage if available
const loadWishlistFromStorage = () => {
  try {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : initialState;
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return initialState;
  }
};

function wishlistReducer(state, action) {
  let updatedState;
  
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      // Check if item already exists in wishlist
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      // If item doesn't exist, add it to wishlist
      if (existingItemIndex === -1) {
        updatedState = {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + 1,
        };
      } else {
        // Item already exists, no change needed
        return state;
      }
      break;
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      // Filter out the item to remove
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      
      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
      };
      break;
    }
    
    case 'TOGGLE_WISHLIST': {
      // Check if item already exists in wishlist
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let updatedItems;
      
      // If item exists, remove it; otherwise, add it
      if (existingItemIndex > -1) {
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        updatedItems = [...state.items, action.payload];
      }
      
      updatedState = {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.length,
      };
      break;
    }
    
    case 'CLEAR_WISHLIST': {
      updatedState = {
        ...initialState
      };
      break;
    }
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  
  // Save updated wishlist to localStorage
  localStorage.setItem('wishlist', JSON.stringify(updatedState));
  return updatedState;
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState, loadWishlistFromStorage);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (product) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.items,
        totalWishlistItems: state.totalItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 