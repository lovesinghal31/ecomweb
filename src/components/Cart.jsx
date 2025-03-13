import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Cart({ isOpen, onClose }) {
  const { items, totalAmount, checkout } = useCart();

  // Effect to disable body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the body
      document.body.style.overflow = 'hidden';
      // Store the current scroll position
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Re-enable scrolling on the body
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    checkout();
    onClose(); // Close the cart after checkout
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-xl font-bold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-accent w-full py-3"
              disabled={items.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
