import React, { useState } from "react";
import Cart from "../components/Cart.jsx";
import { dataTerst } from "../data/dataTest.js";
import SummaryOrder from "../components/SummaryOrder.jsx";
const UserCart = () => {
  const [items, setItems] = useState(dataTerst);

  // อัพเดตจำนวนของสินค้า
  const updateQty = (id, newQty) => {
    if (newQty < 1) return; // ป้องกันจำนวนติดลบ
    // เรียกใช้ setItems เป็นการอัพเดตค่าitems แต่ไม่ได้เป็นการอัพเดตในไฟล์ dataTerst
    setItems((newItems) =>
      newItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };


  // ยอดรวมเฉพาะสินค้าไม่รวมtax
  const grandTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <main className="w-full flex flex-col gap-8 container  my-20  px-2 py-12 max-md:mt-35 max-md:mx-0 ">
      <div className="flex items-center justify-between">
        <h1 class="text-3xl font-bold ml-2 ">My Cart</h1>
        <p className="mr-2 text-gray-600 ">{`(${items.length} items)`}</p>
      </div>

      <div className="flex flex-col gap-2 w-full ">
        {items.map((item) => (
          <Cart key={item.id} item={item} updateQty={updateQty} />
        ))}
      </div>
      <div className=" w-full ">
        <SummaryOrder totalPrice={grandTotal} />
      </div>
    </main>
  );
};

export default UserCart;