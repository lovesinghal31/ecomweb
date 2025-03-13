import { useState, useEffect } from 'react';
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaCog, FaHeart, FaFileInvoiceDollar, FaStar, FaPaypal, FaCcVisa, FaCcMastercard, FaCcAmex, FaGooglePay } from 'react-icons/fa';
import { useReviews } from '../context/ReviewContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import ProductReview from './ProductReview';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');
  const { reviews, isLoading: isLoadingReviews, error: reviewError, loadReviews } = useReviews();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const location = useLocation();

  // Mock data for demonstration
  const orders = [
    { id: '#ORD-2023-1001', date: '2023-05-15', status: 'Delivered', total: 4599 },
    { id: '#ORD-2023-0892', date: '2023-04-28', status: 'Delivered', total: 2199 },
    { id: '#ORD-2023-0765', date: '2023-03-12', status: 'Delivered', total: 3299 }
  ];

  const addresses = [
    { id: 1, type: 'Home', name: 'John Doe', address: '123 Main Street, Apartment 4B', city: 'Bangalore', state: 'Karnataka', pincode: '560001', phone: '+91 9876543210', isDefault: true },
    { id: 2, type: 'Office', name: 'John Doe', address: '456 Business Park, Building C', city: 'Bangalore', state: 'Karnataka', pincode: '560008', phone: '+91 9876543210', isDefault: false }
  ];

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '05/25', name: 'John Doe', isDefault: true, brand: 'visa' },
    { id: 2, type: 'UPI', id: 'johndoe@upi', name: 'John Doe', isDefault: false, brand: 'googlepay' }
  ];

  const billingMethods = [
    { id: 1, type: 'Personal', name: 'John Doe', address: '123 Main Street, Apartment 4B', city: 'Bangalore', state: 'Karnataka', pincode: '560001', gstin: '', isDefault: true },
    { id: 2, type: 'Business', name: 'Acme Corp', address: '456 Business Park, Building C', city: 'Bangalore', state: 'Karnataka', pincode: '560008', gstin: 'GSTIN29ABCDE1234F1Z5', isDefault: false }
  ];

  // Set active tab based on URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['orders', 'wishlist', 'addresses', 'payment', 'billing', 'reviews', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  // Fetch product reviews when the reviews tab is activated
  useEffect(() => {
    if (activeTab === 'reviews') {
      loadReviews();
    }
  }, [activeTab, loadReviews]);

  // Handle view full reviews click
  const handleViewFullReviews = (reviewId) => {
    // In a real app, this might open a modal with more detailed reviews
    // or navigate to a dedicated reviews page
    console.log(`View full reviews for product ID: ${reviewId}`);
    window.alert(`This would open the full reviews for product ID: ${reviewId}`);
  };

  // Wishlist Tab
  const renderWishlistItem = (item) => {
    return (
      <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={item.image} 
            alt={item.title || item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/300x300/?${encodeURIComponent(item.title || item.name)}`;
            }}
          />
          <button 
            onClick={() => removeFromWishlist(item)}
            className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 p-1.5 rounded-full shadow-sm hover:shadow-md transition-all"
            aria-label="Remove from wishlist"
          >
            <FaHeart className="text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-1">{item.title || item.name}</h4>
          <p className="text-primary font-bold mb-3">₹{item.price.toFixed(2)}</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => addItem(item)}
              className="btn btn-primary flex-grow py-2"
            >
              Add to Cart
            </button>
            <Link 
              to={`/product/${item.id}`}
              className="btn btn-outline-primary py-2 px-3"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
        My Account
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FaUser className="text-primary text-xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaShoppingBag className={`${activeTab === 'orders' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>My Orders</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'addresses' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaMapMarkerAlt className={`${activeTab === 'addresses' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Addresses</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'payment' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaCreditCard className={`${activeTab === 'payment' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Payment Methods</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('billing')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'billing' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaFileInvoiceDollar className={`${activeTab === 'billing' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Billing Information</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'reviews' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaStar className={`${activeTab === 'reviews' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Product Reviews</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'wishlist' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaHeart className={`${activeTab === 'wishlist' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Wishlist</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center p-3 rounded-md transition-colors ${
                      activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <FaCog className={`${activeTab === 'settings' ? 'text-white' : 'text-primary'} mr-3`} />
                    <span>Account Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">My Orders</h3>
                {orders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-primary hover:text-primary-dark">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <button className="mt-4 btn btn-primary">Start Shopping</button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">My Addresses</h3>
                  <button className="btn btn-primary">Add New Address</button>
                </div>
                
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className={`border rounded-lg p-4 relative transition-all hover:shadow-md ${address.isDefault ? 'border-primary border-2' : ''}`}>
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <FaMapMarkerAlt className="text-primary" />
                            </div>
                            <h4 className="font-medium text-lg">{address.type}</h4>
                            {address.isDefault && (
                              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-primary transition-colors">
                              <span className="sr-only">Edit</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button className="text-gray-500 hover:text-red-500 transition-colors">
                              <span className="sr-only">Delete</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-gray-700 font-medium">{address.name}</p>
                          <p className="text-gray-600 text-sm">{address.address}</p>
                          <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.pincode}</p>
                          <p className="text-gray-600 mt-2 text-sm">Phone: {address.phone}</p>
                        </div>
                        {!address.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaMapMarkerAlt className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 mb-4">You haven't added any addresses yet.</p>
                    <button className="btn btn-primary">Add Address</button>
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Payment Methods</h3>
                  <button className="btn btn-primary">Add Payment Method</button>
                </div>
                
                {paymentMethods.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className={`border rounded-lg p-4 relative transition-all hover:shadow-md ${method.isDefault ? 'border-primary border-2' : ''}`}>
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            {method.type === 'Credit Card' && (
                              <div className="w-12 h-8 mr-3 flex items-center justify-center">
                                {method.brand === 'visa' && <FaCcVisa className="text-blue-700 text-3xl" />}
                                {method.brand === 'mastercard' && <FaCcMastercard className="text-red-600 text-3xl" />}
                                {method.brand === 'amex' && <FaCcAmex className="text-blue-500 text-3xl" />}
                                {!['visa', 'mastercard', 'amex'].includes(method.brand) && <FaCreditCard className="text-gray-600 text-3xl" />}
                              </div>
                            )}
                            {method.type === 'UPI' && (
                              <div className="w-12 h-8 mr-3 flex items-center justify-center">
                                {method.brand === 'googlepay' && <FaGooglePay className="text-gray-700 text-3xl" />}
                                {method.brand === 'paypal' && <FaPaypal className="text-blue-600 text-3xl" />}
                                {!['googlepay', 'paypal'].includes(method.brand) && <FaCreditCard className="text-gray-600 text-3xl" />}
                              </div>
                            )}
                            <h4 className="font-medium text-lg">{method.type}</h4>
                            {method.isDefault && (
                              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-red-500 transition-colors">
                              <span className="sr-only">Delete</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          {method.type === 'Credit Card' ? (
                            <>
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-5 bg-gray-200 rounded mr-2"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded mr-2"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded mr-2"></div>
                                <div className="w-8 h-5 bg-gray-300 rounded flex items-center justify-center text-xs font-mono">{method.last4}</div>
                              </div>
                              <p className="text-gray-600 text-sm">Expires: {method.expiry}</p>
                            </>
                          ) : (
                            <p className="text-gray-600 font-mono">{method.id}</p>
                          )}
                          <p className="text-gray-600 mt-2 text-sm">{method.name}</p>
                        </div>
                        {!method.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCreditCard className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 mb-4">You haven't added any payment methods yet.</p>
                    <button className="btn btn-primary">Add Payment Method</button>
                  </div>
                )}
              </div>
            )}

            {/* Billing Methods Tab */}
            {activeTab === 'billing' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Billing Information</h3>
                  <button className="btn btn-primary">Add Billing Information</button>
                </div>
                
                {billingMethods.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {billingMethods.map((method) => (
                      <div key={method.id} className={`border rounded-lg p-4 relative transition-all hover:shadow-md ${method.isDefault ? 'border-primary border-2' : ''}`}>
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <FaFileInvoiceDollar className="text-primary" />
                            </div>
                            <h4 className="font-medium text-lg">{method.type}</h4>
                            {method.isDefault && (
                              <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-primary transition-colors">
                              <span className="sr-only">Edit</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button className="text-gray-500 hover:text-red-500 transition-colors">
                              <span className="sr-only">Delete</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-gray-700 font-medium">{method.name}</p>
                          <p className="text-gray-600 text-sm">{method.address}</p>
                          <p className="text-gray-600 text-sm">{method.city}, {method.state} {method.pincode}</p>
                          {method.gstin && (
                            <p className="text-gray-600 mt-2 text-sm font-mono">GSTIN: {method.gstin}</p>
                          )}
                        </div>
                        {!method.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaFileInvoiceDollar className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 mb-4">You haven't added any billing information yet.</p>
                    <button className="btn btn-primary">Add Billing Information</button>
                  </div>
                )}
              </div>
            )}

            {/* Product Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Product Reviews</h3>
                  <div className="text-sm text-gray-500">
                    Reviews from Amazon, Flipkart, and other platforms
                  </div>
                </div>
                
                {isLoadingReviews ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : reviewError ? (
                  <div className="text-center py-8">
                    <p className="text-red-500">{reviewError}</p>
                    <button 
                      onClick={() => loadReviews(true)} 
                      className="mt-4 btn btn-primary"
                    >
                      Try Again
                    </button>
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-8">
                    {reviews.map((review) => (
                      <ProductReview 
                        key={review.id} 
                        review={review} 
                        onViewFullReviews={handleViewFullReviews}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No product reviews available.</p>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">My Wishlist</h3>
                
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(renderWishlistItem)}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
                    <Link to="/shop" className="btn btn-primary">Explore Products</Link>
                  </div>
                )}
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-lg font-medium mb-4">Personal Information</h4>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            defaultValue="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            defaultValue="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          defaultValue="+91 9876543210"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                  </div>
                  
                  {/* Change Password */}
                  <div className="pt-6 border-t">
                    <h4 className="text-lg font-medium mb-4">Change Password</h4>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Update Password</button>
                    </form>
                  </div>
                  
                  {/* Notification Preferences */}
                  <div className="pt-6 border-t">
                    <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Order Updates</h5>
                          <p className="text-sm text-gray-500">Receive updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Promotions</h5>
                          <p className="text-sm text-gray-500">Receive emails about promotions and discounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Newsletter</h5>
                          <p className="text-sm text-gray-500">Receive our weekly newsletter</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                    <button className="mt-4 btn btn-primary">Save Preferences</button>
                  </div>
                  
                  {/* Delete Account */}
                  <div className="pt-6 border-t">
                    <h4 className="text-lg font-medium mb-4 text-red-600">Delete Account</h4>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="btn btn-danger">Delete My Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 