import React, { useEffect, useState } from "react";
import InfoTemple from "../../components/profiletemple/InfoTemple";
import TempleTab from "../../components/profiletemple/TempleTab";
import { useAuth } from "../../context/AuthContext";
import api from "@/api";

const TemplePage: React.FC = () => {
  const { user } = useAuth();
  const [templeId, setTempleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAllTemples = async () => {
      try {
        let allTemples: any[] = [];

        // ดึงหน้าแรก
        const firstResponse = await api.get(`/temples?page=1`);
        const { data: firstData, pagination } = firstResponse.data;

        if (!Array.isArray(firstData)) {
          console.error("Unexpected API response:", firstData);
          return;
        }

        allTemples = [...firstData];

        let totalPages = pagination.totalPages;
        let currentPage = 2;

        // ดึงหน้าที่เหลือ
        while (currentPage <= totalPages) {
          const response = await api.get(`/temples?page=${currentPage}`);
          const { data } = response.data;

          if (!Array.isArray(data)) {
            console.error("Unexpected API response:", data);
            return;
          }

          allTemples = [...allTemples, ...data];
          currentPage++;
        }

        console.log("Fetched all temples:", allTemples);

        // ค้นหาวัดที่ user เป็นเจ้าของ
        const ownedTemple = allTemples.find((t) =>
          t.Temple.some((temple: any) => temple.ownerId === user.id)
        );

        if (ownedTemple) {
          setTempleId(ownedTemple.id);
        } else {
          console.warn("No temple found for this user");
        }
      } catch (error) {
        console.error("Error fetching temples:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTemples();
  }, [user]);

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (!templeId) return <p>คุณยังไม่มีวัดในระบบ</p>;

  return (
    <div className="p-6">
      <InfoTemple templeId={templeId} />
      <TempleTab templeId={templeId} />
    </div>
  );
};

export default TemplePage;
