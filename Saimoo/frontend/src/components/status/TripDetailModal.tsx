import { useEffect, useState } from "react";
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
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!trip) return;
      try {
        const res = await api.get<OrderResponse>(`/orders/${trip.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrder(res.data);
      } catch (err) {
        console.error("❌ โหลดข้อมูล order ไม่สำเร็จ:", err);
      }
    };

    fetchOrder();
  }, [trip]);

  if (!isOpen || !trip) return null;

  const pricePerPerson = 1899;
  const peopleCount = order?.TripOrderDetail.filter((p) => p.isChild === 0).length || 0;
  const childrenCount = order?.TripOrderDetail.filter((p) => p.isChild === 1).length || 0;
  const total = pricePerPerson * peopleCount;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-2">{trip.status}</h2>
        <p className="font-medium">{trip.name}</p>
        <p className="text-sm text-gray-600">{trip.date}</p>

        <div className="flex justify-between mt-4">
          <div>
            <p>จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {peopleCount} คน</p>
            {childrenCount > 0 && <p>เด็ก: {childrenCount} คน (0 ฿)</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {pricePerPerson} x {peopleCount} = {total.toLocaleString()} ฿
            </p>
            <h1 className="text-2xl font-bold mt-2">รวม {total.toLocaleString()} ฿</h1>
          </div>
        </div>

        <hr className="my-4" />
      </div>
    </div>
  );
};


export default TripDetailModal;
