interface TripSummaryCardProps {
    tripPrice: number;
    peopleCount: number;
    walletBalance: number;
  }
  
  const TripSummaryCard = ({ tripPrice, peopleCount, walletBalance }: TripSummaryCardProps) => {
    const total = tripPrice * peopleCount;
    const discountedTotal = total - walletBalance;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
        <h2 className="text-lg font-bold mb-1">
          ไหว้พระ สุพรรณ อิ่มบุญอิ่มใจ
          <span className="font-semibold text-sm text-gray-600"> (แพ็กเกจสำหรับ 1 คน)</span>
        </h2>
        <h3 className="mb-4">กำหนดการ 5 ธ.ค. 2568 [ 1 Day ]</h3>
  
        <h3 className="mb-1">จำนวนคนที่เข้าร่วมทริป (ผู้ใหญ่): {peopleCount} คน</h3>
        <h3 className="mb-4">เงินคงเหลือในกระเป๋า: <span className="text-gray-700">นำมาใช้ลด</span></h3>
  
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {tripPrice.toLocaleString()} x {peopleCount} = {total.toLocaleString()} ฿
          </p>
          <p className="text-sm text-red-500">-{walletBalance.toLocaleString()} ฿</p>
          <h1 className="text-2xl font-bold mt-2">รวม {discountedTotal.toLocaleString()} ฿</h1>
        </div>
      </div>
    );
  };
  
  export default TripSummaryCard;
  