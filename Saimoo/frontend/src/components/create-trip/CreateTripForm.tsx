import { useState, useMemo } from 'react';
import { useTrip } from '@/context/TripContext';
import UploadImage from '../Trip/UploadImage';
import MyMap from '../map/MyMap';
import TripForm from './TripForm';
import TripDetailList from './TripDetailList';
import { useLocation } from 'react-router-dom';

function CreateTripForm() {
  const { trip, numDay, saveState } = useTrip();
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const temple = location.state?.temple;

  // ✅ กรณีรับข้อมูลวัดจากหน้าอื่นมา และกำหนดให้กับ TripDetail
  if (temple) {
    const tripDetailId = Number(sessionStorage.getItem('tripDetailId'));
    const target = trip.TripDetail.find(detail => detail.id === tripDetailId);
    if (target) {
      target.Location = temple;
      sessionStorage.removeItem('tripDetailId');
      saveState();
    }
  }

  // ✅ คำนวณเฉพาะตำแหน่งของสถานที่ในวันที่เลือก
  const locations = useMemo(() => {
    return trip.TripDetail
      .filter(detail => 
        detail.day === selectedDay &&
        detail.Location &&
        detail.Location.latitude &&
        detail.Location.longitude
      )
      .map(detail => ({
        location: {
          lat: Number(detail.Location.latitude),
          lng: Number(detail.Location.longitude),
        },
      }));
  }, [trip.TripDetail, selectedDay]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        <UploadImage />
        <div className="p-4 lg:px-32 bg-white">
          <TripForm />

          {/* ✅ ปุ่มเลือกวันที่ */}
          {Array.from({ length: numDay }, (_, index) => (
            <button
              key={index}
              className={`cursor-pointer m-2 p-2 ${
                selectedDay === index + 1 ? 'bg-blue-500' : 'bg-gray-400'
              } text-white rounded`}
              onClick={() => setSelectedDay(index + 1)}
            >
              Day {index + 1}
            </button>
          ))}

          {/* ✅ รายละเอียดของวันนั้น */}
          <div style={{ scrollBehavior: 'smooth' }}>
            <TripDetailList day={selectedDay} />
          </div>
        </div>
      </div>

      {/* ✅ แผนที่แสดงเฉพาะตำแหน่งของวันนั้น */}
      <div className="hidden md:flex w-2/6 h-screen bg-gray-200 items-center justify-center sticky top-0">
        <MyMap locations={locations} />
      </div>
    </div>
  );
}

export default CreateTripForm;
