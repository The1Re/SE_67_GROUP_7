import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TripSummary from "@/components/payment/TripSummary";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import api from "@/api";
import { WithdrawRequest } from "@/models/Wallet";

function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deductAmount, setDeductAmount] = useState(0);
  const { tripId } = useParams<{ tripId: string }>();
  const numericTripId = Number(tripId) || 2;


  // Function to receive deductAmount from TripSummary
  const handleDeductAmountChange = (amount: number) => {
    setDeductAmount(amount);
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
     
      if (deductAmount <= 0) {
        setError("ไม่มีเงินที่จะถอน");
        setIsProcessing(false);
        return;
      }

      if (!paymentMethod) {
        setError("กรุณาเลือกวิธีการชำระเงิน");
        setIsProcessing(false);
        return;
      }
     
      // สร้าง request body
      const withdrawRequest: WithdrawRequest = {
        amount: deductAmount
      };
     
      // เรียกใช้ API
      const response = await api.post('/wallets/withdraw', withdrawRequest, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
     
      console.log("ถอนเงินสำเร็จ:", response.data);
     
      // ทำการชำระเงินหรือดำเนินการขั้นตอนถัดไป
      setSuccess(true);
      setIsProcessing(false);
     
      const savedOrderId = localStorage.getItem("orderId");
      navigate(`/trips/${numericTripId}/${savedOrderId}/confirm`);

      navigate(`/trips/${numericTripId}/${savedOrderId}/confirm`);
     
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการถอนเงิน:", error);
      setError("เกิดข้อผิดพลาดในการชำระเงิน กรุณาลองใหม่อีกครั้ง");
      setIsProcessing(false);
    }
  }; 
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ข้อมูลผู้ซื้อ</button>
        <button className="bg-teal-500 text-white px-4 py-2 rounded">ข้อมูลการชำระเงิน</button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">ยืนยันการซื้อแล้ว</button>
      </div>

      {/* Error or Success Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-3/4 mx-auto">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-3/4 mx-auto">
          ชำระเงินสำเร็จ!
        </div>
      )}

      {/* Components */}
      <TripSummary onDeductAmountChange={handleDeductAmountChange} />
      <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />

      {/* Continue Button */}
      <div className="flex justify-end w-3/4 mx-auto">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`${
            isProcessing ? 'bg-gray-400' : 'bg-teal-500 hover:bg-teal-600'
          } text-white px-6 py-2 rounded cursor-pointer`}
        >
          {isProcessing ? 'กำลังดำเนินการ...' : 'ชำระเงิน'}
        </button>
      </div>
    </div>
  );
}

export default PaymentDetails;
