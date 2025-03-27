import { Location } from "@/models/Trip"
import { useState } from "react"

function LocationForm({ onSubmit }) {
    const [ location, setLocation ] = useState<Location>({ name: '', latitude: '', longitude: '', type: 'place'});
    return (
        <div>
            <h2 className="mb-4">เพิ่มสถานที่</h2>
            <input
                type="text"
                placeholder="ชื่อสถานที่"
                className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                onChange={(e) => setLocation({ ...location, name: e.target.value })}
                value={location.name}
            />
            <input
                type="text"
                placeholder="ละติจูด"
                className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                value={location.latitude}
            />
            <input
                type="text"
                placeholder="ลองจิจูด"
                className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                value={location.longitude}
            />
            <button
                className="cursor-pointer w-full p-3 bg-blue-400 hover:bg-blue-500 rounded-lg text-white"
                onClick={() => onSubmit(location)}
            >
                เพิ่มสถานที่
            </button>
        </div>
    )
}

export default LocationForm