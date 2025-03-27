import SearchFilter from "@/components/search/SearchFilter";
import TempleCard from "@/components/ฺbrowsetemple/TempleCard";

const BrowseTempleWithGuest = () => {
  return (
    <div className="bg-white min-h-screen text-gray-500 p-6">
      <SearchFilter />
      <TempleCard /> 
    </div>
  );
};

export default BrowseTempleWithGuest;