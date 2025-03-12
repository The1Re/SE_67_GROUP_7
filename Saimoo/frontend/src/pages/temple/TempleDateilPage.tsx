import { useState } from "react";
import TempleInfo from "../../components/templedetail/TempleInfo";
import TempleTabs from "../../components/templedetail/TempleTabs";
import AddPicture from "../../components/templedetail/AddPicture";
import AddCharmPopup from "../../components/templedetail/AddCharmPopup";
import AddActivity from "../../components/templedetail/AddActivity";
import { FaCog } from "react-icons/fa";

function TempleDetailPage() {
  const [selectedTab, setSelectedTab] = useState("Picture");
  const [showAddPicturePopup, setShowAddPicturePopup] = useState(false);
  const [showAddCharmPopup, setShowAddCharmPopup] = useState(false);
  const [showAddActivityPopup, setShowAddActivityPopup] = useState(false);
  const [editingCharm, setEditingCharm] = useState(null);
  const [editingPictureIndex, setEditingPictureIndex] = useState(null);
  const [editingPicture, setEditingPicture] = useState(null); // ✅ เก็บรูปที่แก้ไข
   const [editingActivity, setEditingActivity] = useState(null);

  const [pictures, setPictures] = useState([]);
  const [charms, setCharms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [descImage, setDescImage] = useState(null);

  const [templeData, setTempleData] = useState({
    name: "วัดศีรษะทอง",
    description: "วัดเก่าแก่ในนครปฐม...",
    address: "ถนนศีรษะทอง อำเภอศีรษะทอง จังหวัดนครปฐม",
  });

  // ✅ เพิ่มกิจกรรมใหม่
  const handleAddActivity = (activity) => {
    if (editingActivity) {
      setActivities((prev) =>
        prev.map((a) => (a === editingActivity ? activity : a))
      );
    } else {
      setActivities((prev) => [...prev, activity]);
    }
    setEditingActivity(null);
    setShowAddActivityPopup(false);
  };

  // ✅ เพิ่ม / แก้ไข Charm
  const handleSaveCharm = (charm) => {
    if (editingCharm) {
      setCharms((prevCharms) =>
        prevCharms.map((c) => (c.id === editingCharm.id ? charm : c))
      );
    } else {
      setCharms((prev) => [...prev, charm]);
    }
    setEditingCharm(null);
    setShowAddCharmPopup(false);
  };

  // ✅ ลบ Charm
  const handleDeleteCharm = (charm) => {
    setCharms((prev) => prev.filter((c) => c.id !== charm.id));
    setShowAddCharmPopup(false);
  };

  // ✅ เพิ่มหรือแก้ไขรูปภาพ
  const handleSavePicture = (newPicture) => {
    if (editingPictureIndex !== null) {
      setPictures((prev) =>
        prev.map((pic, index) =>
          index === editingPictureIndex ? newPicture : pic
        )
      );
    } else {
      setPictures((prev) => [...prev, newPicture]);
    }
    setEditingPictureIndex(null);
    setEditingPicture(null); // ✅ รีเซ็ตค่าหลังแก้ไขเสร็จ
    setShowAddPicturePopup(false);
  };
  const handleDeletePicture = (imageToDelete) => {
    console.log("🚮 กำลังลบรูปจาก pictures:", imageToDelete);
    setPictures((prev) => prev.filter((img) => img !== imageToDelete)); // ✅ ลบรูปออกจาก state
    setShowAddPicturePopup(false); // ✅ ปิด popup
  };

  return (
    <div className="flex justify-center items-center bg-white p-6">
      <div className="w-full max-w-5xl p-6 absolute top-0 left-0 right-0 mx-auto">
        {/* ✅ แสดงข้อมูลวัด */}
        <TempleInfo
          templeData={templeData}
          setTempleData={setTempleData}
          descImage={descImage}
          setDescImage={setDescImage}
        />

        {/* ✅ แท็บ */}
        <TempleTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* 🔷 ส่วนเพิ่มกิจกรรม */}
        {selectedTab === "Activity" && (
          <div className="text-center mt-6">
            <button
              className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 cursor-pointer"
              onClick={() => setShowAddActivityPopup(true)}
            >
              Add Activity
            </button>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {activities.map((activity, index) => (
                <div key={index} className="relative bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  {activity.image && (
                    <img src={activity.image} alt={`Activity ${index}`} className="w-full h-40 object-cover rounded-lg" />
                  )}
                  <div className="text-left mt-2">
                    <p><strong>กิจกรรม:</strong> {activity.name}</p>
                    <p><strong>วันที่:</strong> {activity.startDate.toLocaleDateString()} - {activity.endDate.toLocaleDateString()}</p>
                  </div>

                  {/* ✅ ปุ่มฟันเฟือง (แก้ไขกิจกรรม) */}
                  <button
                    className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                    onClick={() => {
                      setEditingActivity(activity);
                      setShowAddActivityPopup(true);
                    }}
                  >
                    <FaCog size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔷 ส่วนเพิ่มรูปภาพ */}
        {selectedTab === "Picture" && (
          <div className="text-center mt-6">
            <button
              className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 cursor-pointer"
              onClick={() => {
                setEditingPictureIndex(null);
                setEditingPicture(null); // ✅ รีเซ็ตค่าแก้ไข
                setShowAddPicturePopup(true);
              }}
            >
              Add Picture
            </button>
            
              {/* 📌 กรอบรูปภาพ */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {pictures.map((image, index) => (
                <div key={index} className="relative border-2 border-gray-300 rounded-lg shadow-md p-2 bg-white">
                  <img
                    src={image}
                    alt={`Temple ${index}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {/* ✅ ปุ่มฟันเฟือง */}
                  <button
                    className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                    onClick={() => {
                      setEditingPictureIndex(index);
                      setEditingPicture(image);
                      setShowAddPicturePopup(true);
                    }}
                  >
                    <FaCog size={18} className="text-gray-700 hover:text-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🔷 ส่วนเพิ่ม Charm */}
        {selectedTab === "Charm" && (
          <div className="text-center mt-6">
            <button
              className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 cursor-pointer"
              onClick={() => {
                setEditingCharm(null);
                setShowAddCharmPopup(true);
              }}
            >
              Add Charm
            </button>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {charms.map((charm, index) => (
                <div
                  key={index}
                  className="relative bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={charm.image}
                    alt={`Charm ${index}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="text-left mt-2">
                    <p>
                      <strong>ชื่อพระ:</strong> {charm.name}
                    </p>
                    <p>
                      <strong>เนื้อพระ:</strong> {charm.material}
                    </p>
                    <p>
                      <strong>รุ่น:</strong> {charm.model}
                    </p>
                    <p>
                      <strong>ราคา:</strong> {charm.price} บาท
                    </p>
                  </div>

                  <button
                    className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                    onClick={() => {
                      setEditingCharm(charm);
                      setShowAddCharmPopup(true);
                    }}
                  >
                    <FaCog size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ✅ Popup สำหรับเพิ่มรูปภาพ */}
      {showAddPicturePopup && (
        <AddPicture
          show={showAddPicturePopup}
          onClose={() => setShowAddPicturePopup(false)}
          onSave={handleSavePicture}
          onDelete={handleDeletePicture} // ✅ ส่งฟังก์ชันลบไปให้ popup
          imageToEdit={editingPicture}
        />
      )}
    

      {/* ✅ Popup สำหรับเพิ่ม / แก้ไขกิจกรรม */}
      {showAddActivityPopup && (
        <AddActivity
          show
          onClose={() => setShowAddActivityPopup(false)}
          onSave={handleAddActivity}
          editingActivity={editingActivity}
        />
      )}

      {/* ✅ Popup สำหรับเพิ่ม / แก้ไข Charm */}
      {showAddCharmPopup && (
        <AddCharmPopup
          show
          onClose={() => setShowAddCharmPopup(false)}
          onSave={handleSaveCharm}
          onDelete={handleDeleteCharm} // ✅ ส่งฟังก์ชันลบไปให้ Popup
          editingCharm={editingCharm}
        />
      )}
    </div>
  );
}

export default TempleDetailPage;
