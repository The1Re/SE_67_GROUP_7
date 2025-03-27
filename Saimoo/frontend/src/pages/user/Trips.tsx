import api from "@/api";
import MasonryGallery from "@/components/Trips/MasonryGallery";
import SearchBar from "@/components/Trips/SearchBar";
import { getFile } from "@/services/fileupload";
import { useEffect, useState } from "react";

export const Trips = () => {
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("lastest");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(selectedSort)
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const searchTitle = search ? `&title=${search}` : '';
        const searchFilter = selectedSort === 'paid' ? '&type=paid' : selectedSort === 'free' ? '&type=free' : '';
        const res = await api.get("/trips?status=waiting" + searchFilter + searchTitle);
        const tripsData = res.data.data;

        tripsData.forEach((trip) => {
          trip.TripPicture.forEach((picture) => {
            let image = picture?.imagePath || '';
            if (!image.startsWith("http://") && !image.startsWith("https://")) {
              image = getFile(image);
            }
            picture.imagePath = image;
          });
        });

        setTrips(tripsData);
        setLoading(false)
      } catch (error) {
        console.error("Error loading trips:", error);
      }
    };
    fetchTrips();
  }, [selectedSort, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <MasonryGallery trips={trips} loading={loading}/>
    </div>
  );
};
