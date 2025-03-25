import api from "@/api";
import ParticipantForm from "@/components/purchaser/ParticipantForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface TripOrderDetail {
  id?: number;
  orderId?: number;
  order?: number;
  fullName: string;
  phone: string;
  requirement: string;
  isChild: boolean;
  identityCode?: string;
  isJoined?: boolean;
}

export interface Trip {
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
}

function PurchaserDetails(tripId: number) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [participants, setParticipants] = useState<TripOrderDetail[]>([]);
  const [numPeople, setNumPeople] = useState(1);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${tripId}`);
        setTrip(res.data);
      } catch (error) {
        console.error(error); // Changed from err to error
      }
    }
    fetchTrip(); // Also need to call the function
  }, [tripId]);
  
  
  useEffect(() => {
    if (!tripId) return;
    
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/${tripId}`);
        setParticipants(res.data);
        setNumPeople(res.data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, [tripId]);
  
  
  const handleChange = (
    index: number,
    field: keyof TripOrderDetail,
    value: string | boolean
  ) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const handleNumChange = (value: number) => {
    setNumPeople(value);
    const updated = [...participants];

    if (value > updated.length) {
      const diff = value - updated.length;
      for (let i = 0; i < diff; i++) {
        updated.push({
          fullName: "",
          phone: "",
          requirement: "",
          isChild: false,
        });
      }
    } else {
      updated.length = value;
    }

    setParticipants(updated);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Steps Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          ข้อมูลผู้ซื้อ
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ข้อมูลการชำระเงิน
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ยืนยันการซื้อแล้ว
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
        {trip ? (
          <>
            <h2 className="text-lg font-bold">{trip.title}</h2>
            <h3 className="mb-2">
              กำหนดการ{" "}
              {new Date(trip.dateStart).toLocaleDateString("th-TH")} -{" "}
              {new Date(trip.dateEnd).toLocaleDateString("th-TH")}
            </h3>
            <h2 className="text-3xl font-bold mb-4">
              {trip.price.toLocaleString()} ฿ / คน
            </h2>
            <label className="block mb-1">จำนวนคนที่เข้าร่วมทริป</label>
            <select
              value={numPeople}
              onChange={(e) => handleNumChange(Number(e.target.value))}
              className="border rounded px-2 py-1 cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </>
        ) : (
          <p>กำลังโหลดข้อมูลทริป...</p>
        )}
      </div>

      {/* Participant Forms */}
      {participants.map((person, index) => (
        <ParticipantForm
          key={index}
          index={index}
          data={person}
          onChange={handleChange}
        />
      ))}

      {/* Continue Button */}
      <div
        onClick={() => navigator("/trips/payment")}
        className="w-3/4 mx-auto flex justify-end"
      >
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 cursor-pointer">
          ต่อไป
        </button>
      </div>
    </div>
  );
}

export default PurchaserDetails;
