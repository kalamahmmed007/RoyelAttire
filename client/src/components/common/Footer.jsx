import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">ShopHub</h3>
            <p className="mb-4 text-sm">
              Your trusted online marketplace for quality products at great prices. Shop with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="transition-colors hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-white">About Us</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Shop</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-white">Help Center</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Track Order</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Returns</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Commerce Street, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="mx-auto max-w-md text-center">
            <h4 className="mb-2 font-semibold text-white">Subscribe to Our Newsletter</h4>
            <p className="mb-4 text-sm">Get the latest updates on new products and exclusive offers!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
              <button className="rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="mb-4 text-center">
            <h5 className="mb-3 text-sm font-semibold text-white">We Accept</h5>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="rounded bg-white px-3 py-2 text-xs font-semibold text-gray-800">VISA</div>
              <div className="rounded bg-white px-3 py-2 text-xs font-semibold text-gray-800">MASTERCARD</div>
              <div className="rounded bg-white px-3 py-2 text-xs font-semibold text-gray-800">AMEX</div>
              <div className="rounded bg-white px-3 py-2 text-xs font-semibold text-gray-800">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <p>&copy; 2026 ShopHub. All rights reserved.</p>
            <div className="mt-2 flex gap-6 md:mt-0">
              <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;