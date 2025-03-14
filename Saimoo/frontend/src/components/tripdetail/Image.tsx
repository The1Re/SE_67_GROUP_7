import { useEffect, useState } from "react";

interface TripData {
  id: number;
  title: string;
  image: string;
  posted_at: string;
  posted_by: string;
  url?: string;
}

const ImageComponent = () => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/assets/fakeData.json")
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  const handleImageClick = (image: string) => {
    setSelectedImage(image); // ✅ เปิด preview เมื่อคลิก
  };

  const handleClosePreview = () => {
    setSelectedImage(null); // ✅ ปิด preview
  };

  return (
    <div className="w-full">
      {trips.length > 0 && trips[0].image && (
        <div
          className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(trips[0].image)}
        >
          {/* 🔹 พื้นหลังเบลอ */}
          {
            <div
              className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
              style={{ backgroundImage: `url('${trips[0].image}')` }}
            ></div>
          }
          {/* 🔹 แสดงรูปหลัก */}
          <img
            src={trips[0].image}
            alt="trip-preview"
            className="max-w-full max-h-full object-contain rounded-lg relative z-10"
          />
        </div>
      )}

      {/* 🔹 Preview รูปใหญ่ */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <img
            src={selectedImage}
            alt="full-preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-white p-2 text-2xl cursor-pointer"
            onClick={handleClosePreview}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
