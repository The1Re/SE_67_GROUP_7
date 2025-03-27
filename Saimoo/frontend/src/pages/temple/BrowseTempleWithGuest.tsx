import React, { useState } from "react";
import SearchBar from "@/components/Trips/SearchBar"; // ✅ แก้เป็น SearchBar
import { useLocation } from "react-router-dom";
import TempleCard from "@/components/ฺbrowsetemple/TempleCard";

 // ✅ แก้พาธให้ถูกต้อง

const BrowseTempleWithGuest = () => {
  const location = useLocation();
  const isSelectMode = location?.state?.createMode === true;

  // ✅ สร้าง state สำหรับเก็บค่าค้นหาและฟิลเตอร์
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recommended");

  return (
    <div className="bg-white min-h-screen text-gray-500 p-6">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isSelectMode ? "เลือกวัดสำหรับทริป" : "รายชื่อวัด"}
      </h1>

      {/* ✅ ใช้ SearchBar แทน SearchFilter */}
      <SearchBar
        search={searchTerm}
        setSearch={setSearchTerm}
        selectedSort={selectedFilter}
        setSelectedSort={setSelectedFilter}
      />

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
