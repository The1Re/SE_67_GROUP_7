import { useState } from "react";
import ImageModal from "./ImageModal";
import DaySelector from "./DaySelector";
import LocationCard from "./LocationCard";

// ✅ ชนิดข้อมูลของแต่ละสถานที่
interface Location {
  type: "meeting_point" | "location";
  name: string;
  time: string;
  description: string;
  images: string[];
  address?: string;
  distance?: string;
  duration?: string;
}

// ✅ ข้อมูลของแต่ละวัน
interface Day {
  id: number;
  locations: Location[];
}

type TripDayDetailProps = {
  days: Day[];
};

const TripDayDetail: React.FC<TripDayDetailProps> = ({ days }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openImageModal = (images: string[], index: number) => {
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

  return (
    <div className="bg-white rounded-lg p-6">
      <DaySelector activeTab={activeTab} setActiveTab={setActiveTab} days={days} />

      <ul className="relative ml-6 max-w-full border-l-2 border-gray-300">
        {days
          .filter((day) => day.id === activeTab)
          .flatMap((day) =>
            day.locations.map((location, index) => (
              <LocationCard
                key={index}
                location={location}
                index={index}
                openImageModal={openImageModal}
              />
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
