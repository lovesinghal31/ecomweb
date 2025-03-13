import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-page.webp';

export default function Hero() {
  return (
    <div className="relative">
      <div 
        className="h-[500px] bg-cover bg-center flex items-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to ShopEasy
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Discover amazing products with unbeatable prices and exceptional quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn btn-primary text-lg px-8 py-3 inline-block hover:scale-105 transition-transform">
                Shop Now
              </Link>
              <Link to="/categories" className="btn btn-outline-light text-lg px-8 py-3 inline-block border-2 border-white text-white hover:bg-white/20 transition-colors">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-primary text-2xl font-bold mb-1">Fast Shipping</div>
              <p className="text-gray-600">Delivery within 2-3 days</p>
            </div>
            <div className="p-4">
              <div className="text-primary text-2xl font-bold mb-1">Secure Payment</div>
              <p className="text-gray-600">Multiple payment options</p>
            </div>
            <div className="p-4">
              <div className="text-primary text-2xl font-bold mb-1">Easy Returns</div>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="p-4">
              <div className="text-primary text-2xl font-bold mb-1">24/7 Support</div>
              <p className="text-gray-600">Customer service always available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  