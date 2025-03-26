import { useEffect, useState } from "react";
import api from "@/api";

const BASE_URL = import.meta.env.VITE_API_URL; // ✅ ดึงจาก .env เช่น http://localhost:3000

interface TripData {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  vehicle: string;
  maxPerson: number;
  status: string;
  ownerTripId: number;
  type: string;
  price: number;
  image?: string;
}

export default function MasonryGallery() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/trips");
        const tripsData = res.data.data;

        const tripsWithImages = await Promise.all(
          tripsData.map(async (trip: TripData) => {
            try {
              const tripDetailRes = await api.get(`/trips/${trip.id}`);
              const tripDetail = tripDetailRes.data;
              const rawImage = tripDetail.TripPicture?.[0]?.imagePath || "";

              let image = "";
              if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
                image = rawImage;
              } else if (rawImage) {
                image = `${BASE_URL}/${rawImage.replace(/\\/g, "/")}`; // ✅ แปลงเป็น URL
              }

              console.log(`📸 Trip ID ${trip.id} image:`, image);

              return { ...trip, image };
            } catch (error) {
              console.error("❌ Error fetching trip image for tripId", trip.id, error);
              return { ...trip, image: "" };
            }
          })
        );

        setTrips(tripsWithImages);
      } catch (error) {
        console.error("❌ Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {trips.map((trip) => (
          <a
            key={trip.id}
            href={`/trip-detail/${trip.id}`}
            rel="noopener noreferrer"
            className="block break-inside-avoid p-2 bg-white rounded-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <img
              src={
                trip.image ||
                `https://source.unsplash.com/random/400x300?temple&sig=${trip.id}`
              }
              alt={trip.title}
              className="w-full rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold">{trip.title}</h2>
            <p className="text-sm text-gray-600">โดยผู้ใช้ #{trip.ownerTripId}</p>
            <p className="text-xs text-gray-400">
              {new Date(trip.dateStart).toLocaleDateString()} -{" "}
              {new Date(trip.dateEnd).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
