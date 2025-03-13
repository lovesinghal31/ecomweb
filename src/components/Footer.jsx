export default function Footer() {
    return (
      <footer className="bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-dark w-fit">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Discounted</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Clearance</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-dark w-fit">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-dark w-fit">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Order Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-primary-dark w-fit">Contact Us</h3>
              <ul className="space-y-2">
                <li><a href="mailto:info@shopeasy.com" className="text-gray-300 hover:text-primary transition-colors">info@shopeasy.com</a></li>
                <li><a href="tel:+1234567890" className="text-gray-300 hover:text-primary transition-colors">+1 (234) 567-890</a></li>
                <li><span className="text-gray-300">123 Shopping St, Commerce City</span></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-secondary-light text-center">
            <p className="text-gray-400">© 2025 ShopEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }