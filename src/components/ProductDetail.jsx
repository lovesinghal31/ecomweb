import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import { products } from '../data/products';
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';
import ProductReview from './ProductReview';
import PriceTracker from './PriceTracker';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getReviewById } = useReviews();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showPriceTracker, setShowPriceTracker] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    
    // Find product by ID
    const foundProduct = products.find(p => p.id === parseInt(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Simulate loading delay
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      // Product not found, redirect to shop
      navigate('/shop');
    }
  }, [productId, navigate]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add item with quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      
      // Show confirmation
      alert(`${quantity} ${product.title} added to cart!`);
    }
  };
  
  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
    }
  };
  
  const isWishlisted = product ? isInWishlist(product.id) : false;
  const review = product ? getReviewById(product.id) : null;
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/shop" className="text-gray-500 hover:text-primary">Shop</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to={`/shop?category=${product.category}`} className="text-gray-500 hover:text-primary">{product.category}</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </div>
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-primary hover:text-primary-dark mb-6 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        <span>Back to shopping</span>
      </button>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-auto object-cover aspect-square"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/500x500/?${encodeURIComponent(product.title)}`;
            }}
          />
        </div>
        
        {/* Product Info */}
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          
          {review && (
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(review.averageRating) ? "text-yellow-500" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{review.averageRating} ({review.totalReviews} reviews)</span>
            </div>
          )}
          
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            <button 
              onClick={() => setShowPriceTracker(!showPriceTracker)}
              className="ml-4 text-primary hover:text-primary-dark text-sm underline"
            >
              {showPriceTracker ? 'Hide price history' : 'View price history'}
            </button>
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Price Tracker (Collapsible) */}
          {showPriceTracker && (
            <div className="mb-8 border rounded-lg overflow-hidden">
              <PriceTracker 
                productId={product.id} 
                productName={product.title} 
                currentPrice={product.price} 
              />
            </div>
          )}
          
          {/* Add to Cart Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-24">
              <label htmlFor="quantity" className="sr-only">Quantity</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary flex-grow py-3"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full ${
                isWishlisted 
                  ? 'bg-red-50 hover:bg-red-100' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaRegHeart className="text-gray-500" size={20} />
              )}
            </button>
          </div>
          
          {/* Product Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center">
              <FaShippingFast className="text-primary mr-2" />
              <span className="text-sm text-gray-600">Free shipping over ₹999</span>
            </div>
            <div className="flex items-center">
              <FaUndo className="text-primary mr-2" />
              <span className="text-sm text-gray-600">30-day returns</span>
            </div>
            <div className="flex items-center">
              <FaShieldAlt className="text-primary mr-2" />
              <span className="text-sm text-gray-600">1 year warranty</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('priceHistory')}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === 'priceHistory'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Price History
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="mb-4">
                {product.description}
              </p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="bg-white rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">Brand</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">ShopEasy</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Model</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">SE-{product.id}00{product.id}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Category</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Weight</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(Math.random() * 2 + 0.2).toFixed(2)} kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Dimensions</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {Math.floor(Math.random() * 20 + 10)} x {Math.floor(Math.random() * 15 + 5)} x {Math.floor(Math.random() * 10 + 2)} cm
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Warranty</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 Year Manufacturer Warranty</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              {review ? (
                <ProductReview review={review} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews available for this product yet.</p>
                  <button className="mt-4 btn btn-outline-primary">Be the first to review</button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'priceHistory' && (
            <div>
              <PriceTracker 
                productId={product.id} 
                productName={product.title} 
                currentPrice={product.price} 
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://source.unsplash.com/300x300/?${encodeURIComponent(relatedProduct.title)}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">{relatedProduct.title}</h3>
                    <p className="text-primary font-bold">₹{relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 