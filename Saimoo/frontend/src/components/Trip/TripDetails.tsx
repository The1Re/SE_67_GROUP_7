import { useState } from "react";
import UserInfo from "./UserInfo";
import TripSchedule from "./TripSchedule";
import TransportationSelect from "./TransportationSelect";
import TripDescription from "./TripDescription";

const TripDetails = () => {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transportation, setTransportation] = useState("รถยนต์");
    const [description, setDescription] = useState("");

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <UserInfo />
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="หัวข้อ" 
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <TripSchedule 
                startDate={startDate} 
                setStartDate={setStartDate} 
                endDate={endDate} 
                setEndDate={setEndDate} 
            />
            <TransportationSelect 
                transportation={transportation} 
                setTransportation={setTransportation} 
            />
            <TripDescription 
                description={description} 
                setDescription={setDescription} 
            />
        </div>
    );
};

export default TripDetails;
