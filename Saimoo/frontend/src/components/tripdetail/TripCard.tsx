import { FaCar, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TripCard = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-full w-full mx-auto p-6 ">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-0">
        {/* 🔹 ผู้สร้าง & วันที่สร้าง */}
        <div className="flex gap-4 px-2 sm:px-0">
          <a
            target="_blank"
            className="flex h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full shadow-sm"
            href="/profile"
          >
            <img
              src="https://i.pravatar.cc/45"
              alt="fernfunnys.journey"
              className="rounded-full object-cover"
            />
          </a>
          <div className="flex flex-col">
            <h1 className="flex-wrap text-xl font-bold">
              แพลนทริปไต้หวัน 5 วัน 4 คืน อัพเดทปี 2023
            </h1>
            <div className="flex w-full items-center gap-4 mobile:gap-2">
              <a
                target="_blank"
                className="text-[14px] font-medium mobile:max-w-44 truncate hover:underline"
                href="/profile"
              >
                fernfunnys.journey
              </a>
            </div>
            <div className="mt-2 flex w-fit items-center justify-start gap-1 text-[11px] text-gray-500">
              <span>สร้างเมื่อ 2 ต.ค. 2566</span>
            </div>
            {/* 🔹 รายละเอียดทริป */}
            <div className="mt-3">
              <h1 className="text-gray-700 font-bold">
                กำหนดการ 5 ธ.ค. 2568 【1 Day】
              </h1>
              <h3 className="text-gray-600 text-lg font-bold flex items-center gap-2">
                <FaClock /> 5 ธ.ค. 68 เวลา 8:00 น. - 5 ธ.ค. 68 เวลา 21:00 น.
              </h3>
              <h3 className="text-gray-600 text-lg  font-bold flex items-center gap-2">
                <FaCar /> เดินทางโดย รถตู้
              </h3>
              <p className="mt-3 text-black-500 text-2xl leading-relaxed">
                เริ่มต้นทริปด้วยความอยากไปเที่ยวต่างประเทศแบบใกล้ๆ
                จะไปญี่ปุ่นก็ตั๋วแพง เลยมาจบที่ไต้หวัน
                ประเทศที่มีความญี่ปุ่นนิดๆ จีนหน่อยๆ เกาหลีเบาๆ
                เริ่มต้นทริปด้วยความอยากไปเที่ยวต่างประเทศแบบใกล้ๆ
                จะไปญี่ปุ่นก็ตั๋วแพง เลยมาจบที่ไต้หวัน
                ประเทศที่มีความญี่ปุ่นนิดๆ จีนหน่อยๆ เกาหลีเบาๆ
                เริ่มต้นทริปด้วยความอยากไปเที่ยวต่างประเทศแบบใกล้ๆ
                จะไปญี่ปุ่นก็ตั๋วแพง เลยมาจบที่ไต้หวัน
                ประเทศที่มีความญี่ปุ่นนิดๆ จีนหน่อยๆ เกาหลีเบาๆ
              </p>
            </div>
          </div>
        </div>
        {/* 🔹 ปุ่มซื้อทริป*/}
        <div className="flex flex-col items-end gap-3">
          <button 
          onClick={() => navigate('/trips/purchaser')}
          className="cursor-pointer flex items-center gap-1 whitespace-nowrap rounded-lg border border-teal-500 px-6 py-3 font-semibold text-teal-500 shadow-sm duration-300 hover:bg-teal-500 hover:text-white">
            ซื้อทริป
          </button>
          <div className="flex flex-col items-end gap-1">
            <h1 className="text-7xl font-extrabold text-black">1,899 ฿</h1>
            <h1 className="text-red-500 text-lg font-semibold">2/10</h1>
            <h3 className="text-red-500 text-lg font-semibold">คนเข้าร่วม</h3>
          </div>
        </div>
      </div>
      <div className="text-[12px] mt-6 border-t text-gray-400"></div>    
      </div>
  );
};

export default TripCard;
