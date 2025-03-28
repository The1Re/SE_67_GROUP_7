import { useState, useEffect } from "react";
import TempleInfo from "../../components/templedetail/TempleInfo";
import TempleTabs from "../../components/templedetail/TempleTabs";
import AddPicture from "../../components/templedetail/AddPicture";
import AddCharmPopup from "../../components/templedetail/AddCharmPopup";
import AddActivity from "../../components/templedetail/AddActivity";
import { FaCog } from "react-icons/fa";
import api from "../../api";
import { env } from "@/config";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import DataLoading from "@/components/DataLoading";

// Define temple data interface based on API response
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
ownerId: number;
}[];
}

// Define activity interface based on API response
interface Activity {
id: number;
name: string;
description: string;
startDate: Date | string;
endDate: Date | string;
imagePath?: string;
templeId?: number;
}

interface Charm {
charmId: number;
name: string;
imagePath?: string;
price: number;
avalibleDate: Date | string;
status?: number;
detail: string;
templeId?: number;
}

interface Picture {
id?: number;
imagePath: string;
description: string;
templeId: number;
}

function TempleDetailPage() {
const { user } = useAuth();
const [templeId, setTempleId] = useState<number | null>(null);
const [loading, setLoading] = useState(true);
const [dataInitialized, setDataInitialized] = useState(false);

// State for temple data from API
const [templeData, setTempleData] = useState({
name: "",
description: "",
province: "",
likes: 0,
Temple_id: 0,
});

const [selectedTab, setSelectedTab] = useState("Activity");
const [showAddPicturePopup, setShowAddPicturePopup] = useState(false);
const [showAddCharmPopup, setShowAddCharmPopup] = useState(false);
const [showAddActivityPopup, setShowAddActivityPopup] = useState(false);

const [activities, setActivities] = useState<Activity[]>([]);
const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

const [charms, setCharms] = useState<Charm[]>([]);
const [editingCharm, setEditingCharm] = useState<Charm | null>(null);

const [pictures, setPictures] = useState<Picture[]>([]);
const [editingPicture, setEditingPicture] = useState<Picture | null>(null);

const [descImage, setDescImage] = useState(null);
const [, setEditingPictureIndex] = useState(null);

const [confirmDelete, setConfirmDelete] = useState<{show: boolean, id: number | null}>({
show: false,
id: null
});

// ส่วนที่ต้องการให้ทำงานก่อน - ดึงข้อมูลวัดของผู้ใช้
useEffect(() => {
if (!user) {
  setLoading(false);
  return;
}

const fetchAllTemples = async () => {
  try {
    let allTemples: any[] = [];

    // ดึงหน้าแรก
    const firstResponse = await api.get(`/temples?page=1`);
    const { data: firstData, pagination } = firstResponse.data;

    if (!Array.isArray(firstData)) {
      console.error("Unexpected API response:", firstData);
      setLoading(false);
      return;
    }

    allTemples = [...firstData];

    let totalPages = pagination.totalPages;
    let currentPage = 2;

    // ดึงหน้าที่เหลือ
    while (currentPage <= totalPages) {
      const response = await api.get(`/temples?page=${currentPage}`);
      const { data } = response.data;

      if (!Array.isArray(data)) {
        console.error("Unexpected API response:", data);
        setLoading(false);
        return;
      }

      allTemples = [...allTemples, ...data];
      currentPage++;
    }

    console.log("Fetched all temples:", allTemples);

    // ค้นหาวัดที่ user เป็นเจ้าของ
    const ownedTemple = allTemples.find((t) =>
      t.Temple.some((temple: any) => temple.ownerId === user.id)
    );

    if (ownedTemple) {
      setTempleId(ownedTemple.id);
    } else {
      console.warn("No temple found for this user");
    }
  } catch (error) {
    console.error("Error fetching temples:", error);
  } finally {
    setLoading(false);
  }
};

fetchAllTemples();
}, [user]);

// ดึงข้อมูลวัดหลังจากได้ templeId แล้ว
useEffect(() => {
if (!templeId) return;

const fetchTempleData = async () => {
  try {
    const response = await api.get(`/temples/${templeId}`);
    const data: TempleData = response.data;
    setTempleData({
      name: data.name,
      description: data.Temple[0]?.description || "",
      province: data.Province.name || "",
      likes: data.Temple[0]?.likes || 0,
      Temple_id: data.Temple[0].id || 0,
    });
    
    // ดึงข้อมูลกิจกรรม
    const activitiesResponse = await api.get(`/temples/${templeId}/activity`);
    setActivities(activitiesResponse.data);
    
    // ดึงข้อมูล charms
    const charmsResponse = await api.get(`/temples/${templeId}/charms`);
    setCharms(charmsResponse.data);
    
    // ดึงข้อมูลรูปภาพ
    const picturesResponse = await api.get(`/temples/${templeId}/images`);
    setPictures(picturesResponse.data);
    
    // ตั้งค่าว่าข้อมูลถูกโหลดเรียบร้อยแล้ว
    setDataInitialized(true);
    
  } catch (error) {
    console.error("Error fetching temple data:", error);
  }
};

fetchTempleData();
}, [templeId]);

// แสดงสถานะกำลังโหลด
if (loading) return <DataLoading />;

// แสดงข้อความถ้าไม่พบวัด
if (!templeId) return <p className="flex justify-center items-center h-screen text-xl">คุณยังไม่มีวัดในระบบ</p>;

// แสดงสถานะกำลังโหลดข้อมูลวัด
if (!dataInitialized) return <DataLoading />;

const saveTempleData = async () => {
try {
  await api.put(`/temples/${templeData.Temple_id}`, {
    
    description: templeData.description,
  });
  
  toast.success("บันทึกข้อมูลสำเร็จ");
} catch (error) {
  console.error("Error saving temple data:", error);
  toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
}
};

// ฟังก์ชันเพิ่ม/แก้ไขกิจกรรม
const handleAddActivity = async (activity: Activity) => {
try {
  if (!templeId) {
    toast.error("เกิดข้อผิดพลาด: ไม่พบ templeId");
    return;
  }
  
  if (!activity.name.trim() || !activity.description.trim()) {
    toast.error("กรุณากรอกชื่อและรายละเอียดกิจกรรม");
    return;
  }
  
  const payload = {
    name: activity.name,
    description: activity.description,
    startDate: new Date(activity.startDate).toISOString(),
    endDate: new Date(activity.endDate).toISOString(),
    imagePath: activity.imagePath,
  };

  let response;
  
  if (activity.id) {
    response = await api.put(`/temples/${templeId}/activity/${activity.id}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    response = await api.post(`/temples/${templeId}/activity`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // อัปเดตรายการกิจกรรม
  setActivities(prev =>
    activity.id ? prev.map(act => act.id === activity.id ? response.data : act) : [...prev, response.data]
  );

  setEditingActivity(null);
  setShowAddActivityPopup(false);
} catch (error) {
  console.error("Error saving activity:", error);
  toast.error(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
}
};

// ฟังก์ชันลบกิจกรรม
const handleDeleteActivity = async (activityId: number) => {
try {
  await api.delete(`/temples/${templeId}/activity/${activityId}`);
  
  // ลบกิจกรรมออกจากรายการ
  setActivities(prev => prev.filter(activity => activity.id !== activityId));
  
  // แสดงข้อความสำเร็จ
  toast.success("ลบกิจกรรมสำเร็จ");
} catch (error) {
  console.error("Error deleting activity:", error);
  toast.error("เกิดข้อผิดพลาดในการลบกิจกรรม");
}
};

// เพิ่ม / แก้ไข Charm
const handleSaveCharm = async (charm: Charm) => {
try {
  if (!templeId) {
    toast.error("เกิดข้อผิดพลาด: ไม่พบ templeId");
    return;
  }
  
  if (!charm.name.trim() || !charm.detail.trim()) {
    toast.error("กรุณากรอกชื่อและรายละเอียดของ Charm");
    return;
  }

  const payload = {
    name: charm.name,
    detail: charm.detail,
    price: charm.price,
    avalibleDate: new Date(charm.avalibleDate).toISOString(),
    status: charm.status || 1,
    imagePath : charm.imagePath, 
  };

  let response;
  
  if (charm.charmId) {
    response = await api.put(`/temples/${templeId}/charms/${charm.charmId}`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // อัปเดต Charm ในรายการ
    setCharms(prev => prev.map(c => c.charmId === charm.charmId ? response.data : c));
  } else {
    response = await api.post(`/temples/${templeId}/charms`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    // เพิ่ม Charm ใหม่ลงในรายการ
    setCharms(prev => [...prev, response.data]);
  }

  // ปิด popup
  setEditingCharm(null);
  setShowAddCharmPopup(false);

  // แสดงข้อความสำเร็จ
  toast.success(charm.charmId ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ");
  
} catch (error) {
  console.error("Error saving charm:", error);
  toast.error(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
}
};

// ลบ Charm
const handleDeleteCharm = async (charmId: number) => {
try {
  await api.delete(`/temples/${templeId}/charms/${charmId}`);
  
  // ลบ Charm ออกจากรายการ
  setCharms(prev => prev.filter(charm => charm.charmId !== charmId));
  toast.success("ลบสำเร็จ");
} catch (error) {
  console.error("Error deleting charm:", error);
  toast.error("เกิดข้อผิดพลาดในการลบ Charm");
}
};

// เพิ่มหรือแก้ไขรูปภาพ
const handleSavePicture = async (newPicture: Picture) => {
try {
  let response;
  
  if (newPicture.id) {
    // Update existing picture
    response = await api.put(`/temples/${templeId}/images/${newPicture.id}`, {
      description: newPicture.description,
      imagePath: newPicture.imagePath
    });
    
    setPictures(prev => 
      prev.map(pic => pic.id === newPicture.id ? response.data : pic)
    );
  } else {
            // Add new picture
    response = await api.post(`/temples/${templeId}/images`, {
      description: newPicture.description,
      imagePath: newPicture.imagePath,
    });
    
    setPictures(prev => [...prev, response.data]);
  }
  
  setEditingPicture(null);
  setShowAddPicturePopup(false);
  
} catch (error) {
  console.error("Error saving picture:", error);
  toast.error(`เกิดข้อผิดพลาด: ${error.response?.data?.message || error.message}`);
}
};

// Update the handleDeletePicture function
const handleDeletePicture = async (id: number) => {
try {
  await api.delete(`/temples/${templeId}/images/${id}`);
  
  // Remove the deleted picture from the state
  setPictures(prev => prev.filter(pic => pic.id !== id));
  
  toast.success("ลบรูปภาพสำเร็จ");
} catch (error) {
  console.error("Error deleting picture:", error);
  toast.error("เกิดข้อผิดพลาดในการลบรูปภาพ");
}
};

return (
<div className="flex flex-row justify-center items-center bg-white p-6 overflow-auto h-screen">
  <div className="w-full max-w-5xl p-6 absolute top-0 left-0 right-0 mx-auto">
    {/* ✅ แสดงข้อมูลวัด */}
    <TempleInfo
      templeData={templeData}
      setTempleData={setTempleData}
      descImage={descImage}
      setDescImage={setDescImage}
      saveTempleData={saveTempleData}
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
            <div key={activity.id || index} className="relative bg-white p-4 rounded-lg shadow-md border border-gray-200">
              {activity.imagePath ? (
                <img
                  src={env.API_URL + "/" + activity.imagePath }
                  alt={`Activity ${index}`}
                  className="w-full h-40 object-cover rounded-lg"
                  
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">ไม่มีรูปภาพ</p>
                </div>
              )}
              <div className="text-left mt-2">
                <p><strong>กิจกรรม:</strong> {activity.name}</p>
                <p><strong>วันที่:</strong> {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}</p>
              </div>
              {activity.description && (
                <p className="text-black mt-2 min-h-[50px] flex items-center">
                  <strong>รายละเอียด:</strong> {activity.description}
                </p>
              )}

              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                  onClick={() => {
                    setEditingActivity(activity);
                    setShowAddActivityPopup(true);
                  }}
                >
                  <FaCog size={18} />
                </button>
                <button
                  className="bg-red-500 p-2 rounded-full shadow-md hover:bg-red-600 text-white"
                  onClick={() => {
                    if (activity.id) {
                      setConfirmDelete({show: true, id: activity.id});
                    }
                  }}
                >
                  <span className="text-sm">×</span>
                </button>
                {/* Custom Confirmation Dialog */}
                  {confirmDelete.show && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
                      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">ยืนยันการลบ</h3>
                        <p className="text-gray-600 mb-6 text-center">คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?</p>
                        
                        <div className="flex justify-center space-x-4">
                          <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            onClick={() => {
                              if (confirmDelete.id) {
                                handleDeleteActivity(confirmDelete.id);
                              }
                              setConfirmDelete({show: false, id: null});
                            }}
                          >
                            ใช่
                          </button>
                          <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            onClick={() => setConfirmDelete({show: false, id: null})}
                          >
                            ไม่
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
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
              key={charm.charmId || index}
              className="relative bg-white p-4 rounded-lg shadow-md"
            >
              {charm.imagePath && (
                <img
                  src={env.API_URL + "/" + charm.imagePath }
                  alt={`Charm ${index}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <div className="text-left mt-2">
                <p>
                  <strong>ชื่อพระ:</strong> {charm.name}
                </p>
                <p>
                  <strong>รายละเอียด:</strong> {charm.detail}
                </p>
                <p>
                  <strong>ราคา:</strong> {charm.price} บาท
                </p>
                <p>
                  <strong>วันที่วางจำหน่าย:</strong> {new Date(charm.avalibleDate).toLocaleDateString()}
                </p>
              </div>

              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
                  onClick={() => {
                    setEditingCharm(charm);
                    setShowAddCharmPopup(true);
                  }}
                >
                  <FaCog size={18} />
                </button>
                <button
                  className="bg-red-500 p-2 rounded-full shadow-md hover:bg-red-600 text-white"
                  onClick={() => {
                    if (charm.charmId) {
                      setConfirmDelete({show: true, id: charm.charmId});
                    }
                  }}
                >
                  <span className="text-sm">×</span>
                </button>
                {confirmDelete.show && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
                      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">ยืนยันการลบ</h3>
                        <p className="text-gray-600 mb-6 text-center">คุณต้องการลบเครื่องรางนี้ใช่หรือไม่?</p>
                        
                        <div className="flex justify-center space-x-4">
                          <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            onClick={() => {
                              if (confirmDelete.id) {
                                handleDeleteCharm(confirmDelete.id);
                              }
                              setConfirmDelete({show: false, id: null});
                            }}
                          >
                            ใช่
                          </button>
                          <button
                            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                            onClick={() => setConfirmDelete({show: false, id: null})}
                          >
                            ไม่
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
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
            setEditingPicture(null);
            setShowAddPicturePopup(true);
          }}
        >
          Add Picture
        </button>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
        {pictures.length > 0 ? (
            pictures.map((image, index) => (
              <div key={index} className="relative border-2 border-gray-300 rounded-lg shadow-md p-2 bg-white">
                <img
                  src={env.API_URL + "/" + image.imagePath}
                  alt={`Temple ${index}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
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
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              ไม่มีรูปภาพ
            </div>
          )}
        </div>
      </div>
    )}
  </div>
    
  {/* Popup สำหรับเพิ่ม / แก้ไขกิจกรรม */}
  {showAddActivityPopup && (
    <AddActivity
      show
      onClose={() => setShowAddActivityPopup(false)}
      onSave={handleAddActivity}
      editingActivity={editingActivity}
      callback={(path) => setPictures(prevPictures => [...prevPictures, { imagePath: path, description: "", templeId: templeId }])}
    />
  )}

  {/*  Popup สำหรับเพิ่ม / แก้ไข Charm */}
  {showAddCharmPopup && (
    <AddCharmPopup
      show
      onClose={() => setShowAddCharmPopup(false)}
      onSave={handleSaveCharm}
      onDelete={handleDeleteCharm}
      editingCharm={editingCharm}
      callback={(path) => setPictures(prevPictures => [...prevPictures, { imagePath: path, description: "", templeId: templeId }])}
    />
  )}


  {/*  Popup สำหรับเพิ่มรูปภาพ */}
  {showAddPicturePopup && (
    <AddPicture
      show={showAddPicturePopup}
      onClose={() => setShowAddPicturePopup(false)}
      onSave={handleSavePicture}
      onDelete={handleDeletePicture}
      imageToEdit={editingPicture}
      callback={(path) => setPictures(prevPictures => [...prevPictures, { imagePath: path, description: "", templeId: templeId }])}
    />
  )}
</div>
);
}
  
export default TempleDetailPage;

