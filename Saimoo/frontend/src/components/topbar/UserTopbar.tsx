import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSuitcaseRolling, FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiCreditCard } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineTempleBuddhist } from "react-icons/md";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { TbFlag3 } from "react-icons/tb";
import { useAuth } from "@/context/AuthContext";

const UserTopbar: React.FC = () => {
  const { logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState<"SaiTrip" | "SaiWat">(
    "SaiTrip"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
      {/* Topbar */}
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow-md border-b border-gray-200">
        <button className="text-2xl" onClick={() => setIsSidebarOpen(true)}>
          <IoIosMenu />
        </button>

        <h2 className="text-sm md:text-lg ml-3 font-semibold text-black">
          SAIM<span className="text-red-500">O</span>
          <span className="text-blue-500">O</span>
        </h2>

        {/* Tabs */}
        <div className="flex items-center space-x-8 mx-auto">
          <MenuItem
            title="SaiTrip"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <MenuItem
            title="SaiWat"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>

        {/* User Dropdown */}
        <div className="relative flex items-center space-x-4">
          <div className="border-l border-gray-300 h-8 mx-2"></div>

          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className={`text-3xl cursor-pointer transition-transform duration-300 ${
                isDropdownOpen
                  ? "text-gray-700 scale-110"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{
                opacity: isDropdownOpen ? 1 : 0,
                scale: isDropdownOpen ? 1 : 0.95,
                y: isDropdownOpen ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-200"
              style={{ pointerEvents: isDropdownOpen ? "auto" : "none" }}
            >
              <div className="px-2 py-4 text-center">
                <FaUserCircle className="text-4xl text-gray-500 mx-auto mb-3" />
                <p className="text-sm font-semibold">user_8347elf0uux9</p>
                <div className="w-3/4 mx-auto border-b border-gray-300 mt-2 py-1"></div>
              </div>
              <div className="py-2">
                <DropdownItem icon={<FaUserCircle />} text="โปรไฟล์" />
                <DropdownItem icon={<FaSuitcaseRolling />} text="ทริปของฉัน" />
                <DropdownItem
                  icon={<MdAddCircleOutline />}
                  text="สร้างทริปของฉัน"
                />
                <DropdownItem icon={<FiCreditCard />} text="กระเป๋าตัง" />
              </div>
              <div className="px-2 py-2">
                <button 
                  className="w-full text-red-500 font-semi py-2 flex items-center justify-center space-x-2 hover:bg-gray-100"
                  onClick={logout}
                >
                  <FiLogOut />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sidebar (ใช้ Framer Motion + AnimatePresence) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }} //  ทำให้หด smooth
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-2xl"
                >
                  <IoMdClose />
                </button>
                <h2 className="text-sm md:text-lg font-semibold text-black mr-20">
                  SAIM<span className="text-red-500">O</span>
                  <span className="text-blue-500">O</span>
                </h2>
              </div>
              <SidebarItem title="ลงทะเบียนเป็นตัวแทนไกด์" icon={<TbFlag3 />} />
              <SidebarItem
                title="ลงทะเบียนเป็นตัวแทนวัด"
                icon={<MdOutlineTempleBuddhist />}
              />
              <SidebarItem
                title="ออกจากระบบ"
                icon={<FiLogOut />}
                className="text-red-500"
                onClick={logout}
              />
            </motion.div>

            {/* Overlay Effect (หายไปแบบ smooth) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // Fade out smooth
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/10 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Component สำหรับเมนูหลัก
const MenuItem: React.FC<{
  title: "SaiTrip" | "SaiWat";
  selectedTab: string;
  setSelectedTab: (tab: "SaiTrip" | "SaiWat") => void;
}> = ({ title, selectedTab, setSelectedTab }) => (
  <h1
    className={`text-sm md:text-lg font-semibold cursor-pointer transition-colors duration-300 ${
      selectedTab === title
        ? "text-teal-500 border-b-2 border-teal-500"
        : "text-black"
    } hover:text-teal-500`}
    onClick={() => setSelectedTab(title)}
  >
    {title}
  </h1>
);

const DropdownItem: React.FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200">
    <span className="mr-3 text-lg">{icon}</span>
    <span className="text-sm">{text}</span>
  </div>
);

const SidebarItem: React.FC<{
  title: string;
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
}> = ({ title, icon, className, onClick }) => (
  <div
    className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200 ${className}`}
    onClick={onClick}
  >
    <span className="mr-3 text-lg">{icon}</span>
    <span className="text-sm">{title}</span>
  </div>
);

export default UserTopbar;
