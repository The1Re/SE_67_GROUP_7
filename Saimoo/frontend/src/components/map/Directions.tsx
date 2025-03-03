import { useState, useEffect } from 'react';
import {
    useMapsLibrary,
    useMap
} from '@vis.gl/react-google-maps';

export type DirectionsProps = {
    origin: google.maps.LatLngLiteral | string;
    destination: google.maps.LatLngLiteral | string;
    waypoints?: { location: google.maps.LatLngLiteral | string }[];
};

function Directions(
    { origin, destination, waypoints = [] }: DirectionsProps
) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [leg, setLeg] = useState<google.maps.DirectionsLeg | null>(null);
    const [routeIndex, ] = useState(0);
    const selected = routes[routeIndex];
    const legs = selected?.legs;

    useEffect(() => {
        setLeg(legs ? legs[0] : null);
    }, [legs]);

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(
            new routesLibrary.DirectionsRenderer({
                draggable: true, // Only necessary for draggable markers
                map
            })
        );
    }, [routesLibrary, map]);

    // Add the following useEffect to make markers draggable
    useEffect(() => {
        if (!directionsRenderer) return;

        // Add the listener to update routes when directions change
        const listener = directionsRenderer.addListener(
            'directions_changed',
            () => {
                const result = directionsRenderer.getDirections();
                if (result) {
                    setRoutes(result.routes);
                }
            }
        );

        return () => google.maps.event.removeListener(listener);
    }, [directionsRenderer]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin,
                destination,
                waypoints: waypoints.map(wp => ({ location: wp.location, stopover: true })),
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                console.log(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer, origin, destination, waypoints]);

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <div className="directions">
            {/* <h2>{selected.summary}</h2> */}
            <h2>
                {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
            </h2>
            <p>Distance: {leg.distance?.text}</p>
            <p>Duration: {leg.duration?.text}</p>

            <h2>Other Routes</h2>
            <ul>
                {selected.legs.map((route, index) => (
                    <li key={index}>
                        <button onClick={() => setLeg(route)}>
                            <p className='text-sm'>{route.start_address.split(',')[0]} to {route.end_address.split(',')[0]}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Directions;