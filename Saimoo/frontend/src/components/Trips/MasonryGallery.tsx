import { useEffect, useState } from "react";

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
  url?: string;
  posted_by: string;
  posted_at: string;
}



export default function MasonryGallery() {
  const [trips, setTrips] = useState<TripData[]>([]);

  useEffect(() => {
    fetch("/assets/fakeTrips.json")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="columns-5 gap-3 max-w-7xl space-y-3 pb-28">
        {trips.map((trip) => (
          <a
            key={trip.id}
            href={trip.url || "/trip-detail"}
            rel="noopener noreferrer"
            className="block break-inside-avoid p-2 bg-white rounded-lg
                       hover:shadow-xl hover:brightness-105 transition-all duration-300 
                       active:scale-95"
          >
            <img src={trip.image} alt={trip.title} className="w-full rounded-lg mb-2" />
            <h2 className="text-lg font-bold">{trip.title}</h2>
            <p className="text-sm text-gray-600">{trip.posted_by}</p>
            <p className="text-xs text-gray-400">{new Date(trip.posted_at).toLocaleString()}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
