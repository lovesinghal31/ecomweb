import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroImage from '../assets/hero-page.webp';
import { FaShippingFast, FaLock, FaUndo, FaHeadset, FaTag, FaUserFriends } from 'react-icons/fa';

export default function Hero() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Features to showcase
  const features = [
    {
      title: "Exclusive Deals",
      description: "Get access to members-only discounts and early access to sales",
      icon: <FaTag className="text-4xl mb-4 text-primary" />
    },
    {
      title: "Premium Quality",
      description: "Curated products that meet our high standards of excellence",
      icon: <FaUserFriends className="text-4xl mb-4 text-primary" />
    },
    {
      title: "Fast Shipping",
      description: "Free express delivery on orders above ₹999",
      icon: <FaShippingFast className="text-4xl mb-4 text-primary" />
    }
  ];

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Calculate transform values for the Ken Burns effect
  const scale = 1.1 + (scrollPosition * 0.0005);
  const translateX = scrollPosition * 0.05;
  
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Moving Image */}
      <div 
        className="h-[600px] bg-cover bg-center flex items-center relative overflow-hidden" 
      >
        {/* Moving Background Image with Ken Burns effect */}
        <div 
          className="absolute inset-0 transition-transform duration-[30s] ease-in-out bg-cover bg-center animate-kenburns"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `scale(${scale}) translateX(${-translateX}px)`,
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-fadeIn">
                Welcome to <span className="text-primary">Shop</span>Easy
              </h1>
              <p className="text-xl text-white mb-6 max-w-2xl animate-slideUp">
                Discover amazing products with unbeatable prices and exceptional quality.
              </p>
              
              {/* Animated Feature Showcase */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8 transition-all duration-500 animate-fadeIn">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`transition-opacity duration-500 absolute ${
                      index === activeFeature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                ))}
                <div className="h-32"></div> {/* Spacer for the content */}
                
                {/* Feature Indicators */}
                <div className="flex space-x-2 mt-4">
                  {features.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === activeFeature ? 'bg-primary w-6' : 'bg-white/50'
                      }`}
                      aria-label={`View feature ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="btn btn-primary text-lg px-8 py-3 inline-block hover:scale-105 transition-transform">
                  Shop Now
                </Link>
                <Link to="/categories" className="btn btn-outline-light text-lg px-8 py-3 inline-block border-2 border-white text-white hover:bg-white/20 transition-colors">
                  Browse Categories
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              {/* This space intentionally left empty for the layout balance */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="bg-primary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <FaShippingFast className="text-primary text-3xl mb-3 mx-auto" />
              <div className="text-primary text-xl font-bold mb-1 text-center">Fast Shipping</div>
              <p className="text-gray-600 text-center">Delivery within 2-3 days</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <FaLock className="text-primary text-3xl mb-3 mx-auto" />
              <div className="text-primary text-xl font-bold mb-1 text-center">Secure Payment</div>
              <p className="text-gray-600 text-center">Multiple payment options</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <FaUndo className="text-primary text-3xl mb-3 mx-auto" />
              <div className="text-primary text-xl font-bold mb-1 text-center">Easy Returns</div>
              <p className="text-gray-600 text-center">30-day return policy</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg">
              <FaHeadset className="text-primary text-3xl mb-3 mx-auto" />
              <div className="text-primary text-xl font-bold mb-1 text-center">24/7 Support</div>
              <p className="text-gray-600 text-center">Customer service always available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  