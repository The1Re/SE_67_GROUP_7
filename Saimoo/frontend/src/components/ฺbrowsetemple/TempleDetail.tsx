import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "@/api";

const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isFromTripDay = location.state?.fromTripDay === true;

  useEffect(() => {
    if (!id) return;

    const fetchTempleDetail = async () => {
      try {
        const res = await api.get(`/temples/${id}`);
        setTemple(res.data);
      } catch (error) {
        console.error("Error fetching temple detail:", error);
      }
    };

    fetchTempleDetail();
  }, [id]);

  const handleSelectTemple = () => {
    const selectedTemple = {
      name: temple.name,
      address: temple.address,
      lat: temple.latitude,
      lng: temple.longitude,
    };
  
    // 👇 เก็บไว้ชั่วคราวใน sessionStorage
    sessionStorage.setItem("selectedTemple", JSON.stringify(selectedTemple));
  
    // 👈 กลับไปหน้าเดิม โดยไม่รีโหลดใหม่ (รักษา state หน้า plan-trip)
    navigate("/plan-trip", { replace: true });
  };

  if (!id || !temple) {
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800">{temple.name}</h1>

      {temple.imageUrl ? (
        <img
          src={temple.imageUrl}
          alt={temple.name}
          className="w-full h-80 object-cover rounded-lg mt-4"
        />
      ) : (
        <div className="w-full h-80 bg-gray-300 flex items-center justify-center rounded-lg mt-4">
          <span className="text-gray-500">ไม่มีรูปภาพ</span>
        </div>
      )}

      <p className="text-gray-600 mt-4">
        {temple.Temple?.[0]?.description || "ไม่มีคำอธิบาย"}
      </p>
      <p className="text-gray-500 text-sm mt-2">จังหวัด: {temple.province}</p>
      <p className="text-gray-500 text-sm mb-4">
        ถูกใจ: {temple.Temple?.[0]?.likes ?? 0}
      </p>

      {isFromTripDay && (
        <button
          onClick={handleSelectTemple}
          className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
        >
          ✅ เพิ่มวัดนี้ในแผนทริป
        </button>
      )}
    </div>
  );
};

export default TempleDetail;
