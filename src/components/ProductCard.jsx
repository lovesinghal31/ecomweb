import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaInfoCircle, FaStar, FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import { useReviews } from '../context/ReviewContext';
import ProductReview from './ProductReview';

export default function ProductCard({ product }) {
  const [showReview, setShowReview] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getReviewById } = useReviews();
  const { id, title, price, category, image, description } = product;
  
  // In a real app, this would be based on the actual product ID
  // For demo purposes, we're using the product ID to match our mock reviews
  const review = getReviewById(id);
  
  const toggleReview = (e) => {
    e.stopPropagation(); // Prevent card click event
    e.preventDefault(); // Prevent link navigation
    setShowReview(!showReview);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent card click event
    e.preventDefault(); // Prevent link navigation
    toggleWishlist(product);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event
    e.preventDefault(); // Prevent link navigation
    addItem(product);
  };

  const isWishlisted = isInWishlist(id);

  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl h-full flex flex-col">
        <div className="overflow-hidden h-64 flex-shrink-0 relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/300x300/?${encodeURIComponent(title)}`;
            }}
          />
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-300 ${
              isWishlisted 
                ? 'bg-red-50 hover:bg-red-100' 
                : 'bg-white/90 hover:bg-white'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" size={18} />
            ) : (
              <FaRegHeart className="text-gray-400 hover:text-red-500" size={18} />
            )}
          </button>
          
          {/* View Details Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <FaEye className="text-primary" size={20} />
            </div>
          </div>
          
          {/* Review Button - moved to bottom left */}
          {review && (
            <div className="absolute bottom-2 left-2 bg-white/90 rounded-full p-1 shadow-md">
              <button 
                onClick={toggleReview}
                className="text-primary hover:text-primary-dark flex items-center"
                title="Show AI-summarized reviews"
              >
                <FaStar className="text-primary mr-1" size={14} />
                <span className="font-medium text-sm">{review.averageRating}</span>
                <FaInfoCircle className="ml-1" size={12} />
              </button>
            </div>
          )}
        </div>
        <div className="p-4 transition-colors duration-300 group-hover:bg-gray-50 flex flex-col flex-grow">
          <span className="text-xs w-fit font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10 mb-2 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            {category}
          </span>
          <h3 className="text-lg font-medium text-gray-900 mb-1 transition-colors duration-300 group-hover:text-primary line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-grow">{description}</p>
          
          {/* Review Section (Collapsible) */}
          {showReview && review && (
            <div className="mb-3 border-t border-b py-3 -mx-4 px-4">
              <ProductReview review={review} isCompact={true} />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-gray-900 transition-transform duration-300 group-hover:scale-110">₹{price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary transition-all duration-300 transform group-hover:shadow-md group-hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
