import {
    APIProvider,
    Map
} from '@vis.gl/react-google-maps';
import { env } from '@/config';
import Directions from './Directions';
import './style.css';

const route = [
    { key: "วัดสุทัศนเทพวรารามราชวรมหาวิหาร", location: { lat: 13.751943069434354, lng: 100.50103767897743} },
    { key: "วัดพระศรีรัตนศาสดาราม", location: { lat: 13.752484975530201, lng: 100.49249752566696 } },
    { key: "วัดบวรนิเวศวิหาร ราชวรวิหาร", location: { lat: 13.760571732918766, lng: 100.49996479536759 } }
]

function MyMap() {
    return (
        <APIProvider apiKey={env.GOOGLE_MAP_API_KEY}>
            <Map
                defaultCenter={{ lat: 37.774546, lng: -122.433523 }}
                defaultZoom={9}
                gestureHandling={'greedy'}
                fullscreenControl={false}
            >
                <Directions 
                    origin={route[0].location} 
                    destination={route[route.length - 1].location} 
                    waypoints={route.slice(1, -1)}
                />
            </Map>
        </APIProvider>
    )
}

export default MyMap;