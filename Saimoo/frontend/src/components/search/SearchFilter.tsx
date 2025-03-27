import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa"; // 🔍 ไอคอนแว่นขยาย

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ยอดนิยม");
  const dropdownRef = useRef(null); // ✅ ใช้ ref เพื่อตรวจจับคลิกข้างนอก

  // ✅ ตรวจจับคลิกข้างนอกเพื่อปิด Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ ฟังก์ชัน handle ค้นหา
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // ✅ ฟังก์ชัน handle เลือก filter
  const handleFilterSelect = (filter, label) => {
    setSelectedFilter(label);
    if (onFilter) {
      onFilter(filter);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-4">
      {/* 🔍 ช่องค้นหา */}
      <div className="relative flex-1">
        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="ค้นหาสถานที่"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-8 pr-3 py-1.5 text-sm text-gray-700 focus:outline-none bg-transparent border-b border-gray-300 focus:border-gray-500"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>

      {/* 🎯 ปุ่ม Filter */}
      <div className="relative ml-2" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-1 border border-gray-400 rounded-md text-sm text-black bg-white hover:bg-gray-100 transition-all"
        >
          <span className="font-medium mr-1">{selectedFilter}</span>
          <div className="flex flex-col items-center justify-center">
            <div className="w-3 h-0.5 bg-black mb-0.5"></div>
            <div className="w-2.5 h-0.5 bg-black mb-0.5"></div>
            <div className="w-2 h-0.5 bg-black"></div>
          </div>
        </button>

        {/* 🔽 Dropdown เมนู */}
        {isOpen && (
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg text-sm z-10">
            <button
              onClick={() => handleFilterSelect("recommended", "สำหรับคุณ")}
              className="block w-full text-left px-3 py-1 hover:bg-gray-100"
            >
              สำหรับคุณ
            </button>
            <button
              onClick={() => handleFilterSelect("popular", "ยอดนิยม")}
              className="block w-full text-left px-3 py-1 hover:bg-gray-100"
            >
              ยอดนิยม
            </button>
            <button
              onClick={() => handleFilterSelect("new", "ใหม่ล่าสุด")}
              className="block w-full text-left px-3 py-1 hover:bg-gray-100"
            >
              ใหม่ล่าสุด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
