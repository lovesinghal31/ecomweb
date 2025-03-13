import { useState, useEffect } from 'react';
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaCog, FaHeart, FaFileInvoiceDollar, FaStar } from 'react-icons/fa';
import { useReviews } from '../context/ReviewContext';
import ProductReview from './ProductReview';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');
  const { reviews, isLoading: isLoadingReviews, error: reviewError, loadReviews } = useReviews();

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
    { id: 1, type: 'Credit Card', last4: '4242', expiry: '05/25', name: 'John Doe', isDefault: true },
    { id: 2, type: 'UPI', id: 'johndoe@upi', name: 'John Doe', isDefault: false }
  ];

  const billingMethods = [
    { id: 1, type: 'Personal', name: 'John Doe', address: '123 Main Street, Apartment 4B', city: 'Bangalore', state: 'Karnataka', pincode: '560001', gstin: '', isDefault: true },
    { id: 2, type: 'Business', name: 'Acme Corp', address: '456 Business Park, Building C', city: 'Bangalore', state: 'Karnataka', pincode: '560008', gstin: 'GSTIN29ABCDE1234F1Z5', isDefault: false }
  ];

  const wishlist = [
    { id: 1, name: 'Wireless Bluetooth Headphones', price: 2499, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Smart Fitness Tracker', price: 1799, image: '/path/to/image2.jpg' }
  ];

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
          {item.image && item.image.startsWith('/path/to/') ? (
            // Fallback for placeholder images
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{item.name}</span>
              </div>
            </div>
          ) : (
            <img 
              src={item.image || `https://source.unsplash.com/300x300/?${encodeURIComponent(item.name)}`} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://source.unsplash.com/300x300/?${encodeURIComponent(item.name)}`;
              }}
            />
          )}
          <button className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-all">
            <FaHeart className="text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
          <p className="text-primary font-bold mb-3">₹{item.price.toFixed(2)}</p>
          <div className="flex space-x-2">
            <button className="btn btn-primary flex-grow py-2">Add to Cart</button>
            <button className="btn btn-outline-primary py-2 px-3">
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
        My Account
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                      <div key={address.id} className="border rounded-lg p-4 relative">
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                        )}
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{address.type}</h4>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-primary">Edit</button>
                            <button className="text-gray-500 hover:text-red-500">Delete</button>
                          </div>
                        </div>
                        <p className="text-gray-700">{address.name}</p>
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.pincode}</p>
                        <p className="text-gray-600 mt-2">Phone: {address.phone}</p>
                        {!address.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark">Set as Default</button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't added any addresses yet.</p>
                    <button className="mt-4 btn btn-primary">Add Address</button>
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
                      <div key={method.id} className="border rounded-lg p-4 relative">
                        {method.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                        )}
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{method.type}</h4>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-red-500">Delete</button>
                          </div>
                        </div>
                        {method.type === 'Credit Card' ? (
                          <>
                            <p className="text-gray-600">•••• •••• •••• {method.last4}</p>
                            <p className="text-gray-600">Expires: {method.expiry}</p>
                          </>
                        ) : (
                          <p className="text-gray-600">{method.id}</p>
                        )}
                        <p className="text-gray-600 mt-1">{method.name}</p>
                        {!method.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark">Set as Default</button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't added any payment methods yet.</p>
                    <button className="mt-4 btn btn-primary">Add Payment Method</button>
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
                      <div key={method.id} className="border rounded-lg p-4 relative">
                        {method.isDefault && (
                          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">Default</span>
                        )}
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{method.type}</h4>
                          <div className="flex space-x-2">
                            <button className="text-gray-500 hover:text-primary">Edit</button>
                            <button className="text-gray-500 hover:text-red-500">Delete</button>
                          </div>
                        </div>
                        <p className="text-gray-700">{method.name}</p>
                        <p className="text-gray-600">{method.address}</p>
                        <p className="text-gray-600">{method.city}, {method.state} {method.pincode}</p>
                        {method.gstin && (
                          <p className="text-gray-600 mt-2">GSTIN: {method.gstin}</p>
                        )}
                        {!method.isDefault && (
                          <button className="mt-3 text-sm text-primary hover:text-primary-dark">Set as Default</button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't added any billing information yet.</p>
                    <button className="mt-4 btn btn-primary">Add Billing Information</button>
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
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(renderWishlistItem)}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your wishlist is empty.</p>
                    <button className="mt-4 btn btn-primary">Explore Products</button>
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
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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