import TripSummary from "@/components/payment/TripSummary";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmPayment() {
    const navigate = useNavigate();
    const [, setDeductAmount] = useState(0);

   const handleDeductAmountChange = (amount: number) => {
    setDeductAmount(amount);
  };

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
      <TripSummary onDeductAmountChange={handleDeductAmountChange} />
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
