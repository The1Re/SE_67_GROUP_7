import MyMap from "@/components/map/MyMap";
import Image from "@/components/tripdetail/Image";
import TripCard from "@/components/tripdetail/TripCard";
import TripDayDetail from "@/components/tripdetail/TripDayDetail";

function TripDetail() {
 
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
          <Image/>
          <div className=" w-full bg-white px-8">
          <TripCard/>
          <TripDayDetail/>
          </div>

      </div>

      {/* คอลัมน์ขวา (แผนที่) ✅ ใช้ sticky ทำให้ไม่เลื่อนตาม */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-300 items-center justify-center sticky top-0">
          {/* <MyMap /> */}
      </div>
    </div>
  );
}

export default TripDetail;
