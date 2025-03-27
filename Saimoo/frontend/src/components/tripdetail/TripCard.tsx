import api from "@/api";
import { Trip } from "@/models/Trip";
import { User } from "@/models/User";
import { useEffect, useState } from "react";
import { FaCar, FaClock } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import { MouseEvent } from "react"; 

interface TripCardProps {
  tripId: number;
}

const TripCard: React.FC<TripCardProps> = ({ tripId }) => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("tripIdcard",tripId);
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${tripId}`);
        setTrip(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error); // Changed from err to error
      }
    };
    fetchTrip(); // Also need to call the function
  }, [tripId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${trip?.ownerTripId}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [trip]);

  const calculateRemainingDays = () => {
    if (!trip?.dateStart) return 0;

    const startDate = new Date(trip.dateStart);
    const currentDate = new Date();

    // Calculate difference in milliseconds and convert to days
    const diffTime = startDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const formatThaiDate = (date: Date) => {
    const day = date.getDate();
    const year = date.getFullYear();

    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const month = thaiMonths[date.getMonth()];

    return `${day} ${month} ${year}`;
  };
  const calculateTripDuration = () => {
    if (!trip?.dateStart || !trip?.dateEnd) return 0;

    const startDate = new Date(trip.dateStart);
    const endDate = new Date(trip.dateEnd);

    // Calculate difference in milliseconds and convert to days
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 1; // Return at least 1 day if same day or invalid dates
  };
  const formatThaiDateTime = (date: Date) => {
    const day = date.getDate();
    const year = date.getFullYear() % 100; // Get last two digits of year (Buddhist year - 2500)

    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const month = thaiMonths[date.getMonth()];

    // Format time as HH:MM
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
  };

  const translateVehicle = (vehicleType: string) => {
    switch (vehicleType.toLowerCase()) {
      case "van":
        return "รถตู้";
      case "bus":
        return "รถทัวร์";
      default:
        return vehicleType; // Return the original value if not matching
    }
  };
  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "Loading...";
    return price === 0 ? "FREE" : `${price.toLocaleString()} ฿`;
  };
  // 1. เพิ่ม state สำหรับเก็บจำนวนคนที่เข้าร่วม
  const [participantCount, setParticipantCount] = useState(0);

  // 2. เพิ่ม useEffect เพื่อดึงข้อมูลจำนวนคนที่เข้าร่วม
  useEffect(() => {
    const fetchParticipantCount = async () => {
      if (!trip?.id) return;
  
      try {
        console.log("Fetching participant count for tripId:", trip.id);
  
        // เปลี่ยน URL ให้ถูกต้อง
        const response = await api.get(`/orders?tripId=${trip.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        console.log("API Response:", response.data);
  
        // ตรวจสอบรูปแบบข้อมูลที่ได้รับ
        let count = 0;
        
        // ถ้าข้อมูลเป็น array
        if (Array.isArray(response.data)) {
          count = response.data.reduce((total, order) => {
            return total + (order.amountPerson || 0);
          }, 0);
        } 
        // ถ้าข้อมูลเป็น object ที่มี property เป็น array
        else if (response.data && Array.isArray(response.data.orders)) {
          count = response.data.orders.reduce((total, order) => {
            return total + (order.amountPerson || 0);
          }, 0);
        }
        // ถ้าข้อมูลเป็น object เดี่ยว (กรณีเรียก order เดียว)
        else if (response.data && response.data.amountPerson) {
          count = response.data.amountPerson;
        }
  
        console.log("Calculated participant count:", count);
        setParticipantCount(count);
      } catch (error) {
        console.error("Error fetching participant count:", error);
        setParticipantCount(0);
      }
    };
  
    fetchParticipantCount();
  }, [trip?.id]);
  
  const isTripFull = participantCount === (trip?.maxPerson || 0);

  const handleBuyTrip = (event: MouseEvent<HTMLButtonElement>) => {
    // ป้องกันการ reload หน้าเว็บ
    event.preventDefault();
    
    // ตรวจสอบว่าทริปเต็มหรือไม่
    if (isTripFull) {
      return; // ไม่ทำอะไรถ้าทริปเต็มแล้ว
    }
    
    // ตรวจสอบว่ามีการล็อกอินหรือไม่
    const token = localStorage.getItem("token");
    if (!token) {
      // ถ้ายังไม่ได้ล็อกอิน ให้ redirect ไปหน้าล็อกอิน
      navigate("/login", { state: { from: `/trips/${tripId}` } });
      return;
    }
    
    // ถ้าล็อกอินแล้ว ให้ไปหน้าซื้อทริป
    navigate(`/trips/${tripId}/purchase`);
  };
  

  return (
    <div className="max-w-full w-full mx-auto p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-0">
        {/* 🔹 ผู้สร้าง & วันที่สร้าง */}
        <div className="flex gap-4 px-2 sm:px-0">
          <a
            target="_blank"
            className="flex h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full shadow-sm"
            href="/profile"
          >
            <img
              src="https://i.pravatar.cc/45"
              alt="fernfunnys.journey"
              className="rounded-full object-cover"
            />
          </a>
          <div className="flex flex-col">
            <h1 className="flex-wrap text-xl font-bold">
              {trip ? trip.title : "Loading..."}
            </h1>
            <div className="flex w-full items-center gap-4 mobile:gap-2">
              <a
                target="_blank"
                className="text-[14px] font-medium mobile:max-w-44 truncate hover:underline"
                href="/profile"
              >
                {user ? user.fullName : "Loading..."}
              </a>
            </div>
            <div className="mt-2 flex w-fit items-center justify-start gap-1 text-[11px] text-gray-500">
              <span>เหลือเวลา {trip ? calculateRemainingDays() : 0} วัน</span>
            </div>

            {/* 🔹 รายละเอียดทริป */}
            <div className="mt-3">
              <h1 className="text-gray-700 font-bold">
                กำหนดการ{" "}
                {trip ? formatThaiDate(new Date(trip.dateStart)) : "Loading..."}{" "}
                【{trip ? calculateTripDuration() : "?"} Day】
              </h1>

              <h3 className="text-gray-600 text-lg font-bold flex items-center gap-2">
                <FaClock />{" "}
                {trip
                  ? formatThaiDateTime(new Date(trip.dateStart))
                  : "Loading..."}{" "}
                -{" "}
                {trip
                  ? formatThaiDateTime(new Date(trip.dateEnd))
                  : "Loading..."}
              </h3>

              <h3 className="text-gray-600 text-lg font-bold flex items-center gap-2">
                <FaCar /> เดินทางโดย{" "}
                {trip?.vehicle ? translateVehicle(trip.vehicle) : "Loading..."}
              </h3>

              <p className="mt-3 text-black-500 text-xl leading-relaxed">
                {trip ? trip.description : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* 🔹 ปุ่มซื้อทริป */}
        <div className="flex flex-col items-end gap-3">
        <button
          className={`cursor-pointer px-6 py-2 rounded-md font-semibold ${
            isTripFull
              ? "bg-gray-400 cursor-not-allowed" // สีเทาและไม่สามารถกดได้เมื่อทริปเต็ม
              : "bg-teal-500 text-white hover:bg-teal-600" // สีปกติเมื่อยังมีที่ว่าง
          }`}
          onClick={handleBuyTrip}
          disabled={isTripFull} // ปิดการใช้งานปุ่มเมื่อทริปเต็ม
        >
          {isTripFull ? "ทริปเต็มแล้ว" : "ซื้อทริป"}
        </button>

          <div className="flex flex-col items-end gap-1">
            <p className="text-2xl font-extrabold text-black">
              {formatPrice(trip?.price)}
            </p>
            <h1 className="text-red-500 text-lg font-semibold">
              {participantCount}/{trip?.maxPerson}
            </h1>

            <h3 className="text-red-500 text-lg font-semibold">คนเข้าร่วม</h3>
          </div>
        </div>
      </div>
      <div className="text-[12px] mt-6 border-t text-gray-400"></div>
    </div>
  );
};

export default TripCard;