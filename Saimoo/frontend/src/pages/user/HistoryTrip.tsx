import TripRow from "@/components/history/TripRow";
import { useEffect, useState } from "react";

interface Trip {
  id: number;
  name: string;
  date: string;
  status: string;
}

function HistoryTrip() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("/assets/fakeHistory.json");
        if (!res.ok) throw new Error("ไม่สามารถโหลดข้อมูลได้");
        const data = await res.json();
        setTrips(data);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="p-8 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold mb-6">History My Trip</h2>

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
                <TripRow
                  key={trip.id}
                  id={trip.id}
                  name={trip.name}
                  date={trip.date}
                  status={trip.status}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoryTrip;
