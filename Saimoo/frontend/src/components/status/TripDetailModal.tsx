import { useEffect, useState } from "react";
import StatusClaimed from "./StatusClaimed";
import StatusInProgress from "./StatusInProgress";
import StatusPaid from "./StatusPaid";
import api from "@/api";
import { OrderResponse } from "@/models/Order";

interface Trip {
  id: number;
  name: string;
  date: string;
  status: string;
}

interface TripDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
}

const TripDetailModal = ({ isOpen, onClose, trip }: TripDetailModalProps) => {
  const [rating, setRating] = useState(0);
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);
  const [tripTitle, setTripTitle] = useState<string>("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!trip) return;
      try {
        const token = localStorage.getItem("token");
        const orderRes = await api.get(`/orders/${trip.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(orderRes.data);

        const tripId = orderRes.data.tripId;
        const tripRes = await api.get(`/trips/${tripId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTripTitle(tripRes.data.title);
      } catch (error) {
        console.error("❌ โหลดรายละเอียด order/trip ไม่สำเร็จ:", error);
      }
    };
    fetchOrder();
  }, [trip]);

  if (!isOpen || !trip) return null;

  const allPeople = orderData?.TripOrderDetail || [];
  const adultCount = allPeople.filter((d) => d.isChild === 0).length;
  const childCount = allPeople.filter((d) => d.isChild === 1).length;
  const total = orderData?.totalPrice || 0;
  const pricePerPerson = adultCount > 0 ? total / adultCount : 0;

  const renderStatusContent = () => {
    switch (trip.status) {
      case "สำเร็จ":
        return (
          <div>
            <label className="font-semibold">ให้คะแนนไกด์</label>
            <div className="flex gap-1 text-2xl my-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setRating(idx + 1)}
                  className={rating >= idx + 1 ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea placeholder="review" className="w-full border rounded p-2" rows={3} />
          </div>
        );
      case "จ่ายแล้ว":
        return <StatusPaid />;
      case "กำลังอยู่ในทริป":
        return <StatusInProgress />;
      case "เครมแล้ว":
        return <StatusClaimed />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-xl font-bold cursor-pointer">
          &times;
        </button>

        <h2 className="text-xl font-bold mb-2">{trip.status}</h2>
        <p className="font-medium">{tripTitle || trip.name}</p>
        <p className="text-sm text-gray-600">{trip.date}</p>

        <div className="flex justify-between mt-4">
          <div>
            <p>จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {adultCount} คน</p>
            {childCount > 0 && <p>เด็ก: {childCount} คน (0 ฿)</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {pricePerPerson.toLocaleString()} x {adultCount} = {total.toLocaleString()} ฿
            </p>
            <h1 className="text-2xl font-bold mt-2">รวม {total.toLocaleString()} ฿</h1>
          </div>
        </div>

        <hr className="my-4" />
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default TripDetailModal;
