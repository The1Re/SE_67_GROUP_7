import { useEffect, useState } from "react";
import TripRow from "@/components/history/TripRow";
import TripDetailModal from "@/components/status/TripDetailModal";
import api from "@/api";
import { OrderResponse } from "@/models/Order";

interface Trip {
  id: number;
  name: string;
  date: string;
  status: string;
}

function convertStatus(status: string) {
  switch (status) {
    case "paid": return "จ่ายแล้ว";
    case "pending": return "รอดำเนินการ";
    case "claimed": return "เครมแล้ว";
    case "in_progress": return "กำลังอยู่ในทริป";
    case "success": return "สำเร็จ";
    case "canceled": return "ยกเลิกแล้ว";
    default: return "ไม่ทราบสถานะ";
  }
}

function HistoryTrip() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");

        const res = await api.get<OrderResponse[]>("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const orders: OrderResponse[] = res.data;
        const tripTitles: Record<number, string> = {};

        await Promise.all(
          orders.map(async (order) => {
            if (!tripTitles[order.tripId]) {
              try {
                const tripRes = await api.get<{ title: string }>(`/trips/${order.tripId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                tripTitles[order.tripId] = tripRes.data.title;
              } catch (error) {
                if (error instanceof Error) {
                  console.error("โหลดข้อมูลผิดพลาด:", error.message);
                  setError(error.message);
                } else {
                  setError("เกิดข้อผิดพลาด");
                }
              }
            }
          })
        );

        const transformed: Trip[] = orders.map((order) => ({
          id: order.id,
          name: tripTitles[order.tripId],
          date: new Date(order.createdAt).toLocaleDateString("th-TH", {
            year: "numeric", month: "long", day: "numeric",
          }),
          status: convertStatus(order.status),
        }));

        setTrips(transformed);
      } catch (err) {
        if (err instanceof Error) {
          console.error("❌ โหลดข้อมูลผิดพลาด:", err.message);
          setError(err.message);
        } else {
          setError("เกิดข้อผิดพลาด");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="p-8 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-6">ประวัติการซื้อทริป</h2>

      {loading ? (
        <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full bg-white text-left rounded-xl">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-4">ชื่อทริป</th>
                <th className="p-4">วันที่</th>
                <th className="p-4">สถานะ</th>
                <th className="p-4 text-center">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <TripRow key={trip.id} {...trip} onView={() => handleView(trip)} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TripDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trip={selectedTrip}
      />
    </div>
  );
}

export default HistoryTrip;
