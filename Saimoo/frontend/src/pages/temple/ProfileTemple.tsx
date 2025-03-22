// pages/TemplePage.tsx
import React from "react";

import InfoTemple from "../../components//profiletemple/InfoTemple";
import TempleTab from "../../components/profiletemple/TempleTab";


const TemplePage: React.FC = () => {
  return (
    <div className=" p-6">
      {/* ส่วนหัวข้อมูลวัด */}
      
      <InfoTemple />
      
      {/* เมนู Tab และคอนเทนต์ */}
      <TempleTab />
      
    </div>
  );
};

export default TemplePage;