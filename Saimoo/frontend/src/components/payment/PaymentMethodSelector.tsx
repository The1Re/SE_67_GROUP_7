import { useState, useEffect } from "react";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onSelect }: PaymentMethodSelectorProps) => {
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Delay เพิ่ม smoothness
    const timeout = setTimeout(() => {
      setShowQR(selectedMethod === "promptpay");
    }, 10);
    return () => clearTimeout(timeout);
  }, [selectedMethod]);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
      <p className="font-semibold m-4">วิธีการชำระเงิน</p>

      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 mt-3">
          <input
            type="radio"
            name="payment"
            value="promptpay"
            checked={selectedMethod === "promptpay"}
            onChange={(e) => onSelect(e.target.value)}
            className="cursor-pointer"
          />
          พร้อมเพย์
        </label>

        <div
          className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${
            showQR ? "max-h-[300px] opacity-100 scale-100 mt-2" : "max-h-0 opacity-0 scale-95"
          }`}
        >
          <div className="p-4 border border-dashed border-gray-400 rounded bg-gray-50 w-fit">
            <div className="w-50 h-50 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">QR Code Box</span>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="wallet"
            checked={selectedMethod === "wallet"}
            onChange={(e) => onSelect(e.target.value)}
            className="cursor-pointer"
          />
          เงินจากกระเป๋า
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
