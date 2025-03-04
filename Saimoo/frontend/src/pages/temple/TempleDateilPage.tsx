import { useState, useCallback } from "react";
import TempleInfo from "../../components/templedetail/TempleInfo";
import TempleTabs from "../../components/templedetail/TempleTabs";
import AddPicture from "../../components/templedetail/AddPicture";

function TempleDetailPage() {
  // ✅ เก็บแท็บที่เลือก
  const [selectedTab, setSelectedTab] = useState("Picture");

  // ✅ ควบคุมการแสดง Pop-up
  const [showAddPicturePopup, setShowAddPicturePopup] = useState(false);

  // ✅ เก็บรูปที่เพิ่ม
  const [pictures, setPictures] = useState([]);

  // ✅ เก็บรูปหลักที่แสดงด้านบน
  const [descImage, setDescImage] = useState(null);

  // ✅ เก็บข้อมูลวัด
  const [templeData, setTempleData] = useState({
    name: "วัดศีรษะทอง",
    description: "วัดเก่าแก่ในนครปฐม...",
    address: "ถนนศีรษะทอง อำเภอศีรษะทอง จังหวัดนครปฐม",
  });

  // ✅ เพิ่มรูปใหม่ไปที่ "Picture" ด้านล่าง
  const handleAddPicture = useCallback((newImage) => {
    setPictures((prev) => [...prev, newImage]);
    setShowAddPicturePopup(false);
  }, []);

  // ✅ แก้ไขรูปที่มีอยู่
  const handleEditPicture = useCallback((index, newImage) => {
    setPictures((prev) => {
      const updatedPictures = [...prev];
      updatedPictures[index] = newImage;
      return updatedPictures;
    });
  }, []);

  return (
    <div className="flex justify-center items-center bg-white p-6">
      <div className="w-full max-w-5xl p-6">

        {/* ✅ แสดงข้อมูลวัด */}
        <TempleInfo
          templeData={templeData}
          setTempleData={setTempleData}
          descImage={descImage}
          setDescImage={setDescImage}
        />

        {/* ✅ แท็บ */}
        <TempleTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* 🔷 ส่วนเพิ่มรูปภาพ */}
        {selectedTab === "Picture" && (
          <div className="text-center mt-6">
            <button
              className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600"
              onClick={() => setShowAddPicturePopup(true)}
            >
              Add Picture
            </button>

            {/* ✅ แสดงรูปที่เพิ่มใหม่ */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {pictures.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Temple ${index}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />

                  {/* ✅ ปุ่ม Edit รูป */}
                  <button
                    className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => setShowAddPicturePopup(index)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Popup สำหรับเพิ่ม/แก้ไขรูป */}
        {showAddPicturePopup !== false && (
          <AddPicture
            show={true}
            onClose={() => setShowAddPicturePopup(false)}
            onEdit={(newImage) => {
              if (typeof showAddPicturePopup === "number") {
                handleEditPicture(showAddPicturePopup, newImage);
              } else {
                handleAddPicture(newImage);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TempleDetailPage;
