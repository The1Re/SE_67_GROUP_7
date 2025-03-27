import MasonryGallery from "@/components/Trips/MasonryGallery";
import SearchBar from "@/components/Trips/SearchBar";
import { useState } from "react";

export const Trips = () => {
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("lastest");

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <MasonryGallery />
    </div>
  );
};
