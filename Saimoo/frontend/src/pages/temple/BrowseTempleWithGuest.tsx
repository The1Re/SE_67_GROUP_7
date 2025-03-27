import SearchFilter from "@/components/search/SearchFilter";
import TempleCard from "@/components/ฺbrowsetemple/TempleCard";
import { useLocation } from "react-router-dom";

const BrowseTempleWithGuest = () => {
  const location = useLocation();
  const isSelectMode = location.state?.createMode === true;

  return (
    <div className="bg-white min-h-screen text-gray-500 p-6">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isSelectMode ? "เลือกวัดสำหรับทริป" : "รายชื่อวัด"}
      </h1>
      <SearchFilter onSearch={null} onFilter={null} />
      <TempleCard isSelectMode={isSelectMode} /> 
    </div>
  );
};

export default BrowseTempleWithGuest;