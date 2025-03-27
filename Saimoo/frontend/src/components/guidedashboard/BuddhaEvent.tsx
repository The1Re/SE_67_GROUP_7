import React from 'react';

const BuddhaEvent = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/5">
        <div className="relative">
          <img 
            src="/buddha-statue.jpg" 
            alt="Buddha statue" 
            className="w-full rounded-md"
          />
          <div className="absolute top-4 left-4 bg-yellow-400 rounded-full p-2">
            <span className="font-bold text-white">สุพรรณบุรี</span>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-4/5">
        <h3 className="text-lg font-medium">
          ไหว้พระ สุพรรณ ยิ้มบุญอิ่มใจ 【แพ็คเกจสำหรับ 1 คน】
        </h3>
        <p className="text-gray-800 mt-1">
          กำหนดการ 5 ธ.ค. 2568 【1 Day】
        </p>
        <p className="text-gray-600 mt-4">
          คำอธิบาย
        </p>
      </div>
    </div>
  );
};

export default BuddhaEvent;