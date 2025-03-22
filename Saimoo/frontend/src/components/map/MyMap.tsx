import { useEffect } from "react";
import {
    APIProvider,
    Map
} from '@vis.gl/react-google-maps';
import { env } from '@/config';
import Directions from './Directions';

function MyMap({ locations }) {
    useEffect(() => {
        console.log("📌 📍 อัปเดตแผนที่ใหม่: ", locations);
    }, [locations]);

    if (!locations || locations.length < 2) {
        return <div>กรุณาเพิ่มสถานที่อย่างน้อย 2 แห่ง</div>;
    }

    const origin = locations[0].location;
    const destination = locations[locations.length - 1].location;
    const waypoints = locations.slice(1, -1).map(loc => ({ location: loc.location }));

    return (
        <APIProvider apiKey={env.GOOGLE_MAP_API_KEY}>
            <Map
                defaultCenter={origin}
                defaultZoom={9}
                gestureHandling={'greedy'}
                fullscreenControl={false}
            >
                <Directions 
                    key={JSON.stringify(locations)}  // ✅ ใช้ JSON.stringify(locations) เพื่อบังคับให้ Directions รีเรนเดอร์ใหม่
                    origin={origin} 
                    destination={destination} 
                    waypoints={waypoints}
                />
            </Map>
        </APIProvider>
    );
}

export default MyMap;
