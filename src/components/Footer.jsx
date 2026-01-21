import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 group cursor-pointer w-fit transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-blue-200 transition-all">
                P
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Prompt<span className="text-blue-600">Print</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering creators to bring their wildest designs to life on
              premium quality products.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <FooterLink to="/category/men">Men's Apparel</FooterLink>
              <FooterLink to="/category/women">Women's Apparel</FooterLink>
              <FooterLink to="/category/kids">Kids & Baby</FooterLink>
              <FooterLink to="/category/accessories">Accessories</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <FooterLink to="/track-order">Track Order</FooterLink>
              <FooterLink to="/shipping">Shipping Info</FooterLink>
              <FooterLink to="/returns">Returns & Exchanges</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Join our newsletter</h3>
            <p className="text-slate-500 text-sm">Get the latest updates, design inspiration and exclusive offers.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send size={16} />
              </button>
            </div>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone size={14} />
                </div>
                <span>+66 (55) 555-5555</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail size={14} />
                </div>
                <span>support@promptprint.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400 order-2 md:order-1">
            © {new Date().getFullYear()} PromptPrint. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-400 order-1 md:order-2">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Link Component
const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="hover:text-blue-600 transition-colors flex items-center group cursor-pointer"
    >
      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-600 mr-0 group-hover:mr-2 transition-all"></span>
      {children}
    </Link>
  </li>
);

// Reusable Social Icon Component
const SocialIcon = ({ icon }) => (
  <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 cursor-pointer">
    {icon}
  </button>
);

export default Footer;