import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useTrip } from "@/context/TripContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from '@/models/User'
import { convertDateTimeToThaiFormat } from '@/utils/TimeFormat'

const UserInfo = () => {
  const { user } = useAuth();
  const { trip, setTrip } = useTrip();
  const [isProcessing, setIsProcessing] = useState(false);
  const [ userData, setUserData ] = useState<User>(null);
  const navigate = useNavigate();

  const handleCreateTrip = () => {
    setIsProcessing(true);
    setTrip({ ...trip, ownerTripId: user.id });
    console.log("ownerTrip: ", user.id)
    console.log(trip)
    api.post("/trips", trip, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        toast.success("สร้างทริปสำเร็จ");
        navigate(`/trips`);
        sessionStorage.clear();
      })
      .catch(() => {
        toast.error("สร้างทริปไม่สำเร็จ");
      }).finally(() => {
        setIsProcessing(false);
      })
  };

  useEffect(() => {
    api.get(`/users/${user.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        console.log(res.data)
        setUserData(res.data);
      })
      .catch(() => {
        toast.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      });
  }, [user])

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md ">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div>
          <p className="font-bold">{user.username}</p>
          <p className="text-gray-500 text-sm">สร้างเมื่อ {convertDateTimeToThaiFormat(new Date(userData?.createdAt ?? Date()), false)}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {
            user.role === "guide" && (
              <div className="inline-flex items-center rounded-md bg-gray-300 p-1">
                <button
                  onClick={() => setTrip({ ...trip, type: "free", price: 0 })}
                  className={`cursor-pointer px-4 py-1 text-sm rounded-md font-bold transition-colors duration-300 ${
                    trip.type === "free" ? "bg-teal-400 text-white" : "text-black"
                  }`}
                >
                  แชร์
                </button>
                <button
                  onClick={() => setTrip({ ...trip, type: "paid" })}
                  className={`cursor-pointer px-4 py-1 text-sm rounded-md font-bold transition-colors duration-300 ${
                    trip.type === "paid" ? "bg-teal-400 text-white" : "text-black"
                  }`}
                >
                  ขาย
                </button>
              </div>
            )
          }
          <button 
            className="px-6 py-2 bg-teal-400 text-white rounded-lg font-bold hover:bg-teal-500 transition cursor-pointer"
            onClick={handleCreateTrip}
          >
            {isProcessing ? "กำลังสร้าง..." : "สร้าง"}
          </button>
        </div>
        {
          trip.type === "paid" && (
          <div className="flex flex-col mt-4">
            <label className="font-bold text-gray-500">ราคา</label>
            <input
              type="number"
              min="0"
              value={trip.price}
              onChange={(e) => setTrip({ ...trip, price: Number(e.target.value) })}
              placeholder="ราคา"
              className="mt-2 p-1 border border-gray-300 rounded-lg text-center w-full max-w-[150px] bg-gray-200 text-gray-700"
            />
          </div>
          )
        }
        <div className="flex flex-col mt-4">
          <label className="font-bold text-gray-500">จำนวนคนมากที่สุด</label>
          <input
            type="number"
            min="1"
            value={trip.maxPerson}
            onChange={(e) => setTrip({ ...trip, maxPerson: Number(e.target.value) })}
            placeholder="จำนวนคนมากที่สุด"
            className="mt-2 p-1 border border-gray-300 rounded-lg text-center w-full max-w-[150px] bg-gray-200 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
