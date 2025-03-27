import React, { useState } from "react";
import SearchFilter from "@/components/search/SearchFilter";
import { useLocation } from "react-router-dom";
import TempleCard from "@/components/ฺbrowsetemple/TempleCard";
// ✅ แก้พาธให้ถูกต้อง
// ✅ ตรวจสอบว่ามีการใช้งานหรือไม่

const BrowseTempleWithGuest = () => {
  const location = useLocation();
  const isSelectMode = location?.state?.createMode === true;

  // ✅ สร้าง state สำหรับเก็บค่าค้นหาและฟิลเตอร์
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ยอดนิยม");

  // ✅ ฟังก์ชัน handle การค้นหา
  const handleSearch = (term) => {
    if (typeof term === "string") {
      setSearchTerm(term);
    }
  };

  // ✅ ฟังก์ชัน handle การเลือกฟิลเตอร์
  const handleFilter = (filter) => {
    if (typeof filter === "string") {
      setSelectedFilter(filter);
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-500 p-6">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isSelectMode ? "เลือกวัดสำหรับทริป" : "รายชื่อวัด"}
      </h1>

      {/* ✅ ส่งฟังก์ชัน onSearch และ onFilter ให้ SearchFilter */}
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

      {/* ✅ ส่ง searchTerm และ selectedFilter ไปที่ TempleCard */}
      <TempleCard
        isSelectMode={isSelectMode}
        searchTerm={searchTerm}
        selectedFilter={selectedFilter}
      />
    </div>
  );
};

export default BrowseTempleWithGuest;
