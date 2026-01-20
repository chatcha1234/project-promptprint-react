import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-4/5 bg-gray-100 overflow-hidden">
        <Link to={`/design/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </Link>

        {/* badges */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            NEW
          </span>
        )}
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            -{product.discount}%
          </span>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ฿{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex text-yellow-500 text-xs">{"★".repeat(5)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
