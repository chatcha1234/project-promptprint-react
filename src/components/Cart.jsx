import React from "react";

function Cart({ item, updateQty }) {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* <!-- item it one --> */}
      <div className="w-full bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-6 items-center">
        {/* checkbox  */}
        <button>
          <input className="w-4 h-4" type="checkbox" />
        </button>
        <div className="w-24 h-24 bg-gray-100 rounded-xl  max-md:h-20 ">
          <img src={`${item.url}`} alt="product" className="h-full w-full" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg">{item.name}</h3>
            {/* ราคารวม */}
            <span className="font-bold text-lg">
              {item.price * item.quantity}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{`${item.size} | ${item.color}`}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
              <button
                className="px-3 py-1 hover:bg-gray-200 rounded-l-lg"
                onClick={() => updateQty(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="px-3 py-1 font-medium text-sm">
                {item.quantity}
              </span>
              <button
                className="px-3 py-1 hover:bg-gray-200 rounded-r-lg"
                onClick={() => updateQty(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            {/* add contact request api for deletion  */}
            <button className="text-sm text-gray-400 hover:text-red-500 underline">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;