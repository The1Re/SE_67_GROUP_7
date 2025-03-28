import { getFile } from "@/services/fileupload";
import React from "react";

interface PackageCardProps {
  packageData: {
    id: number;
    title: string;
    image: string;
    status: string;
    showDetails: boolean;
    subtitle?: string;
    date?: string;
    description?: string;
  };
  onViewTrip: () => void;
  onClone: () => void;
  onCancelTrip: () => void;
  onCreateTrip: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  packageData,
  onViewTrip,
  onClone,
  onCancelTrip,
  onCreateTrip,
  
}) => {
  console.log(packageData)
  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <img
        src={getFile(packageData.image)}
        alt={packageData.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{packageData.title}</h2>
      <p>สถานะ: {packageData.status}</p>
      {packageData.date && <p>วันที่เริ่ม: {packageData.date}</p>}
      <p>ราคา: {packageData.subtitle || "ไม่ระบุ"}</p>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={onViewTrip}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          ดูรายละเอียด
        </button>
        <button
          onClick={onClone}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          คัดลอกทริป
        </button>
        {
          packageData.status !== "cancel" && (
            <button
              onClick={onCancelTrip}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              ยกเลิกทริป
            </button>
          )
        }
      
      </div>
    </div>
  );
};

export default PackageCard;
