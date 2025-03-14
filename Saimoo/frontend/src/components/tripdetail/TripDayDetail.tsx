import { useState } from "react";
import ImageModal from "./ImageModal";
import DaySelector from "./DaySelector";
import LocationCard from "./LocationCard";

const mockData = [
  {
    day: 1,
    locations: [
      {
        type: "meeting_point",
        name: "ท่ารถตู้จังหวัดสุพรรณบุรี (จุดนัดพบ)",
        time: "8:00 am",
        description: "จุดเริ่มต้นการเดินทาง รวมตัวที่จุดนัดพบ",
        images: ["/assets/images/01(3).jpg"],
      },
      {
        type: "location",
        name: "วัดพระแก้ว",
        address: "Thanon Na Phra Lan, Bangkok, Thailand",
        time: "10:00 am",
        distance: "8.5 km",
        duration: "15 mins",
        description: "วัดเกือบต้นปี 2024 คือสวยมากๆ เรานั่งรถไฟฟ้า MRT ถึงสถานีวัดมังกรเลย...",
        images: ["/assets/images/01(4).jpg", "/assets/images/01(1).jpg", "/assets/images/01(2).jpg", "/assets/images/01(5).jpg"],
      },
    ],
  },
  { day: 2,
    locations: [
      {
        type: "meeting_point",
        name: "aaaaaaaaaaaaa",
        time: "8:00 am",
        description: "จุดเริ่มต้นการเดินทาง รวมตัวที่จุดนัดพบ",
        images: ["/assets/images/01(1).jpg"],
      },
      {
        type: "location",
        name: "วัดพระแก้ว",
        address: "Thanon Na Phra Lan, Bangkok, Thailand",
        time: "10:00 am",
        distance: "8.5 km",
        duration: "15 mins",
        description: "วัดเกือบต้นปี 2024 คือสวยมากๆ เรานั่งรถไฟฟ้า MRT ถึงสถานีวัดมังกรเลย...",
        images: ["/assets/images/01(2).jpg", "/assets/images/01(3).jpg", "/assets/images/01(4).jpg", "/assets/images/01(5).jpg"],
      },
    ],}
];

const TripDayDetail: React.FC = () => {
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
      <DaySelector activeTab={activeTab} setActiveTab={setActiveTab} days={mockData} />
      <ul className="relative ml-6 max-w-full border-l-2 border-gray-300">
        {mockData.map((day) => activeTab === day.day && day.locations.map((location, index) => <LocationCard key={index} location={location} index={index} openImageModal={openImageModal} />))}
      </ul>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} prevImage={prevImage} nextImage={nextImage} />
    </div>
  );
};

export default TripDayDetail;
