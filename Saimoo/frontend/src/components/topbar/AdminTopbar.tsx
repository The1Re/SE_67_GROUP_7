import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

const AdminTopbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [selectedTab, setSelectedTab] = useState<"SaiTrip" | "SaiWat">("SaiTrip");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {/* ✅ ปรับดีไซน์ของ Topbar ให้กลับมาเหมือนเดิม */}
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200 h-16">
        <button className="text-2xl" onClick={toggleSidebar}>
          <IoIosMenu />
        </button>

        <h2 className="text-sm md:text-lg ml-3 font-semibold text-black">
          SAIM<span className="text-red-500">O</span>
          <span className="text-blue-500">O</span>
        </h2>

        {/* ✅ ปรับให้ปุ่ม SaiTrip / SaiWat ทำงานได้ */}
        <div className="flex items-center space-x-8 mx-auto">
          <MenuItem title="SaiTrip" selectedTab={selectedTab} setSelectedTab={() => {
            setSelectedTab("SaiTrip");
            navigate("/admin/dashboard"); // ✅ กลับไปหน้าแรก Admin
          }} />
          <MenuItem title="SaiWat" selectedTab={selectedTab} setSelectedTab={() => {
            setSelectedTab("SaiWat");
            navigate("/admin/dashboard"); // ✅ กลับไปหน้าแรก Admin
          }} />
        </div>

        {/* ✅ เพิ่ม User Icon */}
        <div className="relative flex items-center space-x-4">
          <div className="border-l border-gray-300 h-8 mx-2"></div>

          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className={`text-3xl cursor-pointer transition-transform duration-300 ${
                isDropdownOpen ? "text-gray-700 scale-110" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Component สำหรับปุ่ม SaiTrip / SaiWat
const MenuItem: React.FC<{ title: "SaiTrip" | "SaiWat"; selectedTab: string; setSelectedTab: () => void }> = ({ title, selectedTab, setSelectedTab }) => (
  <h1
    className={`text-sm md:text-lg font-semibold cursor-pointer transition-colors duration-300 ${
      selectedTab === title ? "text-teal-500 border-b-2 border-teal-500" : "text-black"
    } hover:text-teal-500`}
    onClick={setSelectedTab}
  >
    {title}
  </h1>
);

export default AdminTopbar;
