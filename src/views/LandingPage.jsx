import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  
   return (
    <div className="min-h-screen bg-gray-100">
      {/* ==================== HERO SECTION ==================== */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center rounded"          style={{
            backgroundImage: 'url(/CommitTeam.png)',
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          {/* Header Text */}
          <div className="text-center mb-8 space-y-2">
            <p className="text-sm md:text-base font-light tracking-wider animate-fade-in">
              เราพร้อมปริ๊นสกรีนเสื้อด่วน ไม่มีขั้นต่ำ ส่งเลย เร็ว!!
            </p>
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              สกรีนพร้อมเสื้อยืด เริ่มต้นราคา 200 บาท
            </h1>
            <p className="text-2xl md:text-4xl lg:text-5xl font-semibold mt-6">
              AI ช่วยออกแบบได้ง่ายๆ ในไม่กี่นาที
            </p>
          </div>

          {/* Call-to-Action Button */}
         <button className="mt-3 py-4 px-12 bg-blue-400 font-medium rounded-xl transition-colors">
            <Link
                to="login"
                className="hidden lg:block text-lg font-medium text-white hover:text-violet-500 transition-colors"
              >
                เริ่มออกแบบ
            </Link>

            
          </button>



        </div>
      </div>

      {/* ==================== FEATURES SECTION ==================== */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 - Design */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">ออกแบบง่าย</h3>
            <p className="text-gray-600">
              ระบบออกแบบที่ใช้งานง่าย<br />
              ทำเองได้ทันที ไม่ต้องมีความรู้ด้านดีไซน์
            </p>
          </div>

          {/* Feature 2 - Speed */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">ส่งไว</h3>
            <p className="text-gray-600">
              ผลิตและจัดส่งรวดเร็ว<br />
              ได้ของภายใน 3-5 วันทำการ
            </p>
          </div>

          {/* Feature 3 - Price */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">ราคาประหยัด</h3>
            <p className="text-gray-600">
              เริ่มต้นเพียง 200 บาท<br />
              คุณภาพดี ราคาย่อมเยา
            </p>
          </div>
        </div>
      </div>

      {/* ==================== POPULAR PRODUCTS SECTION ==================== */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            สินค้าราคาพิเศษพร้อมสกรีน
          </h2>
          <p className="text-center text-gray-600 mb-12">
            เสื้อยืดสกรีนคุณภาพสูง ดีไซน์สวย ราคาประหยัด
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 1, name: 'TC คอกลม สีขาว', price: '250', image: 'White-Disc.png' },
              { id: 2, name: 'TC คอกลม สีดำ', price: '250', image: 'Black-Disc.png' },
              { id: 3, name: 'เสื้อยืด Oversized', price: '290', image: 'Red-Oversize.png' },
              { id: 4, name: 'เสื้อคู่ สกรีน', price: '350', image: 'Couple.png' },
            ].map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
    >
      <div className="h-48 md:h-64 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
        <img 
          src={`/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-bold mb-2 text-gray-800">{product.name}</h4>
        <p className="text-red-600 font-bold text-lg">฿{product.price}</p>
        <button className="mt-3 w-full bg-blue-400 font-medium py-2 rounded-xl transition-colors">
             <Link
                to="login"
                className="hidden lg:block text-sm font-medium text-white hover:text-violet-500 transition-colors"
              >
                ดูรายละเอียด
              </Link>
        </button>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>

      {/* ==================== TESTIMONIALS SECTION (Optional) ==================== */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          รีวิวจากลูกค้า
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Mix, Netherland', rating: 5, comment: 'คุณภาพดีมาก ราคาไม่แพง จัดส่งรวดเร็ว' },
            { name: 'Juang, Bankgok', rating: 5, comment: 'ออกแบบง่าย ได้เสื้อสวยตามใจ' },
            { name: 'Ying, Prathumthani', rating: 5, comment: 'บริการดี แอดมินตอบเร็ว ประทับใจมาก' },
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
              <p className="font-bold text-gray-800">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LandingPage;