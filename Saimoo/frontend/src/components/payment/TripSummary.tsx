import { useEffect, useState } from "react";
import api from "@/api";
import { useParams } from "react-router-dom";
import { Trip } from "@/models/Trip";
import { OrderResponse } from "@/models/Order"; // แนะนำให้สร้าง interface นี้

interface TripSummaryProps {
  onDeductAmountChange: (amount: number) => void;
}

const TripSummary: React.FC<TripSummaryProps> = ({ onDeductAmountChange }) => {
  const { tripId, orderId } = useParams<{ tripId: string; orderId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripRes = await api.get(`/trips/${tripId}`);
        setTrip(tripRes.data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }

      try {
        const orderRes = await api.get(`/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("🎯 Order:", orderRes.data);
        setOrder(orderRes.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchData();
  }, [tripId, orderId]);

  const adultCount = order?.TripOrderDetail?.filter(d => d.isChild === 0).length || 0;
  const childCount = order?.TripOrderDetail?.filter(d => d.isChild === 1).length || 0;
  const totalPrice = adultCount * (trip?.price || 0);

  useEffect(() => {
    if (trip && order) {
      onDeductAmountChange(totalPrice);
    }
  }, [trip, order, totalPrice, onDeductAmountChange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-3/4 mx-auto">
      <h2 className="text-xl font-semibold mb-4">สรุปรายการ</h2>

      {trip && (
        <div className="mb-4">
          <h3 className="font-medium">{trip.title}</h3>
          <p className="text-gray-600">
            วันที่: {new Date(trip.dateStart).toLocaleDateString("th-TH")} -{" "}
            {new Date(trip.dateEnd).toLocaleDateString("th-TH")}
          </p>
        </div>
      )}

      {order && (
        <>
          <p className="mb-4">จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {adultCount} คน</p>
          <p className="mb-4">จำนวนคนที่เข้าร่วมทริป (เด็ก): {childCount} คน</p>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between font-semibold">
              <span>ราคารวม (เฉพาะผู้ใหญ่):</span>
              <span>{trip.price} x {adultCount} = {totalPrice.toLocaleString()} บาท</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TripSummary;
