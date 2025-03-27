import { useEffect, useState } from "react";
import api from "@/api";

interface Participant {
  fullName: string;
  identityCode: string;
}

interface StatusInProgressProps {
  orderId: number;
}

const StatusInProgress = ({ orderId }: StatusInProgressProps) => {
  const [showCode, setShowCode] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/orders/${orderId}/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setParticipants(res.data);
      } catch (err) {
        console.error("❌ โหลดข้อมูลผู้ร่วมทริปล้มเหลว:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [orderId]);

  return (
    <div className="mt-4 pt-4">
      <h3 className="font-semibold mb-2">รายชื่อ</h3>
      {loading ? (
        <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {participants.map((p, idx) => (
            <div key={idx} className="flex justify-between items-center px-4 py-2 rounded">
              <p>{p.fullName}</p>
              <button
                onClick={() => setShowCode(p.identityCode)}
                className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 cursor-pointer"
              >
                ดู code
              </button>
            </div>
          ))}

          {/* ปุ่มยกเลิก */}
          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
            onClick={() => alert("ยกเลิกทริปเรียบร้อย")} // แก้ให้เชื่อม API ได้ภายหลัง
          >
            ยกเลิก
          </button>
        </div>
      )}

      {/* Popup แสดง code */}
      {showCode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-md text-center">
            <p className="font-semibold mb-2">Identity CODE</p>
            <p className="text-2xl font-bold font-mono">{showCode}</p>
            <button
              onClick={() => setShowCode(null)}
              className="mt-4 text-sm text-gray-500 underline cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusInProgress;
