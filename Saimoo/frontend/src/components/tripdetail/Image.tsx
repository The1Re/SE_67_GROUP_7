import { useEffect, useState } from "react";

interface TripData {
  id: number;
  title: string;
  image: string;
  posted_at: string;
  posted_by: string;
  url?: string;
}

interface ImageComponentProps {
  imageURL?: string | null;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageURL }) => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!imageURL) {
      // ถ้ายังไม่มี imageURL จาก props → ใช้ fakeData.json แทน
      fetch("/assets/fakeData.json")
        .then((res) => res.json())
        .then((data) => setTrips(data));
    }
  }, [imageURL]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  // 🔁 ใช้ imageURL ถ้ามี ไม่งั้นใช้จาก trips[0].image
  const displayImage = imageURL || (trips.length > 0 ? trips[0].image : null);

  return (
    <div className="w-full">
      {displayImage && (
        <div
          className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(displayImage)}
        >
          {/* 🔹 พื้นหลังเบลอ */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
            style={{ backgroundImage: `url('${displayImage}')` }}
          ></div>

          {/* 🔹 แสดงรูปหลัก */}
          <img
            src={displayImage}
            alt="trip-preview"
            className="max-w-full max-h-full object-contain rounded-lg relative z-10"
          />
        </div>
      )}

      {/* 🔹 Preview รูปใหญ่ */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-80 z-50">
          <img
            src={selectedImage}
            alt="full-preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-black p-2 text-2xl cursor-pointer"
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
