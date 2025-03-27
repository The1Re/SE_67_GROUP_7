import { useEffect} from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap,
} from "@vis.gl/react-google-maps";
import { env } from "@/config";
import Directions from "./Directions";

function InnerMap({
  locations,
}: {
  locations: { location: { lat: number; lng: number } }[];
}) {
  const map = useMap();

  useEffect(() => {
    if (
      map &&
      locations &&
      locations.length === 1 &&
      locations[0]?.location
    ) {
      const { lat, lng } = locations[0].location;
      map.setZoom(13); // ✅ เพิ่ม zoom ถ้าอยากให้เห็นชัดขึ้น
      map.panTo({ lat, lng }); // ✅ ย้ายแผนที่ไปยังตำแหน่งเดียว
    }
  }, [map, locations]);

  const origin = locations[0].location;
  const destination = locations[locations.length - 1]?.location;
  const waypoints =
    locations.length > 2
      ? locations.slice(1, -1).map((loc) => ({ location: loc.location }))
      : [];

  return (
    <Map
      defaultCenter={origin}
      defaultZoom={10}
      gestureHandling="greedy"
      fullscreenControl={false}
      style={{ height: "100%", width: "100%" }}
    >
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
  );
}

function MyMap({
  locations,
}: {
  locations: { location: { lat: number; lng: number } }[];
}) {
  if (
    !locations ||
    locations.length === 0 ||
    locations.some((loc) => !loc || !loc.location)
  ) {
    return (
      <div className="text-center text-sm text-gray-500">
        ยังไม่มีสถานที่ในแผนที่
      </div>
    );
  }

  return (
    <APIProvider apiKey={env.GOOGLE_MAP_API_KEY}>
      <InnerMap locations={locations} />
    </APIProvider>
  );
}

export default MyMap;
