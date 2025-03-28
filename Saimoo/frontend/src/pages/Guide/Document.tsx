import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataLoading from "@/components/DataLoading";
import api from "@/api";

interface TripOrderDetail {
  id: number;
  orderId: number;
  order: number;
  fullName: string;
  phone: string | null;
  requirement: string | null;
  isChild: number;
  identityCode: string;
  isJoined: number;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface Order {
  id: number;
  userId: number;
  TripOrderDetail: TripOrderDetail[];
  User: User;
}

const DocumentPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/trips/${tripId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [tripId]);

  if (loading) return <DataLoading />;

  let index = 1;

  return (
    <div className="py-6 p-24">
      <h2 className="text-xl font-semibold mb-4">รายชื่อลูกทริป</h2>
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ลำดับ</th>
            <th className="border px-4 py-2 text-left">Username ผู้จอง</th>
            <th className="border px-4 py-2 text-left">ชื่อ-นามสกุล</th>
            <th className="border px-4 py-2 text-left">เป็นเด็ก?</th>
            <th className="border px-4 py-2 text-left">เบอร์โทร</th>
            <th className="border px-4 py-2 text-left">ความต้องการพิเศษ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.TripOrderDetail.map((member) => (
              <tr key={member.id}>
                <td className="border px-4 py-2">{index++}</td>
                <td className="border px-4 py-2">{order.User?.username || "-"}</td>
                <td className="border px-4 py-2">{member.fullName}</td>
                <td className="border px-4 py-2">
                  {member.isChild ? "เด็ก" : "ผู้ใหญ่"}
                </td>
                <td className="border px-4 py-2">{member.phone || "-"}</td>
                <td className="border px-4 py-2">{member.requirement || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentPage;
