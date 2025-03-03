import UserInfo from "./UserInfo";
import TripSchedule from "./TripSchedule";
import TransportationSelect from "./TransportationSelect";
import TripDescription from "./TripDescription";

const TripDetails = ({ startDate, setStartDate, endDate, setEndDate, setDays }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
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
            <TransportationSelect />
            <TripDescription />
        </div>
    );
};

export default TripDetails;
