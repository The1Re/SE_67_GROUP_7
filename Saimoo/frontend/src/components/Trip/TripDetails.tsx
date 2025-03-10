import { useState } from "react";
import UserInfo from "./UserInfo";
import TripSchedule from "./TripSchedule";
import TransportationSelect from "./TransportationSelect";
import TripDescription from "./TripDescription";

const TripDetails = ({ startDate, setStartDate, endDate, setEndDate, setDays }) => {
    const [transportation, setTransportation] = useState(null);
    const [description, setDescription] = useState("");

    return (
        <div className="bg-white rounded-lg  space-y-4">
            <UserInfo />
            <input 
                type="text" 
                placeholder="หัวข้อ" 
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <TripSchedule 
                startDate={startDate} 
                setStartDate={setStartDate} 
                endDate={endDate} 
                setEndDate={setEndDate} 
                setDays={setDays} 
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
