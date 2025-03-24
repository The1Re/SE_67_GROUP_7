interface TripSummaryProps {
    tripPrice: number;
    walletBalance: number;
    peopleCount: number;
  }
  
  const TripSummary = ({ tripPrice, walletBalance, peopleCount }: TripSummaryProps) => {
    const total = tripPrice * peopleCount;
    const discountedTotal = total - walletBalance;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
        <h2 className="text-lg font-bold">ไหว้พระ สุพรรณ อิ่มบุญอิ่มใจ</h2>
        <h3 className="mb-2">กำหนดการ 5 ธ.ค. 2568 [ 1 Day ]</h3>
        <h2 className="text-3xl font-bold mb-4">{tripPrice.toLocaleString()} ฿ / คน</h2>
        <p>จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {peopleCount} คน</p>
        <p>
          เงินคงเหลือในกระเป๋า:{" "}
          <span className="text-red-600">-{walletBalance.toLocaleString()} ฿</span>
        </p>
  
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">
            {tripPrice.toLocaleString()} x {peopleCount} = {total.toLocaleString()} ฿
          </p>
          <p className="text-sm text-red-500">-{walletBalance.toLocaleString()} ฿</p>
          <h1 className="text-2xl font-bold mt-2">
            รวม {discountedTotal.toLocaleString()} ฿
          </h1>
        </div>
      </div>
    );
  };
  
  export default TripSummary;
  