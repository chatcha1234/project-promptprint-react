import React from "react";

function SummaryOrder({ totalPrice }) {
  const Tax = Math.floor(totalPrice * 0.07);
  const Shipping = 50;
  const Total = totalPrice + Tax + Shipping;
  return (
    <div className="w-full">
      {/* <!-- Summary (Right) --> */}
      <div className="w-full max-md:w-auto">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
          <h2 className="font-bold text-xl mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{`฿${Shipping}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (7%)</span>
              <span>{Tax}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl">{Total}</span>
          </div>

          <a
            href="checkout.html"
            className="block w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-center text-lg shadow-lg hover:bg-gray-800 transition-transform hover:scale-[1.02]"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}

export default SummaryOrder;