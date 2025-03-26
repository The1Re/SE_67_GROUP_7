import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
import { Trip } from "@/models/Trip";
import { OrderRequest } from "@/models/Order";
import { WalletData } from "@/models/Wallet";

interface TripSummaryProps {
  onDeductAmountChange?: (amount: number) => void;
}
const TripSummary: React.FC<TripSummaryProps> = ({ onDeductAmountChange }) => {
  const { tripId, orderId } = useParams<{ tripId: string; orderId: string }>();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [orderRequest, setOrderRequest] = useState<Partial<OrderRequest>>({
    amountPerson: 1,
  });
  const [walletData, setWalletData] = useState<Partial<WalletData>>({
    balance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tripId) {
        setError("ไม่พบรหัสทริป");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // ดึงข้อมูลทริป
        const tripResponse = await api.get(`/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // ดึงข้อมูลกระเป๋าเงิน
        const walletResponse = await api.get("/wallets", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const amountPerson = await api.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // ดึงข้อมูลจำนวนคนจาก API หรือใช้ค่าเริ่มต้นจากทริป
        // สมมติว่าข้อมูลทริปมี property maxPerson หรือ defaultPerson
        const personCount = amountPerson.data.amountPerson || 1;

        setTrip(tripResponse.data);
        setOrderRequest({ amountPerson: personCount });
        setWalletData(walletResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("ไม่สามารถดึงข้อมูลได้");
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, tripId]);

  const total = trip?.price ? trip.price * (orderRequest.amountPerson || 1) : 0;

  const deductAmount = walletData.balance && trip?.price
    ? (walletData.balance < trip.price 
       ? walletData.balance 
       : trip.price)
    : 0;
    
  // Call onDeductAmountChange when deductAmount changes
  useEffect(() => {
    onDeductAmountChange?.(deductAmount);
  }, [deductAmount, onDeductAmountChange]);

  // Add this line after calculating deductAmount
  const discountedTotal = total - deductAmount;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">กำลังโหลด...</div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex justify-center items-center p-6 text-red-500">
        {error || "ไม่พบข้อมูลทริป"}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
      <h2 className="text-lg font-bold">{trip.title}</h2>
      <h3 className="mb-2">
        กำหนดการ {new Date(trip.dateStart).toLocaleDateString("th-TH")} -{" "}
        {new Date(trip.dateEnd).toLocaleDateString("th-TH")}
      </h3>
      <h2 className="text-3xl font-bold mb-4">{trip.price} ฿ / คน</h2>

      {/* แสดงจำนวนคนแบบข้อความธรรมดา ไม่มีปุ่มให้เปลี่ยน */}
      <p className="mb-4">
        จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {orderRequest.amountPerson} คน
      </p>

      <p>
        เงินคงเหลือในกระเป๋า:{" "}
        <span className="text-red-600">
          -
          {(walletData.balance && trip.price
            ? walletData.balance < trip.price
              ? walletData.balance
              : trip.price
            : 0
          ).toLocaleString()}{" "}
          ฿
        </span>
      </p>

      <div className="mt-4 text-right">
        <p className="text-sm text-gray-600">
          {trip.price} x {orderRequest.amountPerson} = {total.toLocaleString()}{" "}
          ฿
        </p>
        <p className="text-sm text-red-500">
          -{(walletData.balance && trip.price
            ? walletData.balance < trip.price
              ? walletData.balance
              : trip.price
            : 0
          ).toLocaleString()}{" "} ฿
        </p>
        <h1 className="text-2xl font-bold mt-2">
          รวม {discountedTotal.toLocaleString()} ฿
        </h1>
      </div>
    </div>
  );
};export default TripSummary;
