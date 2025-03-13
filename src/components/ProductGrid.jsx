import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useEffect, useState } from 'react';

export default function ProductGrid() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set a small delay before showing products for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
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
  );
}