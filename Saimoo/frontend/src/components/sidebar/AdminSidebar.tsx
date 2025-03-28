import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "จัดการข้อมูล",
    subItems: [
      { name: "ผู้ใช้", path: "/admin/manage-users" },
      { name: "วัด", path: "/admin/manage-temples" }
    ],
  },
  {
    title: "ตรวจสอบการลงทะเบียน",
    subItems: [
      { name: "ตัวแทนวัด", path: "/admin/registrations/temple" },
      { name: "ไกด์", path: "/admin/registrations/guide" }
    ],
  },
  // {
  //   title: "ตรวจสอบการเงิน",
  //   subItems: [{ name: "การขอเคลม", path: "/admin/transactions" }],
  // },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="w-64 h-screen bg-white p-4 border-r border-gray-300 flex flex-col">
      <div className="flex justify-between items-center text-lg font-bold mb-4">
      <h2 className="text-sm md:text-lg font-semibold text-black">
          SAIM<span className="text-red-500">O</span>
          <span className="text-blue-500">O</span>
        </h2>
        <span className="text-gray-500 text-sm">{user.username}@Admin</span>
      </div>
      <p className="text-gray-500 font-semibold mb-2">แถบเมนู</p>
      <div className="flex-1">
        {menuItems.map((menu, index) => (
          <div key={index}>
            <button
              className="cursor-pointer w-full text-left py-2 font-semibold hover:bg-gray-100 px-2 rounded"
              onClick={() => toggleMenu(index)}
            >
              {menu.title}
            </button>
            {openMenus[index] && (
              <div className="pl-6">
                {menu.subItems.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className="cursor-pointer w-full text-left py-1 text-gray-700 hover:bg-gray-100 px-2 rounded"
                    onClick={() => navigate(subItem.path)}
                  >
                    {subItem.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button 
        className="cursor-pointer mt-auto border border-teal-500 text-teal-500 py-2 rounded-lg hover:bg-teal-100 w-full"
        onClick={logout}>
        ออกจากระบบ
      </button>
    </div>
  );
}
