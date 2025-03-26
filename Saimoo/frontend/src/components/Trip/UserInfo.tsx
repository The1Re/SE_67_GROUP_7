import { useAuth } from "@/context/AuthContext";
import { useTrip } from "@/context/TripContext";

const UserInfo = () => {
  const { user } = useAuth();
  const { trip, setTrip } = useTrip();

  const handleCreateTrip = () => {
    setTrip({ ...trip, ownerTripId: user.id });
    console.log(`สร้างทริปสำเร็จ!`);
    console.log(trip);
  };

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md ">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div>
          <p className="font-bold">{user.username}</p>
          <p className="text-gray-500 text-sm">สร้างเมื่อ 28 ต.ค. 2566</p>
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
            สร้าง
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
