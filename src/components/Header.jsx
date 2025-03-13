import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaBars, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onCartClick }) {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'text-primary' : 'text-white';
  };

  return (
    <header className="bg-secondary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">ShopEasy</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} hover:text-primary transition-colors`}>Home</Link>
            <Link to="/shop" className={`${isActive('/shop')} hover:text-primary transition-colors`}>Shop</Link>
            <Link to="/categories" className={`${isActive('/categories')} hover:text-primary transition-colors`}>Categories</Link>
            <Link to="/about" className={`${isActive('/about')} hover:text-primary transition-colors`}>About</Link>
            <Link to="/contact" className={`${isActive('/contact')} hover:text-primary transition-colors`}>Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <FaBars size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Profile Icon */}
            <Link 
              to="/profile"
              className="flex items-center text-white p-2 hover:text-primary transition-colors"
            >
              <FaUser size={20} />
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={onCartClick}
              className="flex items-center text-white p-2 hover:text-primary transition-colors relative"
            >
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary-light">
            <Link to="/" className={`block px-3 py-2 ${isActive('/')} hover:bg-primary rounded-md`}>Home</Link>
            <Link to="/shop" className={`block px-3 py-2 ${isActive('/shop')} hover:bg-primary rounded-md`}>Shop</Link>
            <Link to="/categories" className={`block px-3 py-2 ${isActive('/categories')} hover:bg-primary rounded-md`}>Categories</Link>
            <Link to="/about" className={`block px-3 py-2 ${isActive('/about')} hover:bg-primary rounded-md`}>About</Link>
            <Link to="/contact" className={`block px-3 py-2 ${isActive('/contact')} hover:bg-primary rounded-md`}>Contact</Link>
            <Link to="/profile" className={`block px-3 py-2 ${isActive('/profile')} hover:bg-primary rounded-md`}>My Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}