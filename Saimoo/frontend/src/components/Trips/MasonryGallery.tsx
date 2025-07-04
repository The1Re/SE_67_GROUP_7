import DataLoading from "../DataLoading";



export default function MasonryGallery({ trips, loading }) {

  if (loading) {
    return <DataLoading/>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {trips.map((trip) => (
          <a
            key={trip.id}
            href={`/trips/${trip.id}`}
            rel="noopener noreferrer"
            className="block break-inside-avoid p-2 bg-white rounded-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <img
              src={
                trip.TripPicture[0]?.imagePath ||
                `https://source.unsplash.com/random/400x300?temple&sig=${trip.id}`
              }
              alt={trip.title}
              className="w-full rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold">{trip.title}</h2>
            <p className="text-sm text-gray-600">โดยผู้ใช้ #{trip.User.username}</p>
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
