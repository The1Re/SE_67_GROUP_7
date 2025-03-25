import { useEffect, useRef } from 'react';
import {
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';

export type DirectionsProps = {
    origin: google.maps.LatLngLiteral | string;
    destination: google.maps.LatLngLiteral | string;
    waypoints?: { location: google.maps.LatLngLiteral | string }[];
};

function Directions({ origin, destination, waypoints = [] }: DirectionsProps) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

    useEffect(() => {
        if (!routesLibrary || !map) return;

        if (!directionsServiceRef.current) {
            directionsServiceRef.current = new routesLibrary.DirectionsService();
        }

        if (!directionsRendererRef.current) {
            directionsRendererRef.current = new routesLibrary.DirectionsRenderer({
                draggable: true,
                map
            });
        } else {
            directionsRendererRef.current.setMap(map);
        }

        return () => {
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setMap(null);
            }
        };
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsServiceRef.current || !directionsRendererRef.current || !origin || !destination) return;

        console.log("📌 อัปเดตเส้นทางใหม่: ", { origin, destination, waypoints });

        directionsServiceRef.current.route({
            origin,
            destination,
            waypoints: waypoints.map(wp => ({ location: wp.location, stopover: true })),
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        })
        .then(response => {
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setDirections(response);
            } else {
                console.error("❌ directionsRendererRef.current is null");
            }
        })
        .catch(error => console.error("❌ Error fetching directions:", error));

    }, [origin, destination, waypoints]);

    return null;
}

export default Directions;
