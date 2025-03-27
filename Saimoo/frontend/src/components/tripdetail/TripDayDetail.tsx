import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import DaySelector from "./DaySelector";
import api from "@/api";
import { useParams } from "react-router-dom";
import { getFile } from "@/services/fileupload";
import { env } from "@/config";
import { convertDateTimeToThaiFormat } from "@/utils/TimeFormat";

interface TripDetailFromAPI {
  id: number;
  order: number;
  arriveTime: string;
  day: number;
  description: string;
  locationId: number;
  Location: {
    name: string;
    address?: string;
    latitude: number;
    longitude: number;
  };
  TripDetailPicture: {
    imagePath: string;
  }[];
}

interface DayData {
  day: number;
  locations: LocationData[];
}

interface LocationData {
  tripDetailId: number;
  type: string;
  name: string;
  address?: string;
  time: string;
  description: string;
  images: string[];
  lat: number;
  lng: number;
}

interface TripDayDetailProps {
  onChangeActiveDay: (locations: { location: { lat: number; lng: number } }[]) => void;
}

const TripDayDetail: React.FC<TripDayDetailProps> = ({ onChangeActiveDay }) => {
  const { tripId } = useParams();
  const [days, setDays] = useState<DayData[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/trips/${tripId}/details`);
        const details = res.data;

        const grouped: Record<number, LocationData[]> = {};

        const detailsWithImages = (details as TripDetailFromAPI[]).map((item) => {
          const images = (item.TripDetailPicture || [])
            .filter((img) => img.imagePath)
            .map((img) => {
              const rawPath = img.imagePath;
              if (rawPath.startsWith("http")) return rawPath;
              const normalized = rawPath.replace(/\\/g, "/");
              const fullPath = normalized.startsWith("uploads/image/")
                ? normalized
                : `uploads/image/${normalized}`;
              return getFile(fullPath);
            });

          return {
            day: item.day,
            location: {
              tripDetailId: item.id,
              type: item.order === 0 ? "meeting_point" : "location",
              name: item.Location?.name || "ไม่ระบุชื่อ",
              address: item.Location?.address || "",
              time: item.arriveTime,
              description: item.description,
              images,
              lat: item.Location.latitude,
              lng: item.Location.longitude,
            },
          };
        });

        detailsWithImages.forEach(({ day, location }) => {
          console.log(day)
          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(location);
        });

        const dayArray: DayData[] = Object.entries(grouped).map(([day, locations]) => ({
          day: Number(day),
          locations,
        }));

        setDays(dayArray);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchDetails();
  }, [tripId]);

  useEffect(() => {
    const activeDay = days.find((d) => d.day === activeTab);
    if (activeDay) {
      const locs = activeDay.locations.map((l) => ({ location: { lat: l.lat, lng: l.lng } }));
      onChangeActiveDay(locs);
    }
  }, [activeTab, days, onChangeActiveDay]);

  const openImageModal = async (location: LocationData, index: number) => {
    let images = location.images;

    if (images.length === 0) {
      try {
        const res = await api.get(`/trips/${tripId}/details/${location.tripDetailId}/images`);
        const rawImages = res.data || [];
        const fullPaths = rawImages.map((img: { imagePath: string }) =>
          `${env.API_URL}/${img.imagePath.replace(/\\/g, "/")}`
        );
        images = fullPaths;
      } catch (err) {
        console.error("❌ โหลดรูปไม่สำเร็จ:", err);
      }
    }

    setImageList(images);
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const nextImage = () => {
    if (imageList.length > 0) {
      const newIndex = (currentIndex + 1) % imageList.length;
      setCurrentIndex(newIndex);
      setSelectedImage(imageList[newIndex]);
    }
  };

  const prevImage = () => {
    if (imageList.length > 0) {
      const newIndex = (currentIndex - 1 + imageList.length) % imageList.length;
      setCurrentIndex(newIndex);
      setSelectedImage(imageList[newIndex]);
    }
  };

  if (days.length === 0) return <div className="p-6 text-center">ไม่มีข้อมูลรายละเอียดทริป</div>;

  return (
    <div className="bg-white rounded-lg p-6">
      <DaySelector activeTab={activeTab} setActiveTab={setActiveTab} days={days} />
      <ul className="relative ml-6 max-w-full border-l-2 border-gray-300">
        {days
          .filter((day) => day.day === activeTab)
          .flatMap((day) =>
            day.locations.map((location, index) => (
              <li key={index} className="relative pl-3 my-8">
                <div className="absolute -left-[18px] top-4 transform -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white font-bold">
                  {index + 1}
                </div>
                <div className="ml-3">
                  <h2 className="font-bold text-gray-800 items-center gap-3 flex">
                    📍 {location.name}
                  </h2>
                  {location.address && <p className="text-gray-600 text-sm">{location.address}</p>}
                  <p className="text-gray-500 text-sm flex items-center gap-2">🕓 {convertDateTimeToThaiFormat(new Date(location.time))}</p>
                  <p className="text-gray-600 text-sm mt-2 ml-8">{location.description}</p>

                  {location.images.length > 0 && (
                    <div className="mt-3 ml-8 flex flex-wrap gap-2">
                      {location.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`ภาพ ${imgIndex + 1}`}
                          onClick={() => openImageModal(location, imgIndex)}
                          className="h-24 w-24 object-cover rounded cursor-pointer border border-gray-300"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
      </ul>
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        prevImage={prevImage}
        nextImage={nextImage}
      />
    </div>
  );
};

export default TripDayDetail;
