import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ใช้สำหรับเปลี่ยนหน้า
import api from "@/api";

export type Temple = {
  id?: number;
  name: string;
  latitude?: number;
  longtitude?: number;
  province: string;
  description?: string;
  like: number;
  imageUrl?: string;
};

const TempleCard = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const navigate = useNavigate(); // ✅ ใช้สำหรับเปลี่ยนหน้า

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/temples");
        const data = res.data.data;
        setTemples(
          data.map((v) => ({
            id: v.id,
            name: v.name,
            latitude: v.latitude,
            longtitude: v.longitude,
            province: v.Province?.name || "ไม่ระบุ",
            description: v.Temple[0]?.description || "ไม่มีคำอธิบาย",
            like: v.Temple[0]?.likes || 0,
            imageUrl: v.Temple?.imageUrl || null,
          }))
        );
      } catch (error) {
        console.error("Error fetching temples:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {temples.length > 0 ? (
          temples.map((temple) => (
            <div
              key={temple.id}
              onClick={() => navigate(`/temples/${temple.id}`)} // 
              className="bg-white p-4 cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              {temple.imageUrl ? (
                <img
                  src={temple.imageUrl}
                  alt={temple.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">ไม่มีรูปภาพ</span>
                </div>
              )}

              <h3 className="text-gray-800 font-bold mt-2">{temple.name}</h3>
              <p className="text-gray-600 text-sm">
                {temple.description || "ไม่มีคำอธิบาย"}
              </p>
            </div>
          ))
        ) : (
          <p>ไม่มีข้อมูลวัด</p>
        )}
      </div>
    </div>
  );
};

export default TempleCard;
