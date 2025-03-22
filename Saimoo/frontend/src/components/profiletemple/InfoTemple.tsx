import React, { useEffect, useState } from "react";

const InfoTemple: React.FC = () => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch("/assets/fakeDatatemple.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setImage(data[0].image); // ใช้รูปแรกจาก fakeData.json
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="relative p-20 bg-white  rounded-xl max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
      {/* 🔹 หัวข้อที่อยู่ด้านบนสุดของกล่อง (ไม่มีพื้นหลัง) */}
      <h2 className="absolute top-[-0px] left-1/2 transform -translate-x-1/2 text-5xl font-bold text-gray-900">
        วัดศีรษะทอง
      </h2>
      
      {/* 🔹 รูปภาพ */}
      <div className="md:w-1/2 flex justify-center">
        {image && (
          <img
            src={image}
            alt="วัดศีรษะทอง"
            className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md"
          />
        )}
      </div>
      
      {/* 🔹 เนื้อหา */}
      <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">คำอธิบาย</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
        สำหรับจุดเด่นที่ทุกคนต้องพากันมาถ่ายรูปและสักการะบูชาก็จะเป็นตัวพระปรางค์วัดอรุณ ซึ่งจะเป็นพระปรางค์ที่อยู่บริเวณด้านหน้าวัดและอยู่ติดกับริมน้ำเจ้าพระยาเลย ความสูงของพระปรางค์องค์นี้สูงถึง 81.85 เมตร และขึ้นชื่อว่าเป็นพระปรางค์ที่ใหญ่ที่สุด โดยพระปรางค์องค์นี้ก็จะมีความสวยงามวิจิตรพิสดารมาก โดยถูกสร้างตามความเชื่อของคติจักรวาลนั่นเอง โดยหลักๆ ก็จะแบ่งพื้นที่ของตัวพระปรางค์ออกเป็น 4 ชั้น ไล่ระดับกันแบบสวยงามไม่เหมือนใคร 
        </p>
        
        {/* 🔹 ที่ตั้งของวัด */}
        <div className="mt-4 text-gray-800 text-lg flex items-center justify-center md:justify-start">
          <span className="text-pink-500 text-xl mr-2">📍</span>
          <span className="font-semibold">ที่ตั้ง:</span> ตำบลศีรษะทอง อำเภอนครชัยศรี จังหวัดนครปฐม
        </div>
      </div>
    </section>
  );
};

export default InfoTemple;