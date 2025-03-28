import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import DataLoading from "../DataLoading";
import { getFile } from "@/services/fileupload";

export type Temple = {
  id?: number;
  name: string;
  latitude?: number;
  longitude?: number; // แก้ไขจาก longtitude เป็น longitude
  province: string;
  description?: string;
  like: number;
  imageUrl?: string;
  usetempleId?: number;
};

const TempleCard = ({ isSelectMode = false }) => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
            longitude: v.longitude, // แก้ไขตรงนี้
            province: v.Province?.name || "ไม่ระบุ",
            description: v.Temple[0]?.description || "ไม่มีคำอธิบาย",
            like: v.Temple[0]?.likes || 0,
            imageUrl: v.Temple[0]?.TempleImage[0]?.imagePath || null,
            usetempleId : v.Temple[0]?.id || null,
          }))
        );
      } catch (error) {
        console.error("Error fetching temples:", error);
      } finally {
        setLoading(false); // ย้ายมาที่ finally
      }
    };

    fetchData();
  }, []);

  const handleClick = (templeId: number) => {
    navigate(`/temples/${templeId}`, {
      state: isSelectMode ? { createMode: true } : undefined,
    });
  };

  const handleLike = async (usetempleId: number) => {
    try {
      const temple = temples.find((t) => t.usetempleId === usetempleId);
      if (!temple) return;
  
      const isLiked = localStorage.getItem(`liked_temple_${usetempleId}`) === "true";
  
      if (isLiked) {
        await api.put(`/temples/unlike/${usetempleId}`);
        localStorage.removeItem(`liked_temple_${usetempleId}`);
      } else {
        await api.put(`/temples/like/${usetempleId}`);
        localStorage.setItem(`liked_temple_${usetempleId}`, "true");
      }
  
      // ✅ อัปเดต state โดยใช้ usetempleId ให้ถูกต้อง
      setTemples((prevTemples) =>
        prevTemples.map((t) =>
          t.usetempleId === usetempleId ? { ...t, like: t.like + (isLiked ? -1 : 1) } : t
        )
      );
    } catch (error) {
      console.error("Error liking/unliking temple:", error);
    }
  };
  

  if (loading) {
    return <DataLoading />;
  }

  const isAuth = Boolean(localStorage.getItem("token"));

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {temples.map((temple) => (
          <div
            key={temple.id}
            onClick={() => handleClick(temple.id!)}
            className="bg-white p-4 cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            {temple.imageUrl ? (
              <img
                src={getFile(temple.imageUrl)}
                alt={temple.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">ไม่มีรูปภาพ</span>
              </div>
            )}

            <h3 className="text-gray-800 font-bold mt-2">{temple.name}</h3>
            <p className="text-gray-600 text-sm">{temple.description}</p>
            <span className="text-sm text-gray-600">{temple.province}</span>

            {/* Like Button */}
            {isAuth && (
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(temple.usetempleId!); // ✅ ใช้ usetempleId แทน temple.id
                  }}
                  className="text-gray-600 text-sm flex items-center pr-5 cursor-pointer rounded-lg hover:bg-red-600 transition"
                >
                  ❤️ Like
                </button>
                <p className="text-gray-600 text-sm flex items-center pr-5">
                  <span className="ml-1">{temple.like}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempleCard;
