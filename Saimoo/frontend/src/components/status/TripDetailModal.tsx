import { useState } from "react";
import StatusClaimed from "./StatusClaimed";
import StatusInProgress from "./StatusInProgress";
import StatusPaid from "./StatusPaid";

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
  if (!isOpen || !trip) return null;

  // Mock pricing
  const pricePerPerson = 1899;
  const peopleCount = 2;
  const childrenCount = 1; // mock เด็ก 1 คน
  const walletDiscount = 500; // mock ส่วนลด ถ้า 0 จะไม่แสดง
  const total = pricePerPerson * peopleCount;
  const discountedTotal = total - walletDiscount;

  const [rating, setRating] = useState(0);

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
            <textarea
              placeholder="review"
              className="w-full border rounded p-2"
              rows={3}
            />
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
            {walletDiscount > 0 && <p>เงินคงเหลือในกระเป๋า</p>}
            {childrenCount > 0 && <p>เด็ก: {childrenCount} คน (0 ฿)</p>}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {pricePerPerson} x {peopleCount} = {total.toLocaleString()} ฿
            </p>
            {walletDiscount > 0 && (
              <p className="text-sm text-red-500 mb-7 mt-1">
                -{walletDiscount.toLocaleString()} ฿
              </p>
            )}
            <h1 className="text-2xl font-bold mt-2">รวม {discountedTotal.toLocaleString()} ฿</h1>
          </div>
        </div>

        <hr className="my-4" />
        {renderStatusContent()}
      </div>
    </div>
  );
};

export default TripDetailModal;
