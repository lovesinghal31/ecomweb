import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaBars, FaUser, FaSearch, FaTimes, FaHeart } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header({ onCartClick }) {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Mock product suggestions - in a real app, this would come from your API
  const mockProducts = [
    { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics' },
    { id: 2, name: 'Smart Fitness Tracker', category: 'Wearables' },
    { id: 3, name: 'Smartphone Pro Max', category: 'Electronics' },
    { id: 4, name: 'Laptop Ultra Slim', category: 'Electronics' },
    { id: 5, name: 'Cotton T-shirt', category: 'Clothing' },
    { id: 6, name: 'Kitchen Blender', category: 'Home & Kitchen' }
  ];

  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix scrolling issues when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchSuggestions([]);
      return;
    }
    
    // Filter products based on search query
    const filteredProducts = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchSuggestions(filteredProducts);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // In a real app, you would navigate to search results page with the query
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Determine navbar style based on page and scroll position
  const getNavbarStyle = () => {
    // On homepage and not scrolled: transparent background
    if (isHomePage && !isScrolled) {
      return 'bg-transparent text-white';
    }
    // On any other page or when scrolled: white background with shadow
    return 'bg-white text-gray-800 shadow-md';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarStyle()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold flex items-center">
                <span className="text-primary mr-1">Shop</span>
                <span className={isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'}>Easy</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/shop', label: 'Shop' },
                { path: '/categories', label: 'Categories' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.path) 
                      ? 'text-primary' 
                      : `${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'} hover:text-primary`
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full ${
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                } transition-colors`}
                aria-label="Search"
              >
                <FaSearch size={18} />
              </button>

              {/* Profile Icon */}
              <Link 
                to="/profile"
                className={`p-2 rounded-full ${
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                } transition-colors ${isActive('/profile') ? 'text-primary' : ''}`}
              >
                <FaUser size={18} />
              </Link>

              {/* Wishlist Icon */}
              <Link 
                to="/profile?tab=wishlist"
                className={`p-2 rounded-full ${
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                } transition-colors relative ${location.pathname === '/profile' && location.search.includes('tab=wishlist') ? 'text-primary' : ''}`}
                aria-label="Wishlist"
              >
                <FaHeart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <button 
                onClick={onCartClick}
                className={`p-2 rounded-full ${
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                } transition-colors relative`}
              >
                <FaShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-full ${
                  isHomePage && !isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                } transition-colors`}
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <div 
          className={`absolute top-full left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
          }`}
          ref={searchContainerRef}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center border-b-2 border-primary">
                <FaSearch className="text-gray-400 mr-3" size={18} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products, categories..."
                  className="w-full py-2 focus:outline-none text-gray-800 text-lg"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchSuggestions([]);
                      searchInputRef.current.focus();
                    }}
                  >
                    <FaTimes size={18} />
                  </button>
                )}
              </div>
              
              {/* Search Suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 bg-white mt-2 rounded-md shadow-lg z-10 max-h-96 overflow-y-auto">
                  <ul className="py-2">
                    {searchSuggestions.map(product => (
                      <li key={product.id}>
                        <Link 
                          to={`/shop?product=${product.id}`}
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span>{product.name}</span>
                            <span className="text-xs text-gray-500">{product.category}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2 border-t">
                    <button 
                      type="submit" 
                      className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      See all results for "{searchQuery}"
                    </button>
                  </div>
                </div>
              )}
            </form>
            
            {/* Quick Links */}
            {!searchSuggestions.length && searchQuery === '' && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {['Headphones', 'Smartphones', 'Laptops', 'Clothing', 'Kitchen'].map(term => (
                    <button 
                      key={term}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearchChange({ target: { value: term } });
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <nav className="h-full overflow-y-auto pb-20">
            <div className="px-4 py-6 space-y-1">
              {[
                { path: '/', label: 'Home', icon: '🏠' },
                { path: '/shop', label: 'Shop', icon: '🛍️' },
                { path: '/categories', label: 'Categories', icon: '📋' },
                { path: '/about', label: 'About', icon: 'ℹ️' },
                { path: '/contact', label: 'Contact', icon: '📞' },
                { path: '/profile', label: 'My Profile', icon: '👤' },
                { path: '/profile?tab=wishlist', label: 'My Wishlist', icon: '❤️' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    (item.path === '/profile?tab=wishlist' && location.pathname === '/profile' && location.search.includes('tab=wishlist')) ||
                    (item.path === location.pathname && !item.path.includes('?'))
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  {item.path === '/profile?tab=wishlist' && wishlistItems.length > 0 && (
                    <span className="ml-auto bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      
      {/* Spacer to prevent content from being hidden under the navbar */}
      {!isHomePage && <div className="h-16"></div>}
    </>
  );
}