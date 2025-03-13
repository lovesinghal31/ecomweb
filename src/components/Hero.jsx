import { Link } from 'react-router-dom';

export default function Hero() {
    return (
      <div className="relative bg-gray-900">
        <div 
          className="h-96 bg-cover bg-center flex items-center" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/api/placeholder/1200/400')" 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to ShopEasy
            </h1>
            <p className="text-xl text-white mb-8">
              Discover amazing products with unbeatable prices.
            </p>
            <Link to="/shop" className="btn btn-primary text-lg px-8 py-3 inline-block">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }
  