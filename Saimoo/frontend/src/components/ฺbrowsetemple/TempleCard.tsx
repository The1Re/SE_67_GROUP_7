import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import DataLoading from "../DataLoading";
import { getFile } from "@/services/fileupload";

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

const TempleCard = ({ isSelectMode = false, searchTerm, selectedFilter }) => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/temples");
        const data = res.data.data;
        console.log(data);
        setTemples(
          data.map((v) => ({
            id: v.id,
            name: v.name,
            latitude: v.latitude,
            longtitude: v.longitude,
            province: v.Province?.name || "ไม่ระบุ",
            description: v.Temple[0]?.description || "ไม่มีคำอธิบาย",
            like: v.Temple[0]?.likes || 0,
            imageUrl: v.Temple[0]?.TempleImage[0]?.imagePath || null,
          }))
        );
        setLoading(false)
      } catch (error) {
        console.error("Error fetching temples:", error);
      }
    };

    fetchData();
  }, []);

  // Inside TempleCard.tsx
  const filteredTemples = temples
  .filter((temple) => {
    // กรองตามชื่อวัด
    if (
      searchTerm &&
      !temple.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  })
  .sort((a, b) => {
    // ✅ เรียงลำดับตามยอดนิยม
    if (selectedFilter === "ยอดนิยม") {
      return b.like - a.like; // เรียงจากมากไปน้อย
    }
    // ✅ เรียงลำดับตามใหม่ล่าสุด
    if (selectedFilter === "ใหม่ล่าสุด") {
      return b.id! - a.id!;
    }
    return 0;
  });

// Then use filteredTemples instead of temples in your rendering
  const handleClick = (templeId: number) => {
    if (isSelectMode) {
      navigate(`/temples/${templeId}`, {
        state: { createMode: true },
      });
    } else {
      navigate(`/temples/${templeId}`);
    }
  };

  if (loading) {
    return <DataLoading />
  }

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTemples.length > 0 ? (
          filteredTemples.map((temple) => (
            <div
              key={temple.id}
              onClick={() => handleClick(temple.id)} // 
              className="bg-white p-4 cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              {temple.imageUrl ? (
                <img
                  src={temple.imageUrl ? getFile(temple.imageUrl) : ""}
                  alt={temple.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">ไม่มีรูปภาพ</span>
                </div>
              )}
  
              <h3 className="text-gray-800 font-bold mt-2">{temple.name}</h3>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-600 text-sm">
                        {temple.description || "ไม่มีคำอธิบาย"}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center pr-5">
                        <span className="ml-1">❤️ {temple.like || 0}</span>
                    </p>
                </div>
                <span className="text-sm text-gray-600">{temple.province || 0}</span>
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
