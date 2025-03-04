import MasonryGallery from "@/components/Trips/MasonryGallery";
import SearchBar from "@/components/Trips/SearchBar";
import { useState } from "react";

export const Trips = () => {
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("recommended");

  return (
    <div >
      <SearchBar search={search} setSearch={setSearch} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      <MasonryGallery/>
    </div>
  );
};
