import React from 'react'

const Faqs = () => {
  return (
    <maim className="w-full min-h-screen mt-25 bg-purple-200 shadow-md rounded-lg flex flex-col justify-center items-center gap-1 max-md:mt-35">
      <header className="w-1/2 h-auto flex flex-col items-start gap-1  max-md:w-full">
        <h1 className="font-bold text-2xl">FAQ</h1>
        <p className="font-medium text-lg">How can we help you?</p>
      </header>
      <section className="w-1/2 h-160 bg-gray-100 rounded-lg flex flex-col gap-2.5 justify-center items-center max-md:w-full">
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">ลืมรหัสผ่านต้องทำอย่างไร?</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">สมัครใหม่เลยครับ</p>
        </div>
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">ระยะเวลาในการจัดส่ง?</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">7-14วันโดยประมาณครับ</p>
        </div>
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">ทุกวันนี้ Dev ใช้"AIเขียนโค้ด"กันหมดแล้วหรอครับ</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">ก็ยังเห็นใช้เมาส์กับคีย์บอร์ดอยู่นะครับ</p>
        </div>
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">ทำไมต้องใส่โค้ดบรรทัดนี้ครับ?</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">นั้นสิครับรู้แต่ถ้าไม่ใส่มันรันไม่ได้</p>
        </div>
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">นั่งเขียนโค้ดนานแล้ว"ปวดหลัง"ทำไงดีครับ?</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">ยืนเขียนครับ</p>
        </div>
        <div className="group w-[90%] h-23.75 bg-gray-300 rounded-lg flex flex-col justify-evenly shadow-md">
          <p className="font-medium text-xl ml-4">คุณมีอะไรที่ผมไม่มีบ้าง?</p>
          <p className="font-medium text-xl ml-4 opacity-0 group-hover:opacity-100 transition-opacity">ผมมี Requrirements ใหม่ที่ยังไม่เคยพูดถึงครับ</p>
        </div>
      </section>
    </maim>
  )
}

export default Faqs