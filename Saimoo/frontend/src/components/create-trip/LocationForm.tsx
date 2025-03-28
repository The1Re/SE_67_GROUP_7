import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { Location } from "@/models/Trip";
import { MapPin } from "lucide-react"; // ใช้ icon แบบ modern

function LocationForm({ onSubmit }) {
    const [location, setLocation] = useState<Location>({
        name: '',
        latitude: '',
        longitude: '',
        type: 'place'
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const placesLib = useMapsLibrary("places");
    const map = useMap();

    useEffect(() => {
        if (!placesLib || !inputRef.current) return;

        const autocomplete = new placesLib.Autocomplete(inputRef.current);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) return;

            const name = place.name || '';
            const lat = place.geometry.location.lat().toString();
            const lng = place.geometry.location.lng().toString();

            setLocation({
                ...location,
                name,
                latitude: lat,
                longitude: lng
            });
        });
    }, [placesLib, inputRef]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <MapPin className="text-teal-500" /> เพิ่มสถานที่
            </h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="ค้นหาสถานที่ (ร้านอาหาร, ที่พัก, จุดหมาย)"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                defaultValue={location.name}
            />

            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4 border border-gray-200">
                <p><strong>ละติจูด:</strong> {location.latitude || "ยังไม่เลือก"}</p>
                <p><strong>ลองจิจูด:</strong> {location.longitude || "ยังไม่เลือก"}</p>
            </div>

            <button
                disabled={!location.latitude || !location.longitude}
                className="w-full p-3 bg-teal-500 hover:bg-teal-600 transition rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onSubmit(location)}
            >
                ✅ เพิ่มสถานที่นี้
            </button>
        </div>
    );
}

export default LocationForm;
