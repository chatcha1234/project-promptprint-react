import React from "react";

const About = () => {
  return (
    <main className="w-full min-h-dvn mt-20 max-md:mt-40 ">
      {/* เนื้อหาเกี่ยวกับprojectที่ทำ */}
      <section className=" w-full min-h-screen grid grid-cols-4 rows-4 gap-4 max-md:flex flex-col">
        <div className="col-span-2 row-span-4 flex flex-col justify-between  bg-white p-6 rounded-4xl shadow-sm mt-4 ">
          <h1 className="mt-6 font-bold text-8xl text-shadow-lg text-shadow-gray-500 max-md:text-4xl max-md:my-4 ">
            Pronpt Print Shop
          </h1>
          <p className="font-light text-2xl text-balance  max-md:text-[20px] ">
            At Prompt Print Shop, imagination has no limits. We seamlessly blend
            Prompt Engineering with your creative vision. By producing every
            item on-demand, we prioritize sustainability and eliminate
            unnecessary waste. You don't just buy a product; you realize a
            dream. You provide the idea; we provide the craftsmanship to make it
            perfect.
          </p>
        </div>
        <div className="flex flex-col col-start-3 col-span-2 row-start-1 row-span-3  bg-[url(/about-bg.png)] bg-no-repeat bg-cover bg-center rounded-4xl mt-4">
          <div className="h-2/5 flex items-center justify-center ">
            <h2 className=" text-gray-100 text-center font-bold text-8xl text-shadow-lg text-shadow-black max-md:text-6xl">
              Products
            </h2>
          </div>
          <div className="h-3/5 w-full flex gap-2 justify-center items-center max-md: flex-wrap ">
            <img
              src="/products1.png"
              alt="hoodie"
              className="w-60 h-[85%]  hover:scale-110"
            />
            <img
              src="/products2.png"
              alt="hoodie"
              className="w-60 h-[85%]  hover:scale-110"
            />
            <img
              src="/products3.png"
              alt="hoodie"
              className="w-60 h-[85%]  hover:scale-110"
            />
          </div>
        </div>
        <div className="col-start-3 col-span-2 row-start-4 row-span-1  bg-white  rounded-4xl shadow-sm max-md:h-auto w-full ">
          <div className="w-full h-full flex justify-evenly items-center ">
            <h2 className="text-6xl font-bold text-shadow-lg text-shadow-gray-500 max-md:text-4xl">
              Development team
            </h2>
          </div>
        </div>
      </section>
      {/* ข้อมูลของเกี่ยวกับทีม */}
      <section className=" w-full min-h-screen flex flex-col">
        <div className=" bg-[url(/about-bg.png)] bg-no-repeat bg-cover bg-center shadow-md w-full h-auto py-4  my-4 rounded-4xl flex justify-center items-center gap-4 flex-wrap ">
          <div className="w-70 h-100 bg-white shadow-xl rounded-4xl flex flex-col justify-evenly items-center">
            <img
              src=""
              alt=""
              className="bg-white rounded-full h-50 w-50 border border-gray-500"
            />
            <h2>07_Chatchawan(Chut/ชัด)</h2>
            <p>L:</p>
          </div>
          <div className="w-70 h-100 bg-white shadow-xl rounded-4xl flex flex-col justify-evenly items-center ">
            <img
              src=""
              alt=""
              className="bg-white rounded-full h-50 w-50 border border-gray-500"
            />
            <h2>15_Kamolthep (Mik / มิก)</h2>
            <p>L:</p>
          </div>
          <div className="w-70 h-100 bg-white shadow-xl rounded-4xl flex flex-col justify-evenly items-center ">
            <img
              src=""
              alt=""
              className="bg-white rounded-full h-50 w-50 border border-gray-500"
            />
            <h2>16_krittiphong(krit/กฤษ)</h2>
            <p>L:</p>
          </div>
          <div className="w-70 h-100 bg-white shadow-xl rounded-4xl flex flex-col justify-evenly items-center ">
            <img
              src=""
              alt=""
              className="bg-white rounded-full h-50 w-50 border border-gray-500"
            />
            <h2>20_Mullika(Ying/หญิง)</h2>
            <p>L:</p>
          </div>
          <div className="w-70 h-100 bg-white shadow-xl rounded-4xl flex flex-col justify-evenly items-center ">
            <img
              src=""
              alt=""
              className="bg-white rounded-full h-50 w-50 border border-gray-500"
            />
            <h2>37_Sirirat (Juang/จวง)</h2>
            <p>L:</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;