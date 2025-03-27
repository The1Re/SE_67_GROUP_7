import MasonryGallery from "@/components/Trips/MasonryGallery";
import SearchBar from "@/components/Trips/SearchBar";
import { useState } from "react";

export const Trips = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recommended");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchBar
        search={searchTerm}
        setSearch={setSearchTerm}
        selectedSort={selectedFilter}
        setSelectedSort={setSelectedFilter}
      />
      <MasonryGallery />
    </div>
  );
};
