import { useState } from "react";

const menuItems = [
  {
    title: "จัดการข้อมูล",
    subItems: ["ผู้ใช้", "วัด"],
  },
  {
    title: "ตรวจสอบการลงทะเบียน",
    subItems: ["ตัวแทนวัด", "ไกด์"],
  },
  {
    title: "ตรวจสอบการเงิน",
    subItems: ["การคืนเงิน", "การชำระเงิน"],
  },
];

export default function AdminSidebar({ onSelectMenu }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-64 h-screen bg-white p-4 border-r border-gray-300 flex flex-col">
      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <span className="text-blue-600">SAIMOO</span>
        <span className="text-gray-500 text-sm">admin123@Admin</span>
      </div>
      <p className="text-gray-500 font-semibold mb-2">แถบเมนู</p>
      <div className="flex-1">
        {menuItems.map((menu, index) => (
          <div key={index}>
            <button
              className="w-full text-left py-2 font-semibold hover:bg-gray-100 px-2 rounded"
              onClick={() => toggleMenu(index)}
            >
              {menu.title}
            </button>
            {openMenus[index] && (
              <div className="pl-6">
                {menu.subItems.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-full text-left py-1 text-gray-700 hover:bg-gray-100 px-2 rounded"
                    onClick={() => onSelectMenu(subItem)}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="mt-auto border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-100 w-full">
        ออกจากระบบ
      </button>
    </div>
  );
}
