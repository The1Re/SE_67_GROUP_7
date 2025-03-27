import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Trip {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  vehicle: string;
  maxPerson: number;
  status: string;
  ownerTripId: number;
  type: string;
  price: number;
  TripDetail: TripDetail[];
}

interface TripDetail {
  id: number;
  tripId: number;
  order: number;
  arriveTime: string;
  day: number;
  description: string;
  locationId: number;
  TripDetailPicture: any[];
  Location: Location;
}

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  provinceId: number;
}

const HistoryTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserTrips = async () => {
    try {
      const response = await axios.get(`/api/trips/owner`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setTrips(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError('ไม่สามารถโหลดข้อมูลทริปได้');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  const handleViewTripDetails = (tripId: number) => {
    navigate(`/trip-details/${tripId}`);
  };

  const handleCloneTrip = (trip: Trip) => {
    navigate("/plan-trip", { state: { clonedTrip: trip } });
  };

  if (isLoading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid gap-4">
        {trips.map((trip) => (
          <div 
            key={trip.id} 
            className="border rounded p-4 shadow-md"
          >
            <div className="grid gap-4">
              <div 
                key={trip.id} 
                className="border rounded p-4 shadow-md"
              >
                <h2 className="text-xl font-semibold">{trip.title}</h2>
                <p>สถานะ: {trip.status}</p>
                <p>วันที่เริ่ม: {new Date(trip.dateStart).toLocaleDateString()}</p>
                <p>ประเภท: {trip.type === 'paid' ? 'ทริปแบบชำระเงิน' : 'ทริปฟรี'}</p>
                <p>ราคา: {trip.price} บาท</p>
                <p>จำนวนผู้เข้าร่วม: {trip.maxPerson} คน</p>

                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => handleViewTripDetails(trip.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    ดูรายละเอียด
                  </button>
                  <button 
                    onClick={() => handleCloneTrip(trip)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    คัดลอกทริป
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleCreateTrip}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        สร้างทริปใหม่
      </button>
    </div>
  );
};

export default HistoryTrip;
