import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "@/config";
import api from "@/api";
import toast from "react-hot-toast";

// ปรับ interface ให้ตรงกับ API
interface Activity {
  id?: number;
  name: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string;
  imagePath?: string;
  templeId?: number;
}

interface AddActivityProps {
  show: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  editingActivity: Activity | null;
  callback: (path: string) => void;
}

const AddActivity: React.FC<AddActivityProps> = ({ 
  show, 
  onClose, 
  onSave, 
  editingActivity,
  callback 
}) => {
  // ปรับ state ให้ตรงกับ API
  const [activityData, setActivityData] = useState<Activity>(
    editingActivity || { 
      name: "", 
      description: "",  
      startDate: new Date(), 
      endDate: new Date(), 
      imagePath: "",
    }
  );
  
  const [imageUrl, setImageUrl] = useState<string | null>(editingActivity?.imagePath || null);

  // Reset state when editing a different activity
  useEffect(() => {
    if (editingActivity) {
      setActivityData(editingActivity);
      setImageUrl(editingActivity.imagePath || null);
    } else {
      setActivityData({ 
        name: "", 
        description: "",  
        startDate: new Date(), 
        endDate: new Date(), 
        imagePath: "",
      });
      setImageUrl(null);
    }
  }, [editingActivity]);

  const handleChange = (e) => {
    setActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setActivityData((prev) => ({
      ...prev,
      startDate: date.toISOString(), // แปลงเป็น ISO 8601
      endDate: date > new Date(prev.endDate) ? date.toISOString() : prev.endDate,
    }));
  };
  
  const handleEndDateChange = (date) => {
    if (date >= new Date(activityData.startDate)) {
      setActivityData({ 
        ...activityData, 
        endDate: date.toISOString() // แปลงเป็น ISO 8601
      });
    }
  };

  const sendFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = response.data.file;
        if (data && data.path) {
          setImageUrl(data.path);
          setActivityData({ ...activityData, imagePath: data.path });
          callback(data.path);
        } else {
          console.error("Invalid response format - missing path:", data);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      sendFile(event.target.files[0]);
    }
  };

  const handleSave = () => {
    if (!activityData.name.trim() || !activityData.description.trim()) {
      toast.error("กรุณากรอกชื่อและรายละเอียดกิจกรรม");
      return;
    }
    
    // ตรวจสอบว่ามีรูปภาพหรือไม่
    if (!imageUrl) {
      toast.error("กรุณาอัพโหลดรูปภาพกิจกรรม");
      return;
    }
    
    // อัปเดต imagePath ก่อนส่งข้อมูล
    const updatedActivity = {
      ...activityData,
      imagePath: imageUrl
    };
    
    onSave(updatedActivity);
  };

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
      onClick={onClose} 
    >
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-[700px] flex gap-6"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* ส่วนของรูปภาพ (ซ้าย) */}
        <div className="w-1/3 flex flex-col items-center">
          <label className="w-full flex justify-center items-center bg-gray-300 rounded-lg cursor-pointer h-40 overflow-hidden relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            {imageUrl ? (
              <img
                src={env.API_URL + "/" + imageUrl}
                alt="Activity Upload" 
                className="w-full h-full object-cover rounded-lg" 
              />
            ) : (
              <span className="text-4xl text-gray-600">+</span>
            )}
          </label>
        </div>
        
        {/* ส่วนของฟอร์ม (ขวา) */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-[#44AFB6] text-center mb-4">
            {editingActivity ? "Edit Activity" : "Add Activity"}
          </h2>

          {/* ชื่อกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            ชื่อกิจกรรม
          </label>
          <input
            type="text"
            name="name"
            value={activityData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="กรอกชื่อกิจกรรม"
          />

          {/* คำอธิบายกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            คำอธิบายกิจกรรม
          </label>
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            placeholder="กรอกรายละเอียดกิจกรรม"
            rows={4}
          ></textarea>

          {/* วันที่เริ่มต้นกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            วันที่เริ่มกิจกรรม
          </label>
          <DatePicker
            selected={activityData.startDate ? new Date(activityData.startDate) : new Date()}
            onChange={handleStartDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSX"
            timeFormat="HH:mm"
            timeIntervals={15}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* วันที่สิ้นสุดกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            วันที่สิ้นสุดกิจกรรม
          </label>
          <DatePicker
            selected={activityData.endDate ? new Date(activityData.endDate) : new Date()}
            onChange={handleEndDateChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSX"
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={activityData.startDate ? new Date(activityData.startDate) : new Date()}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {/* ปุ่มบันทึก */}
          <button
            className="bg-[#44AFB6] text-white w-full px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-teal-600"
            onClick={handleSave}
          >
            {editingActivity ? "Save Changes" : "Add Activity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
