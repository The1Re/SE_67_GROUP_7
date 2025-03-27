import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TripSummary from "@/components/payment/TripSummary";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import api from "@/api";
import { PaymentRequest } from "@/models/Wallet";

function PaymentDetails() {
  const { orderId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [deductAmount, setDeductAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const { tripId } = useParams<{ tripId: string }>();
  const numericTripId = Number(tripId);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch wallet balance when component mounts
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/wallets', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setWalletBalance(response.data.balance || 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setError("ไม่สามารถดึงข้อมูลกระเป๋าเงินได้");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletBalance();
  }, []);

  // Function to receive deductAmount from TripSummary
  const handleDeductAmountChange = (amount: number) => {
    setDeductAmount(amount);
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // If the trip is free (price is 0), skip the withdrawal process
      if (deductAmount > 0) {
        // Check if user has enough balance
        if (walletBalance < deductAmount) {
          setError("ยอดเงินในกระเป๋าไม่เพียงพอ กรุณาเติมเงินก่อนทำรายการ");
          setIsProcessing(false);
          return;
        }

        if (!paymentMethod) {
          setError("กรุณาเลือกวิธีการชำระเงิน");
          setIsProcessing(false);
          return;
        }
        
        // สร้าง request body
        const withdrawRequest: PaymentRequest = {
          orderId: Number(orderId),
          method: paymentMethod === "wallet" ? "wallet" : "qrcode",
        };
        
        // เรียกใช้ API เฉพาะเมื่อราคาไม่ใช่ 0
        const response = await api.post('/payments/', withdrawRequest, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        console.log("create payment: ", response.data);

        const res = await api.post(`/payments/${response.data.id}/pay`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        
        console.log("ชำระสำเร็จ:", res.data);
      } else {
        console.log("ทริปฟรี ไม่ต้องถอนเงิน");
      }
      
      // ทำการชำระเงินหรือดำเนินการขั้นตอนถัดไป
      setSuccess(true);
      setIsProcessing(false);
      
      const savedOrderId = localStorage.getItem("orderId");
      navigate(`/trips/${numericTripId}/${savedOrderId}/confirm`);
      
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการชำระเงิน:", error);
      setError("เกิดข้อผิดพลาดในการชำระเงิน กรุณาลองใหม่อีกครั้ง");
      setIsProcessing(false);
    }
  };

  // Show loading state while fetching wallet balance
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  const insufficientFunds = deductAmount > 0 && walletBalance < deductAmount;

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

      {/* Wallet Balance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-3/4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">ยอดเงินในกระเป๋า</h2>
          <span className={`text-xl font-bold ${insufficientFunds ? 'text-red-500' : 'text-green-500'}`}>
            {walletBalance.toLocaleString()} บาท
          </span>
        </div>
        
        {insufficientFunds && (
          <div className="mt-2 text-red-500">
            *ยอดเงินไม่เพียงพอสำหรับการชำระค่าทริป ({deductAmount.toLocaleString()} บาท)
            <button 
              onClick={() => window.open('/wallet', '_blank')}
              className="ml-2 text-blue-500 underline"
            >
              เติมเงิน
            </button>
          </div>
        )}
      </div>

      {/* Components */}
      <TripSummary onDeductAmountChange={handleDeductAmountChange} />
      
      {/* Only show payment method selector if the price is not 0 */}
      {deductAmount > 0 && (
        <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
      )}

      {/* Continue Button */}
      <div className="flex justify-end w-3/4 mx-auto">
        <button
          onClick={handlePayment}
          disabled={isProcessing || (deductAmount > 0 && !paymentMethod) || insufficientFunds}
          className={`${
            isProcessing || (deductAmount > 0 && !paymentMethod) || insufficientFunds 
              ? 'bg-gray-400' 
              : 'bg-teal-500 hover:bg-teal-600'
          } text-white px-6 py-2 rounded cursor-pointer`}
        >
          {isProcessing 
            ? 'กำลังดำเนินการ...' 
            : insufficientFunds 
              ? 'ยอดเงินไม่เพียงพอ' 
              : deductAmount > 0 
                ? 'ชำระเงิน' 
                : 'ยืนยันการจอง'
          }
        </button>
      </div>
    </div>
  );
}

export default PaymentDetails;
