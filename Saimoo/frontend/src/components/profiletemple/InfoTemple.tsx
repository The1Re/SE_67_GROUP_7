import React, { useEffect, useState } from "react";
import api from "../../api"; // Make sure this path is correct for your API service
import { env } from "@/config";
import { MdLocationOn } from "react-icons/md"; // or another appropriate icon
import { FaHeart } from "react-icons/fa";

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

const InfoTemple: React.FC<{ templeId: number }> = ({ templeId }) => {
  const [templeData, setTempleData] = useState<TempleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [templeImage, setTempleImage] = useState<{id: number, imagePath: string} | null>(null);

  useEffect(() => {
    const fetchTempleData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/temples/${templeId}`);
        setTempleData(response.data);
        
        // Fetch temple image after getting temple data
        if (response.data && response.data.Temple && response.data.Temple.length > 0) {
          try {
            const responseImg = await api.get(`/temples/${templeId}/images`);
            // ตรวจสอบว่ามีข้อมูลรูปภาพหรือไม่
            if (responseImg.data && responseImg.data.length > 0) {
              // เรียงลำดับตาม id และเลือกภาพแรก
              const image = responseImg.data.sort((a, b) => a.id - b.id)[0];
              setTempleImage(image);
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
    // Change the section layout to be more responsive
    <section className="bg-white rounded-xl max-w-7xl mx-auto p-6 md:p-10 lg:p-16">
      {/* Temple name as a regular element, not absolute positioned */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12">
        {templeData.name}
      </h2>
      
      {/* Content container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* Temple image */}
        <div className="w-full md:w-1/2 flex justify-center">
          {templeImage && templeImage.imagePath ? (
            <div className="border-2 border-gray-300 rounded-lg p-2 shadow-md w-full max-w-lg">
              <img
                src={env.API_URL + "/" + templeImage.imagePath}
                alt={templeData.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="border-2 border-gray-300 rounded-lg p-2 shadow-md flex items-center justify-center h-40 w-full max-w-lg bg-gray-100">
              <p className="text-gray-500">ไม่มีรูปภาพ</p>
            </div>
          )}
        </div>
        
        {/* Temple description */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center mt-6 md:mt-0">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">คำอธิบาย</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {templeData.Temple && templeData.Temple.length > 0 
              ? templeData.Temple[0].description || "ไม่มีคำอธิบาย" 
              : "ไม่มีคำอธิบาย"}
          </p>
          
          {/* Temple location */}
          <div className="mt-4 text-gray-800 text-lg flex items-center justify-center md:justify-start">
            <span className="text-pink-500 text-xl mr-2"><MdLocationOn/> </span>
            <span className="font-semibold">จังหวัด  : </span> {templeData.Province ? templeData.Province.name : "ไม่ระบุ"}
          </div>
          
          {/* Temple likes */}
          <div className="mt-2 text-gray-800 text-lg flex items-center justify-center md:justify-start">
            <span className="text-red-500 text-xl mr-2"><FaHeart/></span>
            <span className="font-semibold">จำนวนผู้ชื่นชอบ  :</span> {
              templeData.Temple && templeData.Temple.length > 0 
                ? templeData.Temple[0].likes || 0 
                : 0
            }
          </div>
        </div>
      </div>
    </section>
  );
};
export default InfoTemple;
