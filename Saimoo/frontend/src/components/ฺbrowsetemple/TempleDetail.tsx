import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";

const TempleDetail = () => {
  const { id } = useParams(); // ✅ ดึงค่า id จาก URL
  const [temple, setTemple] = useState(null);

  if (!id) {
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  }

  useEffect(() => {
    const fetchTempleDetail = async () => {
      try {
        const res = await api.get(`/temples/${id}`); // ✅ ดึงข้อมูลวัดตาม id
        setTemple(res.data);
      } catch (error) {
        console.error("Error fetching temple detail:", error);
      }
    };

    fetchTempleDetail();
  }, [id]);

  if (!temple) {
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 ">{temple.name} </h1>
      {temple.imageUrl ? (
        <img src={temple.imageUrl} alt={temple.name} className="w-full h-80 object-cover rounded-lg mt-4" />
      ) : (
        <div className="w-full h-80 bg-gray-300 flex items-center justify-center rounded-lg mt-4">
          <span className="text-gray-500">ไม่มีรูปภาพ</span>
        </div>
      )}
      <p className="text-gray-600 mt-4">{temple.Temple[0].description || "ไม่มีคำอธิบาย"}</p>
      <p className="text-gray-500 text-sm mt-2">จังหวัด: {temple.province}</p>
      <p className="text-gray-500 text-sm">ถูกใจ: {temple.Temple[0].likes}</p>
    </div>
  );
};

export default TempleDetail;
