
import TempleCard from "../../components/ฺbrowsetemple/TempleCard";
import SearchBar from "@/components/Trips/SearchBar";

const BrowseTempleWithGuest = () => {
  return (
    <div className="bg-white min-h-screen text-gray-500">
      <SearchBar search="" setSearch={() => {}} selectedSort="recommended" setSelectedSort={() => {}} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTrips.map((trip) => (
          <TempleCard  />
        ))}
      </div>
    </div>
  );
};

export default BrowseTempleWithGuest;
