import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "@/api";
import InfoTemple from "../profiletemple/InfoTemple";
import TempleTab from "../profiletemple/TempleTab";

const TempleDetail = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isCreateMode = location.state?.createMode === true;

  useEffect(() => {
    if (!id) return;

    const fetchTempleDetail = async () => {
      try {
        const res = await api.get(`/temples/${id}`);
        console.log(res)
        setTemple(res.data);
      } catch (error) {
        console.error("Error fetching temple detail:", error);
      }
    };

    fetchTempleDetail();
  }, [id]);

  const handleSelectTemple = () => {
    navigate("/create-trip", { replace: true, state: { temple }});
  };

  if (!id || !temple) {
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="p-6">
      <InfoTemple templeId={Number(id)} isCreateMode={isCreateMode} callback={handleSelectTemple} />
      <TempleTab templeId={Number(id)} />
    </div>
  );
};

export default TempleDetail;
