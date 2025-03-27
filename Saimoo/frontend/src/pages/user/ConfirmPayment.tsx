import TripSummaryCard from "@/components/payment/TripSummaryCard";
import { useNavigate } from "react-router-dom";

const tripPrice = 1899;
const peopleCount = 2;
const walletBalance = 500;

function ConfirmPayment() {
    const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ข้อมูลผู้ซื้อ</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ข้อมูลการชำระเงิน</button>
        <button className="bg-teal-500 text-white px-4 py-2 rounded">ยืนยันการซื้อแล้ว</button>
      </div>

      {/* Confirm Message */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-semibold text-gray-700">. . . ชำเงินเสร็จสิ้น . . .</h1>
      </div>

      {/* Trip Summary Card */}
      <TripSummaryCard
        tripPrice={tripPrice}
        peopleCount={peopleCount}
        walletBalance={walletBalance}
      />

      {/* กลับหน้าแรก */}
      <a
          onClick={() => navigate("/trips")}
          className="mt-8 text-teal-600 underline hover:text-teal-800 transition cursor-pointer"
      >
        กลับหน้าแรก
      </a>
    </div>
  );
}

export default ConfirmPayment;
