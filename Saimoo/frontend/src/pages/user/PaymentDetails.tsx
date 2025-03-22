import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripSummary from "@/components/payment/TripSummary";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";

const tripPrice = 1899;
const walletBalance = 500;
const peopleCount = 2;

function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ข้อมูลผู้ซื้อ</button>
        <button className="bg-teal-500 text-white px-4 py-2 rounded">ข้อมูลการชำระเงิน</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ยืนยันการซื้อแล้ว</button>
      </div>

      {/* Components */}
      <TripSummary tripPrice={tripPrice} walletBalance={walletBalance} peopleCount={peopleCount} />
      <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />

      {/* Continue Button */}
      <div className="flex justify-end w-3/4 mx-auto">
        <button
          onClick={() => navigate("/trips/confirm")}
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 cursor-pointer"
        >
          ต่อไป
        </button>
      </div>
    </div>
  );
}

export default PaymentDetails;
