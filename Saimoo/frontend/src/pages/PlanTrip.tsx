import MapView from "@/components/Trip/MapView";
import UploadBox from "@/components/Trip/UploadBox";

function PlanTrip() {
  return (
    <div className="mt-9 h-screen flex flex-col md:flex-row">
      <div className="w-full h-screen md:w-4/6 md:h-auto flex flex-col">
          <UploadBox />
      </div>

      {/* ส่วนขวา */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-500 items-center justify-center">
      <MapView />
      </div>
      
    </div>
  );
}

export default PlanTrip;
