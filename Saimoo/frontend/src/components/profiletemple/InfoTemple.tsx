import React, { useEffect, useState } from "react";
import api from "../../api"; // Make sure this path is correct for your API service

interface TempleData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  provinceId: number;
  Province: {
    id: number;
    name: string;
  };
  Temple: {
    id: number;
    description: string;
    likes: number;
    locationId: number;
  }[];
}

const InfoTemple: React.FC = () => {
  const [templeData, setTempleData] = useState<TempleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [templeImage, setTempleImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTempleData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/temples/1");
        setTempleData(response.data);
        
        // Fetch temple image after getting temple data
        if (response.data && response.data.Temple && response.data.Temple.length > 0) {
          try {
            const responseImg = await api.get(`temples/front/${response.data.Temple[0].id}`);
            if (responseImg.data && responseImg.data.imagePath) {
              setTempleImage(responseImg.data.imagePath);
            }
          } catch (imgErr) {
            console.error("Error fetching temple image:", imgErr);
            // No need to set error state for image, we'll show a fallback message
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching temple data:", err);
        setError("Failed to load temple data");
        setLoading(false);
      }
    };

    fetchTempleData();
  }, []);

  if (loading) return <div className="text-center p-10">Loading temple information...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!templeData) return <div className="text-center p-10">No temple data available</div>;

  return (
    <section className="relative p-20 bg-white rounded-xl max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
      {/* Temple name at the top */}
      <h2 className="absolute top-[-0px] left-1/2 transform -translate-x-1/2 text-5xl font-bold text-gray-900">
        {templeData.name}
      </h2>
      
      {/* Temple image - Now fetched from API with fallback */}
      <div className="md:w-1/2 flex justify-center">
      {templeImage ? (
        <div className="border-2 border-gray-300 rounded-lg p-2 shadow-md">
          <img
            src={templeImage}
            alt={templeData.name}
            className="w-full max-w-lg h-auto object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="w-full max-w-lg h-64 flex items-center justify-center bg-gray-200 rounded-lg border-2 border-gray-300 p-2 shadow-md">
          <p className="text-gray-600 text-lg">ไม่มีรูปภาพ</p>
        </div>
      )}
    </div>
      
      {/* Temple description */}
      <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-4">คำอธิบาย</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {templeData.Temple[0]?.description || "ไม่มีคำอธิบาย"}
        </p>
        
        {/* Temple location - Changed to show Province name */}
        <div className="mt-4 text-gray-800 text-lg flex items-center justify-center md:justify-start">
          <span className="text-pink-500 text-xl mr-2">📍</span>
          <span className="font-semibold">ที่ตั้ง:</span> {templeData.Province.name}
        </div>
        
        {/* Temple likes */}
        <div className="mt-2 text-gray-800 text-lg flex items-center justify-center md:justify-start">
          <span className="text-red-500 text-xl mr-2">❤️</span>
          <span className="font-semibold">จำนวนผู้ชื่นชอบ:</span> {templeData.Temple[0]?.likes || 0}
        </div>
      </div>
    </section>
  );
};

export default InfoTemple;
