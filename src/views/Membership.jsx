export default function Membership() {
  return (
    <div className="flex flex-col max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">ข้อมูลส่วนตัว</h2>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="flex text-sm font-medium">ชื่อ-นามสกุล</label>
          <input
            type="text"
            value="aaa bbb"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg mb-4"
            disabled
          />
        
          <label className="flex text-sm font-medium">อีเมล</label>
          <input
            type="email"
            value="ab@mail.com"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg mb-4"
            disabled
          />
        
          <label className="flex text-sm font-medium">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            value="09x-xxx-xxxx"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg mb-4"
            disabled
          />
        
          <label className="flex text-sm font-medium">ที่อยู่จัดส่ง</label>
          <span className="block p-2 mt-2 border border-gray-300 rounded-lg bg-gray-100">111/22 กรุงเทพมหานคร 12345</span>
        </div>

        <div>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ">
            แก้ไขข้อมูล
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">ประวัติการสั่งซื้อ</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium">เลขที่สั่งซื้อ</th>
              <th className="px-6 py-3 text-left text-sm font-medium">วันที่สั่งซื้อ</th>
              <th className="px-6 py-3 text-left text-sm font-medium">สถานะ</th>
              <th className="px-6 py-3 text-left text-sm font-medium">ยอดรวม</th>
              <th className="px-6 py-3 text-left text-sm font-medium">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">#123</td>
              <td className="px-6 py-4 text-sm">12/12/2568</td>
              <td className="px-6 py-4 text-sm text-yellow-600">รอชำระ</td>
              <td className="px-6 py-4 text-sm text-gray-900">568฿</td>
              <td className="px-6 py-4 text-sm text-blue-500">
                <button className="hover:underline cursor-pointer">ดูรายละเอียด</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">#124</td>
              <td className="px-6 py-4 text-sm">15/11/2568</td>
              <td className="px-6 py-4 text-sm text-green-600">สำเร็จ</td>
              <td className="px-6 py-4 text-sm text-gray-900">1250฿</td>
              <td className="px-6 py-4 text-sm text-blue-500">
                <button className="hover:underline cursor-pointer">ดูรายละเอียด</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium">#125</td>
              <td className="px-6 py-4 text-sm">07/09/2568</td>
              <td className="px-6 py-4 text-sm text-green-600">สำเร็จ</td>
              <td className="px-6 py-4 text-sm text-gray-900">751฿</td>
              <td className="px-6 py-4 text-sm text-blue-500">
                <button className="hover:underline cursor-pointer">ดูรายละเอียด</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
