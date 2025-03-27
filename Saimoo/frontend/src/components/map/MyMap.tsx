import { useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker
} from '@vis.gl/react-google-maps';
import { env } from '@/config';
import Directions from './Directions';

function MyMap({ locations }: { locations: { location: { lat: number; lng: number } }[] }) {
  useEffect(() => {
    console.log("📌 📍 อัปเดตแผนที่ใหม่: ", locations);
  }, [locations]);

  // ✅ ตรวจสอบความถูกต้อง
  if (!locations || locations.length === 0 || locations.some((loc) => !loc || !loc.location)) {
    return <div className="text-center text-sm text-gray-500">ยังไม่มีสถานที่ในแผนที่</div>;
  }

  const origin = locations[0].location;
  const destination = locations[locations.length - 1]?.location;
  const waypoints = locations.length > 2
    ? locations.slice(1, -1).map((loc) => ({ location: loc.location }))
    : [];

  return (
    <APIProvider apiKey={env.GOOGLE_MAP_API_KEY}>
      <Map
        defaultCenter={origin}
        defaultZoom={10}
        gestureHandling={"greedy"}
        fullscreenControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* ✅ ถ้ามีแค่ 1 จุด ให้แสดง Marker */}
        {locations.length === 1 ? (
          <Marker position={origin} />
        ) : (
          <Directions
            key={JSON.stringify(locations)}
            origin={origin}
            destination={destination}
            waypoints={waypoints}
          />
        )}
      </Map>
    </APIProvider>
  );
}

export default MyMap;
