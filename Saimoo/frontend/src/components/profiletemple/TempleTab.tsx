import React, { useState, useEffect } from "react";
import Activity from "./Activity";
import Charm from "./Charm";
import Picture from "./Picture";
import api from "@/api";

interface ActivityData {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imagePath: string;
  templeId: number;
}

interface CharmData {
  charmId: number;
  name: string;
  imagePath: string;
  price: number;
  avalibleDate: string;
  status: number;
  detail: string;
  templeId: number;
}

interface ImageData {
  id: number;
  imagePath: string;
  description: string;
  templeId: number;
}

const TempleTab: React.FC<{ templeId: number }> = ({ templeId = 1 }) => {
  const [activeTab, setActiveTab] = useState("Activity");
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [charms, setCharms] = useState<CharmData[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchTempleData = async () => {
      try {
        // Fetch activities
        const activitiesResponse = await api.get(`/temples/${templeId}/activity`);
        setActivities(activitiesResponse.data);

        // Fetch charms
        const charmsResponse = await api.get(`/temples/${templeId}/charms`);
        setCharms(charmsResponse.data);

        // Fetch images
        const imagesResponse = await api.get(`/temples/${templeId}/images`);
        // Extract image paths from the response
        const imagePaths = imagesResponse.data.map((img: ImageData) => img.imagePath);
        setImages(imagePaths);
      } catch (error) {
        console.error("Error fetching temple data:", error);
      }
    };

    fetchTempleData();
  }, [templeId]);

  // Transform API data to match component props
  const formattedActivities = activities.map(activity => ({
    title: activity.name,
    date: new Date(activity.startDate).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    description: activity.description,
    image: activity.imagePath
  }));

  const formattedCharms = charms.map(charm => ({
    title: charm.name,
    material: "", // API doesn't provide material
    generation: "", // API doesn't provide generation
    image: charm.imagePath,
    price: charm.price,
    quantity: charm.status, // Using status as quantity
    detail: charm.detail
  }));

  return (
    <div className="mt-6">
      {/* 🔹 เมนูแท็บ */}
      <div className="relative flex justify-center border-b border-gray-300">
        {["Activity", "Charm", "Picture"].map((tab) => (
          <button
            key={tab}
            className={`relative py-3 pb-2 px-6 text-xl font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "text-black after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[3px] after:bg-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 แสดงเฉพาะข้อมูลของแท็บที่เลือก */}
      <div className="p-4">
        {activeTab === "Activity" && <Activity activities={formattedActivities} />}
        {activeTab === "Charm" && <Charm charms={formattedCharms} />}
        {activeTab === "Picture" && <Picture images={images} />}
      </div>
    </div>
  );
};

export default TempleTab;
