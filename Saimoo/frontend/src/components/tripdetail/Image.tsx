import { useEffect, useState } from "react";
import api from "@/api";
import { env } from "@/config";

interface TripPicture {
  id: number;
  imagePath: string;
}

interface TripResponse {
  id: number;
  title: string;
  TripPicture: TripPicture[];
}

interface ImageProps {
  tripId: number;
}

const BASE_URL = env.API_URL;

const ImageComponent: React.FC<ImageProps> = ({ tripId }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get<TripResponse>(`/trips/${tripId}`);
        const trip = res.data;

        if (trip.TripPicture && trip.TripPicture.length > 0) {
          const rawPath = trip.TripPicture[0].imagePath;

          const finalUrl = rawPath.startsWith("http")
            ? rawPath
            : `${BASE_URL}/${rawPath.replace(/\\/g, "/")}`; // ✅ แปลงให้ถูกต้อง

          setImageUrl(finalUrl);
        }
      } catch (error) {
        console.error("Error loading trip image:", error);
      }
    };

    if (tripId) fetchTrip();
  }, [tripId]);

  if (!imageUrl) return null;

  return (
    <div className="w-full">
      <div
        className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden cursor-pointer"
        onClick={() => setPreview(true)}
      >
        {/* 🔹 พื้นหลังเบลอ */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        ></div>

        {/* 🔹 แสดงรูปหลัก */}
        <img
          src={imageUrl}
          alt="trip-preview"
          className="max-w-full max-h-full object-contain rounded-lg relative z-10"
        />
      </div>

      {/* 🔹 Fullscreen preview */}
      {preview && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-80 z-50">
          <img
            src={imageUrl}
            alt="full-preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-black p-2 text-2xl cursor-pointer"
            onClick={() => setPreview(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
