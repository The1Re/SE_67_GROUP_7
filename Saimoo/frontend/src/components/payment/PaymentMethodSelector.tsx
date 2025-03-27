interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onSelect }: PaymentMethodSelectorProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
      <p className="font-semibold m-4">วิธีการชำระเงิน</p>

      <div className="flex flex-col gap-4">
        {/* PromptPay - ไม่พร้อมใช้งาน */}
        <label className="flex items-center gap-2 mt-3">
          <input
            type="radio"
            name="payment"
            value="promptpay"
            checked={false} // ห้ามเลือก
            onChange={() => {
              alert("พร้อมเพย์ยังไม่พร้อมใช้งาน กรุณาเลือกวิธีอื่น");
            }}
            className="cursor-pointer"
          />
          พร้อมเพย์ (ยังไม่พร้อมใช้งาน)
        </label>

        {/* Wallet */}
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
