import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "เสื้อยืด Premium Cotton Black",
      price: 890,
      image: 'HomeBlackTshirt1.png',
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "เสื้อยืด Premium Cotton Green",
      price: 950,
      image: 'HomeGreenTshirt1.png',
      category: "T-Shirts"
    },
    {
      id: 3,
      name: "เสื้อยืด Premium Cotton Pastel",
      price: 790,
      image: 'HomePastelTshirt1.png',
      category: "T-Shirts"
    },
    {
      id: 4,
      name: "เสื้อยืด Premium Cotton Purple",
      price: 490,
      image: 'HomePurpleTshirt1.png',
      category: "T-Shirts"
    },
    {
      id: 5,
      name: "เสื้อยืด Premium Cotton White",
      price: 1290,
      image: 'HomeWhiteTshirt1.png',
      category: "T-Shirts"
    },
    {
      id: 6,
      name: "เสื้อยืด Premium Cotton Red",
      price: 890,
      image: 'HomeRedTshirt1.png',
      category: "T-Shirts"
    }
  ];

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Please select
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            // แสดงสินค้าจริง
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            // แสดง Skeleton ถ้ายังไม่มีข้อมูล
            [...Array(6)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-3 shadow-xs hover:shadow-xl transition-all duration-300 animate-pulse"
              >
                <div className="aspect-square w-full bg-gray-200 rounded-xl mb-4" />
                <div className="space-y-3 px-1">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-gray-200 rounded w-1/4" />
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;