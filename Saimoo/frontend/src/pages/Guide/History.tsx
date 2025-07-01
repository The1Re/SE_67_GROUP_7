import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api";
import PackageCard from "@/components/historyguidetrip/PackageCard";
import { useAuth } from "@/context/AuthContext";
import { Trip } from "@/models/Trip";
import DataLoading from "@/components/DataLoading";


const HistoryTrip: React.FC = () => {
  const [packages, setPackages] = useState([]); // ✅ ใช้ข้อมูลจาก API
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [trip, setTrip] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  // 📚 ดึงข้อมูลจาก API
  const fetchPackages = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        setError("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
        setIsLoading(false);
        return;
      }

      const res = await axios.get("/trips");

      console.log("📚 ข้อมูลที่ได้จาก API:", res.data.data);

      // Filter trips where ownerTripId matches the current user's ID
      const filteredTrips = res.data.data.filter(
        (trip) => trip.ownerTripId === userId
      );
      setTrip(filteredTrips)
      console.log("📚 ข้อมูลหลังการกรอง:", filteredTrips);

      const formattedData = filteredTrips.map((trip: any) => ({
        id: trip.id,
        title: trip.title,
        image:
          trip.TripPicture?.length > 0
            ? `${trip.TripPicture[0].imagePath}`
            : "/assets/imagetemple/8.jpg",
        status: trip.status,
        date: new Date(trip.dateStart).toLocaleDateString(),
        description: trip.description,
        type: trip.type,
        price: trip.price,
        showDetails: true,
        subtitle: trip.type === "paid" ? `ราคา: ${trip.price} บาท` : "ฟรี",
        TripDetail: trip.TripDetail,
      }));

      setPackages(formattedData);
      setIsLoading(false);
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดข้อมูลแพ็คเกจได้:", err);
      setError("ไม่สามารถโหลดข้อมูลแพ็คเกจได้ ❗️");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // ✅ ฟังก์ชันสร้างทริปใหม่
  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  // ✅ ฟังก์ชันดูรายละเอียดทริป
  const handleViewTrip = (tripId: number) => {
    console.log("🔍 tripId ที่ส่งไปยัง document:", tripId);
    navigate(`/document/${tripId}`);
  };

  // ✅ ฟังก์ชันคัดลอกทริปและส่งข้อมูลไป create-trip
  const handleCloneTrip = (trip: Trip) => {
    console.log("📋 กำลังคัดลอกทริป:", trip);
    const d: Trip = {...trip, TripPicture: trip.TripPicture[0]} // ✅ คัดลอกข้อมูลทริป
    navigate("/create-trip", { state: { clonedTrip: d } });
  };

  // ✅ ฟังก์ชันยกเลิกทริป
  const handleCancelTrip = (tripId: number) => {
    navigate(`/TripCancel/${tripId}`);
  };

  if (isLoading) {
    return <DataLoading />
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-5 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ทริปของฉัน</h1>
        <div className="h-1 w-20 bg-teal-500 mx-auto"></div>
      </header>

      <div className="mb-6 flex justify-end">
        <button
          className="bg-teal-500 text-white py-2 px-6 rounded hover:bg-teal-600 cursor-pointer"
          onClick={handleCreateTrip}
        >
          สร้างทริปใหม่
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              onViewTrip={() => handleViewTrip(pkg.id)}
              onCancelTrip={() => handleCancelTrip(pkg.id)}
              onClone={() => handleCloneTrip(trip.find(v => v.id === pkg.id))} // ✅ คัดลอกทริปพร้อมข้อมูล
              onCreateTrip={handleCreateTrip}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">ยังไม่มีทริปที่แสดง</p>
        )}
      </div>
    </div>
  );
};

export default HistoryTrip;
