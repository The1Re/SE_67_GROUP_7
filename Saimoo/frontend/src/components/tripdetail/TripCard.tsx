import api from "@/api";
import { useEffect, useState } from "react";
import { FaCar, FaClock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export interface Trip {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  vehicle: string;
  maxPerson: number;
  status: string;
  ownerTripId: number;
  type: string;
  price: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const TripCard = () => {
  const { tripId: tripIdParam } = useParams();
  const tripId = Number(tripIdParam) || 1;

  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
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
        const res = await api.get(`/users/${trip?.ownerTripId}`);
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

  return (
    <div className="max-w-full w-full mx-auto p-6 ">
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
            </h1>//ติดที่ API ไม่ดึงข้อมูลเพราะติด token
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
        {/* 🔹 ปุ่มซื้อทริป*/}
        <div className="flex flex-col items-end gap-3">
          <button
            onClick={() => navigate("/trips/purchaser")}
            className="cursor-pointer flex items-center gap-1 whitespace-nowrap rounded-lg border border-teal-500 px-6 py-3 font-semibold text-teal-500 shadow-sm duration-300 hover:bg-teal-500 hover:text-white"
          >
            ซื้อทริป
          </button>
          <div className="flex flex-col items-end gap-1">
            <p className="text-2xl font-extrabold text-black">
              {formatPrice(trip?.price)}
            </p>
            <h1 className="text-red-500 text-lg font-semibold">2/10</h1> // จำนวนคนเข้าร่วมทริปยังไม่ได้เชื่อมกับ API
            <h3 className="text-red-500 text-lg font-semibold">คนเข้าร่วม</h3>
          </div>
        </div>
      </div>
      <div className="text-[12px] mt-6 border-t text-gray-400"></div>
    </div>
  );
};

export default TripCard;
