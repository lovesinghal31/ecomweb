import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import AIChatbot from './components/AIChatbot';
import FAQ from './components/FAQ';
import { ReviewProvider } from './context/ReviewContext';
import { WishlistProvider } from './context/WishlistContext';

// ScrollToTop component to handle scrolling to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <ReviewProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
                        Featured Products
                      </h2>
                      <ProductGrid />
                    </div>
                  </>
                } />
                <Route path="/shop" element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
                      All Products
                    </h2>
                    <ProductGrid />
                  </div>
                } />
                <Route path="/categories" element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
                      Categories
                    </h2>
                    <p className="text-lg text-gray-700 mb-8">Browse our wide range of product categories to find exactly what you need.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {/* Electronics Category */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6 text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Electronics</h3>
                          <p className="text-gray-600 mb-4">Discover the latest gadgets and electronic devices.</p>
                          <Link to="/shop" className="text-primary hover:text-primary-dark font-medium">Browse Electronics</Link>
                        </div>
                      </div>
                      
                      {/* Wearables Category */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6 text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Wearables</h3>
                          <p className="text-gray-600 mb-4">Smart watches and fitness trackers for an active lifestyle.</p>
                          <Link to="/shop" className="text-primary hover:text-primary-dark font-medium">Browse Wearables</Link>
                        </div>
                      </div>
                      
                      {/* Clothing Category */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6 text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Clothing</h3>
                          <p className="text-gray-600 mb-4">Stylish and comfortable clothing for all occasions.</p>
                          <Link to="/shop" className="text-primary hover:text-primary-dark font-medium">Browse Clothing</Link>
                        </div>
                      </div>
                      
                      {/* Home & Kitchen Category */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6 text-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Home & Kitchen</h3>
                          <p className="text-gray-600 mb-4">Everything you need to make your house a home.</p>
                          <Link to="/shop" className="text-primary hover:text-primary-dark font-medium">Browse Home & Kitchen</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                } />
                <Route path="/about" element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
                      About Us
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                      <div className='bg-gray-100 rounded-lg p-8'>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h3>
                        <p className="text-lg text-gray-700 mb-4">
                          Founded in 2025, ShopEasy began with a simple mission: to make online shopping truly easy and enjoyable for everyone.
                        </p>
                        <p className="text-lg text-gray-700">
                          Our journey has been driven by our passion for connecting people with high-quality products at competitive prices, while providing an exceptional shopping experience from browse to delivery.
                        </p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h3>
                        <p className="text-lg text-gray-700 mb-4">
                          At ShopEasy, our mission is to revolutionize online shopping by creating a platform that is:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                          <li>Intuitive and easy to navigate</li>
                          <li>Transparent in pricing and policies</li>
                          <li>Committed to quality and customer satisfaction</li>
                          <li>Accessible to shoppers of all technical abilities</li>
                        </ul>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Our Values</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-2 text-gray-800">Trust</h4>
                        <p className="text-gray-600">We build trust through transparency, reliability, and consistently delivering on our promises.</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-2 text-gray-800">Innovation</h4>
                        <p className="text-gray-600">We continuously improve our platform and services to meet evolving customer needs.</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-2 text-gray-800">Community</h4>
                        <p className="text-gray-600">We value our customers and suppliers as part of our extended family and community.</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-medium mb-2 text-gray-800">Sustainability</h4>
                        <p className="text-gray-600">We're committed to environmentally responsible practices throughout our operations.</p>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 p-8 rounded-lg">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Join Our Journey</h3>
                      <p className="text-lg text-gray-700 mb-4">
                        We're always looking for passionate individuals to join our team. If you're excited about creating exceptional shopping experiences, check out our careers page or get in touch with us.
                      </p>
                      <Link to="/contact" className="btn btn-primary inline-block">Contact Us</Link>
                    </div>
                  </div>
                } />
                <Route path="/contact" element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary w-fit">
                      Contact Us
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Contact Information */}
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Get In Touch</h3>
                        <p className="text-lg text-gray-700 mb-8">
                          We'd love to hear from you! Whether you have a question about our products, need help with an order, or want to provide feedback, our team is here to assist you.
                        </p>
                        
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium text-gray-800">Email</h4>
                              <p className="mt-1 text-gray-600">support@shopeasy.com</p>
                              <p className="mt-1 text-gray-600">For business inquiries: business@shopeasy.com</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                              <p className="mt-1 text-gray-600">Customer Support: +91 1800-123-4567</p>
                              <p className="mt-1 text-gray-600">Hours: Monday-Friday, 9am-6pm IST</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-lg font-medium text-gray-800">Address</h4>
                              <p className="mt-1 text-gray-600">
                                C-12 Satguru Boys Hostel<br />
                                Khandwa Naka<br />
                                Indore, MP 452001<br />
                                India
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h4 className="text-lg font-medium text-gray-800 mb-4">Connect With Us</h4>
                          <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                              </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Form */}
                      <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
                        <form className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Your email"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                              type="text"
                              id="subject"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Subject of your message"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                              id="message"
                              rows="5"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                              placeholder="Your message"
                            ></textarea>
                          </div>
                          
                          <button
                            type="submit"
                            className="btn btn-primary w-full py-3"
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>
                    
                    {/* FAQ Section */}
                    <FAQ />
                  </div>
                } />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
              </Routes>
            </main>
            <Footer />
            <AIChatbot />
          </div>
          {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
        </Router>
      </WishlistProvider>
    </ReviewProvider>
  );
}

export default App;