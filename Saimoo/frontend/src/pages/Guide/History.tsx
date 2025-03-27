import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Trip {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  vehicle: string;
  maxPerson: number;
  status: string;
  ownerTripId: number;
  type: string;
  price: number;
}

const HistoryTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [updatedTrip, setUpdatedTrip] = useState<Partial<Trip>>({});
  const navigate = useNavigate();

  // 📚 ดึงข้อมูลทริปจาก API
  const fetchUserTrips = async () => {
    try {
      const response = await axios.get("/api/trips", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTrips(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("ไม่สามารถโหลดข้อมูลทริปได้ ❗️");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTrips();
  }, []);

  // 📚 เปิด Modal เพื่อแก้ไขทริป
  const handleOpenEditModal = (trip: Trip) => {
    try {
      setSelectedTrip(trip);
      setUpdatedTrip({
        title: trip.title,
        price: trip.price,
        dateStart: trip.dateStart,
      });
      setIsEditModalOpen(true);
    } catch (err) {
      console.error("❌ เปิด Modal ล้มเหลว:", err);
    }
  };

  // 📚 ปิด Modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTrip(null);
    setUpdatedTrip({});
  };

  // 📚 อัปเดตทริป
  const handleUpdateTrip = async () => {
    if (!selectedTrip) return;

    try {
      const token = localStorage.getItem("accessToken");

      // ตรวจสอบราคาและป้องกัน NaN
      const price = parseFloat(updatedTrip.price as any);
      if (isNaN(price)) {
        alert("ราคาที่ป้อนไม่ถูกต้อง ❗️");
        return;
      }

      const res = await axios.put(
        `/api/trips/${selectedTrip.id}`,
        {
          ...updatedTrip,
          price, // ✅ อัปเดตราคาแบบปลอดภัย
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        alert("อัปเดตทริปสำเร็จ! 🎉");
        fetchUserTrips(); // ✅ ดึงข้อมูลใหม่
        handleCloseEditModal(); // ✅ ปิด Modal หลังอัปเดต
      }
    } catch (err) {
      console.error("❌ ไม่สามารถอัปเดตทริปได้:", err);
      alert("เกิดข้อผิดพลาดในการอัปเดตทริป ❗️");
    }
  };

  if (isLoading) {
    return <div className="text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">ทริปของฉัน</h1>

      <div className="grid gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="border rounded p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">{trip.title}</h2>
            <p>สถานะ: {trip.status}</p>
            <p>วันที่เริ่ม: {new Date(trip.dateStart).toLocaleDateString()}</p>
            <p>
              ประเภท: {trip.type === "paid" ? "ทริปแบบชำระเงิน" : "ทริปฟรี"}
            </p>
            <p>ราคา: {trip.price} บาท</p>
            <p>จำนวนผู้เข้าร่วม: {trip.maxPerson} คน</p>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/trip-details/${trip.id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                ดูรายละเอียด
              </button>
              <button
                onClick={() => navigate("/plan-trip", { state: { clonedTrip: trip } })}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                คัดลอกทริป
              </button>
              <button
                onClick={() => handleOpenEditModal(trip)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                อัปเดตทริป
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📚 Modal แก้ไขข้อมูล */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseEditModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // ✅ ป้องกันปิดเมื่อคลิกใน Modal
          >
            <h2 className="text-lg font-bold mb-4">แก้ไขข้อมูลทริป</h2>

            <label className="block mb-2">ชื่อทริป:</label>
            <input
              type="text"
              value={updatedTrip.title || ""}
              onChange={(e) =>
                setUpdatedTrip({ ...updatedTrip, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mb-4"
            />

            <label className="block mb-2">ราคา:</label>
            <input
              type="number"
              value={updatedTrip.price || ""}
              onChange={(e) =>
                setUpdatedTrip({
                  ...updatedTrip,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded mb-4"
            />

            <label className="block mb-2">วันที่เริ่ม:</label>
            <input
              type="date"
              value={updatedTrip.dateStart?.split("T")[0] || ""}
              onChange={(e) =>
                setUpdatedTrip({ ...updatedTrip, dateStart: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseEditModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleUpdateTrip}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/create-trip")}
        className="bg-teal-500 text-white px-4 py-2 rounded mt-4"
      >
        สร้างทริปใหม่
      </button>
    </div>
  );
};

export default HistoryTrip;
