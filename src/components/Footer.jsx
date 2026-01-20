import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                PromptPrint
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering creators to bring their wildest designs to life on
              premium quality products.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Youtube className="w-4 h-4" />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="/category/men"
                  className="hover:text-blue-600 transition-colors"
                >
                  Men's Apparel
                </Link>
              </li>
              <li>
                <Link
                  to="/category/women"
                  className="hover:text-blue-600 transition-colors"
                >
                  Women's Apparel
                </Link>
              </li>
              <li>
                <Link
                  to="/category/kids"
                  className="hover:text-blue-600 transition-colors"
                >
                  Kids & Baby
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="hover:text-blue-600 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-blue-600 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-blue-600 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-blue-600 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-blue-600 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="hover:text-blue-600 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <span>123 Design Street, Creative Valley, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <span>support@promptprint.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} PromptPrint. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
    {icon}
  </button>
);

export default Footer;
