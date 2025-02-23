import React, { useState, useEffect, useRef } from "react";
import { FaSuitcaseRolling, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiSettings, FiCreditCard, FiBookmark, FiSmile } from "react-icons/fi";
import { MdAddCircleOutline, MdDashboard } from "react-icons/md";

const UserTopbar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"SaiTrip" | "SaiWat">("SaiTrip");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ฟังก์ชันสำหรับปิด dropdown ถ้าคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
      <h2 className="text-lg font-semibold text-black">
        SAIM
        <span className="text-red-500">O</span>
        <span className="text-blue-500">O</span>
      </h2>

      <div className="flex items-center space-x-8 mx-auto">
        <h1
          className={`text-lg font-semibold cursor-pointer transition-colors duration-300 ${
            selectedTab === "SaiTrip" ? "text-teal-500 border-b-2 border-teal-500" : "text-black"
          } hover:text-teal-500`}
          onClick={() => setSelectedTab("SaiTrip")}
        >
          SaiTrip
        </h1>
        <h1
          className={`text-lg font-semibold cursor-pointer transition-colors duration-300 ${
            selectedTab === "SaiWat" ? "text-teal-500 border-b-2 border-teal-500" : "text-black"
          } hover:text-teal-500`}
          onClick={() => setSelectedTab("SaiWat")}
        >
          SaiWat
        </h1>
      </div>

      <div className="relative flex items-center space-x-4">
        <div className="border-l border-gray-300 h-8 mx-2"></div>

        <div className="relative" ref={dropdownRef}>
          <FaUserCircle
            className={`text-3xl cursor-pointer transition-transform duration-300 ${
              isDropdownOpen ? "text-gray-700 scale-110" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />

          <div
            className={`absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-200 transform transition-all duration-300 ${
              isDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="px-2 py-4 text-center">
              <FaUserCircle className="text-4xl text-gray-500 mx-auto mb-3" />
              <p className="text-sm font-semibold">user_8347elf0uux9</p>
              <div className="w-3/4 mx-auto border-b border-gray-300 mt-2 py-1"></div>
            </div>
            <div className="py-2">
              <DropdownItem icon={<FaUserCircle />} text="โปรไฟล์" />
              <DropdownItem icon={<FaSuitcaseRolling />} text="ทริปของฉัน" />
              <DropdownItem icon={<MdAddCircleOutline />} text="สร้างทริปของฉัน" />
              <DropdownItem icon={<FiCreditCard />} text="กระเป๋าตัง" />
            </div>
            <div className="px-2 py-2">
              <button className="w-full text-red-500 font-semibold py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
                <FiLogOut />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownItem: React.FC<{ icon: JSX.Element; text: string }> = ({ icon, text }) => {
  return (
    <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200">
      <span className="mr-3 text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default UserTopbar;
