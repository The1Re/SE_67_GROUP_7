import UserInfo from "../Trip/UserInfo";
import TripSchedule from "./TripSchedule";
import { useTrip } from "@/context/TripContext";

function TripForm() {
    const { trip, setTrip } = useTrip();

    return (
        <div className="bg-white rounded-lg space-y-4">
            <UserInfo />
            <input
                type="text"
                placeholder="หัวข้อ"
                value={trip.title}
                onChange={(e) => setTrip({ ...trip, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <TripSchedule />
            <div className="flex items-center space-x-2">
                <span>🚗</span>
                <select 
                    defaultValue={trip.vehicle} 
                    onChange={(e) => setTrip({ ...trip, vehicle: e.target.value as "van" | "bus" })}
                    className="p-2 border border-gray-300 rounded-lg"
                >
                    <option value="van">รถตู้</option>
                    <option value="bus">รถบัส</option>
                </select>
            </div>
            <textarea 
                value={trip.description ?? ""} 
                onChange={(e) => setTrip({ ...trip, description: e.target.value })}
                placeholder="คำอธิบายทริป"
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
        </div>
    );
};

export default TripForm;
