import { useState, useEffect } from "react";
import TempleCard from "../../components/ฺbrowsetemple/TempleCard";
import watpha from "../../assets/watpha.jpg";
import watnakhon from "../../assets/watnakhon.jpg";
import watchai from "../../assets/watchai.jpg";
import watarun from "../../assets/watarun.jpg";
import watjai from "../../assets/watjai.jpg";
import SearchBar from "@/components/Trips/SearchBar";

// ข้อมูลวัดตัวอย่าง
const tripsData = [
  { 
    id: 1, 
    title: "วัดพระธาตุช่อแฮ", 
    description: "1 หมู่ 11 ตำบล ช่อแฮ อำเภอเมืองแพร่ แพร่ 54000", 
    imageUrl: watpha, 
    category: "popular" 
  },
  { 
    id: 2, 
    title: "องค์พระปฐมเจดีย์", 
    description: "27 ถนน เทศา ตำบลพระปฐมเจดีย์ อำเภอเมืองนครปฐม นครปฐม 73000", 
    imageUrl: watnakhon, 
    category: "new" 
  },
  { 
    id: 3, 
    title: "วัดไชยธาราราม", 
    description: "70 หมู่ 6 ถนนเจ้าฟ้าตะวันตก ฉลอง เมืองภูเก็ต ภูเก็ต 83130", 
    imageUrl: watchai, 
    category: "recommended" 
  },
  { 
    id: 4, 
    title: "วัดพระแก้ว", 
    description: "กรุงเทพฯ หน้าพระลาน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200", 
    imageUrl: watarun, 
    category: "popular" 
  },
  { 
    id: 5, 
    title: "วัดอรุณราชวราราม", 
    description: "เลขที่ 34 ถนนวังเดิม แขวงวัดอรุณ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600", 
    imageUrl: watjai, 
    category: "new" 
  },
];

const BrowseTempleWithGuest = () => {
  // สถานะสำหรับการค้นหาและการกรอง
  const [search, setSearch] = useState(''); // คำค้นหาจาก input
  const [selectedSort, setSelectedSort] = useState('all'); // หมวดหมู่ที่เลือก (เริ่มต้นเป็น 'all')
  const [filteredTrips, setFilteredTrips] = useState(tripsData); // รายการวัดที่แสดงผล (เริ่มต้นเป็นทั้งหมด)
  
  // ฟังก์ชันกรองข้อมูลเมื่อมีการเปลี่ยนแปลงค่าค้นหาหรือหมวดหมู่
  useEffect(() => {
    // กรองตามคำค้นหา (ชื่อวัดหรือคำอธิบาย)
    let filtered = tripsData.filter((trip) =>
      trip.title.toLowerCase().includes(search.toLowerCase()) || 
      trip.description.toLowerCase().includes(search.toLowerCase())
    );
    
    // กรองตามหมวดหมู่ (ถ้าไม่ได้เลือก 'all')
    if (selectedSort !== 'all') {
      filtered = filtered.filter((trip) => trip.category === selectedSort);
    }
    
    // อัพเดตรายการที่จะแสดงผล
    setFilteredTrips(filtered);
  }, [search, selectedSort]); // ทำงานเมื่อค่าค้นหาหรือหมวดหมู่เปลี่ยน
  
  return (
    <div className="bg-white min-h-screen text-gray-500">
      {/* แถบค้นหาและตัวกรอง */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      
      {/* แสดงรายการวัด */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <TempleCard key={trip.id} trip={trip} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-500">ไม่พบวัดที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTempleWithGuest;