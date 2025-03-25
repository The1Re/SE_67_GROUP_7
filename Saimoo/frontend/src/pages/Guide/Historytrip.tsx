import React, { useState } from 'react'; // แก้ไขการ import useState
import { useNavigate } from 'react-router-dom';  // ใช้สำหรับการนำทาง
import PackageCard from '@/components/historyguidetrip/PackageCard';  // นำเข้า PackageCard

const HistoryTrip = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // แก้ไขการประกาศ state
  const navigate = useNavigate();  // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  // ข้อมูลแพ็คเกจ
  const packages = [
    {
      id: 1,
      title: 'โพธิพระ: สุพรรณ ยืนบุญอุ้มโอ',
      image: "/assets/imagetemple/8.jpg",
      status: 'กำลังดำเนินการ',
      showDetails: false
    },
    {
      id: 2,
      title: 'โพธิพระ: สุพรรณ ยืนบุญอุ้มโอ',
      subtitle: '[เหลือที่อีกเพียง 1 คน]',
      date: 'กำหนดการ 5 ธ.ค. 2568 [1 Day]',
      description: 'คำอธิบาย',
      image: "/assets/imagetemple/8.jpg", 
      status: 'เสร็จสิ้น',
      showDetails: true
    }
  ];

  const handleCreateTrip = () => {
    navigate("/plan-trip");  // ✅ ไปยังหน้า "plan-trip"
  };

  const handleCancelTrip = () => {
    navigate("/TripCancellationPage");  // ✅ ไปยังหน้า TripCancellationPage
  };

  const handleClone = () => {
    navigate("/plan-trip");  // ✅ ไปยังหน้า "plan-trip"
  };

  // ฟังก์ชันที่ใช้สำหรับนำทางไปยังหน้า "สร้างทริป"
  const handleViewTrip = () => {
    navigate('/plan-trip');  // เปลี่ยนเส้นทางไปยังหน้า "create-trip"
  };

  return (
    <div className="max-w-5xl mx-auto p-5 bg-gray-100 min-h-screen">
<header className="mb-6 text-center">
  <h1 className="text-2xl font-bold text-gray-800 mb-2">
    แพ็คเกจทัวร์ของฉัน
  </h1>
  <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
</header>

      {/* ปุ่ม "สร้าง" */}
<div className="mb-6 flex justify-end">
  <button
    className="bg-teal-500 text-white py-2 px-6 rounded hover:bg-teal-600 cursor-pointer"
    onClick={() => { setIsDropdownOpen(false); handleCreateTrip(); }}
  >
    สร้างทริปใหม่
  </button>
</div>
      <div className="flex flex-col gap-5">
        {packages.map(pkg => (
          <PackageCard 
            key={pkg.id} 
            packageData={pkg} 
            onViewTrip={handleViewTrip} 
            onCancelTrip={handleCancelTrip} 
            onClone={handleClone} 
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryTrip;
