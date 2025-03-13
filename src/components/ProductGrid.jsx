import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    // Set a small delay before showing products for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');
    const productId = searchParams.get('product');
    
    if (query) {
      setSearchTerm(query);
      // Filter products based on search query
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (productId) {
      // If product ID is specified, show only that product
      const filtered = products.filter(product => product.id === parseInt(productId));
      setFilteredProducts(filtered);
    } else {
      // If no search query, show all products
      setFilteredProducts(products);
      setSearchTerm('');
    }
  }, [location.search]);

  // If no products found
  if (filteredProducts.length === 0 && searchTerm) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaSearch className="text-gray-400 text-3xl" />
        </div>
        <h3 className="text-2xl font-medium text-gray-800 mb-2">No results found</h3>
        <p className="text-gray-600 mb-6">We couldn't find any products matching "{searchTerm}"</p>
        <button 
          onClick={() => window.history.pushState({}, '', '/shop')}
          className="btn btn-primary"
        >
          View All Products
        </button>
      </div>
    );
  }

  return (
    <>
      {searchTerm && (
        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            Showing results for <span className="font-medium">"{searchTerm}"</span>
          </p>
          <div className="h-0.5 w-full bg-gray-100">
            <div className="h-full bg-primary w-1/4"></div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            className={`transition-all duration-500 transform h-full ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}