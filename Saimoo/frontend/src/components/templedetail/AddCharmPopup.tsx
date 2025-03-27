import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "@/config";
import api from "@/api";
import toast from "react-hot-toast";

interface CharmData {
  charmId?: number;
  name: string;
  imagePath?: string;
  price: number;
  avalibleDate: Date | string;
  status?: number;
  detail: string;
  templeId?: number;
}

interface AddCharmPopupProps {
  show: boolean;
  onClose: () => void;
  onSave: (charm: CharmData) => void;
  onDelete: (id: number) => void;
  editingCharm: CharmData | null;
  callback: (path: string) => void;  // เพิ่ม callback prop
}

const AddCharmPopup: React.FC<AddCharmPopupProps> = ({
  show,
  onClose,
  onSave,
  onDelete,
  editingCharm,
  callback  // รับ callback
}) => {
  const [charmData, setCharmData] = useState<CharmData>(
    editingCharm || {
      name: "",
      price: 0,
      avalibleDate: new Date(),
      status: 1,
      detail: "",
      imagePath: ""
    }
  );
  
  const [imageUrl, setImageUrl] = useState<string | null>(editingCharm?.imagePath || null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Reset state when editing a different charm
  useEffect(() => {
    if (editingCharm) {
      setCharmData(editingCharm);
      setImageUrl(editingCharm.imagePath || null);
    } else {
      setCharmData({
        name: "",
        price: 0,
        avalibleDate: new Date(),
        status: 1,
        detail: "",
        imagePath: ""
      });
      setImageUrl(null);
    }
  }, [editingCharm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // ถ้าเป็น price ให้แปลงเป็นตัวเลข
    if (name === "price" || name === "status") {
      setCharmData({ ...charmData, [name]: Number(value) });
    } else {
      setCharmData({ ...charmData, [name]: value });
    }
  };

  const handleDateChange = (date) => {
    setCharmData({ ...charmData, avalibleDate: date.toISOString() });
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
          setCharmData({ ...charmData, imagePath: data.path });
          callback(data.path);  // เรียกใช้ callback เมื่ออัพโหลดสำเร็จ
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

  const handleDelete = () => {
    if (editingCharm?.charmId) {
      onDelete(editingCharm.charmId);
      onClose();
    }
  };

  const handleSave = () => {
    if (!charmData.name.trim() || !charmData.detail.trim()) {
      toast.error("กรุณากรอกชื่อและรายละเอียดของเครื่องราง");
      return;
    }
    
    if (!imageUrl) {
      toast.error("กรุณาอัพโหลดรูปภาพเครื่องราง");
      return;
    }
    
    // อัปเดต imagePath ก่อนส่งข้อมูล
    const updatedCharm = {
      ...charmData,
      imagePath: imageUrl
    };
    
    onSave(updatedCharm);
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
                alt="Charm Upload"
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
            {editingCharm ? "Edit Charm" : "Add Charm"}
          </h2>

          {/* ชื่อเครื่องราง */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            ชื่อเครื่องราง
          </label>
          <input
            type="text"
            name="name"
            value={charmData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="กรอกชื่อเครื่องราง"
          />

          {/* รายละเอียด */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            รายละเอียด
          </label>
          <textarea
            name="detail"
            value={charmData.detail}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            placeholder="กรอกรายละเอียดเครื่องราง"
            rows={3}
          ></textarea>

          {/* ราคา */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            ราคา (บาท)
          </label>
          <input
            type="number"
            name="price"
            value={charmData.price}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="กรอกราคา"
          />

          {/* วันที่วางจำหน่าย */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            วันที่วางจำหน่าย
          </label>
          <DatePicker
            selected={charmData.avalibleDate ? new Date(charmData.avalibleDate) : new Date()}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* ปุ่มบันทึก */}
          <div className="flex justify-between mt-4">
            {editingCharm && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            )}
            <button
              className={`bg-[#44AFB6] text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 ${editingCharm ? 'ml-auto' : 'w-full'}`}
              onClick={handleSave}
            >
              {editingCharm ? "Save Changes" : "Add Charm"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this charm?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCharmPopup;
