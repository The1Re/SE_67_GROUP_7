import { useState, useEffect } from "react";

// ปรับ interface ให้ตรงกับ API
interface CharmData {
  charmId?: number;
  name: string;
  imagePath?: string;
  price: number;
  avalibleDate: Date;
  status?: number;
  detail: string;
  templeId?: number;
  image?: File; // สำหรับเก็บไฟล์รูปภาพที่อัปโหลด
  imagePreview?: string; // สำหรับแสดงตัวอย่างรูปภาพ
}

const AddCharmPopup = ({ show, onClose, onSave, onDelete, editingCharm }) => {
  // ปรับ state ให้ตรงกับ API
  const [charmData, setCharmData] = useState<CharmData>(
    editingCharm || { 
      name: "", 
      detail: "", 
      price: 0, 
      avalibleDate: new Date(),
      status: 1,
      imagePath: null 
    }
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  // ✅ ตั้งค่าข้อมูลเมื่อมีการแก้ไข
  useEffect(() => {
    setCharmData(editingCharm || { 
      name: "", 
      detail: "", 
      price: 0, 
      avalibleDate: new Date(),
      status: 1,
      imagePath: null 
    });
  }, [editingCharm]);

  // ✅ ฟังก์ชันจัดการการเปลี่ยนแปลงฟิลด์
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // แปลงค่าเป็นตัวเลขสำหรับฟิลด์ price
    if (name === 'price') {
      setCharmData({ ...charmData, [name]: Number(value) });
    } else {
      setCharmData({ ...charmData, [name]: value });
    }
  };

  // ✅ ฟังก์ชันจัดการการเปลี่ยนแปลงวันที่
  const handleDateChange = (date) => {
    setCharmData({ ...charmData, avalibleDate: date });
  };

  // ✅ ฟังก์ชันอัปโหลดรูป
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCharmData({ 
        ...charmData, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSave = () => {
    onSave(charmData);
    onClose();
  };

  // ✅ ยืนยันก่อนลบ
  const handleDeleteConfirm = () => {
    setConfirmDelete(true);
  };

  const handleDelete = () => {
    if (editingCharm) {
      onDelete(editingCharm.charmId);
      setConfirmDelete(false);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50" onClick={onClose}>
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-[700px] flex gap-6" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ รูปภาพอยู่ด้านซ้าย */}
        <div className="w-1/3 flex flex-col items-center">
          <label className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden border-dashed border-2 border-gray-400">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {(charmData.imagePreview || charmData.imagePath) ? (
              <div className="relative w-full h-full">
                <img 
                  src={charmData.imagePreview || `http://localhost:3000/${charmData.imagePath}`} 
                  alt="Charm Upload" 
                  className="w-full h-full object-cover rounded-lg" 
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-700"
                  onClick={() => setCharmData({ 
                    ...charmData, 
                    image: null,
                    imagePreview: null,
                    imagePath: undefined
                  })}
                >
                  Delete
                </button>
              </div>
            ) : (
              <span className="text-3xl text-gray-500">+</span>
            )}
          </label>
        </div>

        {/* ✅ ฟอร์มอยู่ด้านขวา */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-[#44AFB6] text-center mb-4">
            {editingCharm ? "Edit Charm" : "Add Charm"}
          </h2>

          {/* ✅ ฟิลด์ข้อมูล Charm */}
          <div className="space-y-2">
            {/* ชื่อพระ */}
            <div className="text-left">
              <label className="block text-gray-700 font-semibold">ชื่อพระ</label>
              <input
                type="text"
                name="name"
                value={charmData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="กรอกชื่อพระ"
              />
            </div>
            
            {/* รายละเอียด */}
            <div className="text-left">
              <label className="block text-gray-700 font-semibold">รายละเอียด</label>
              <textarea
                name="detail"
                value={charmData.detail}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                placeholder="กรอกรายละเอียด"
                rows={3}
              />
            </div>
            
            {/* ราคา */}
            <div className="text-left">
              <label className="block text-gray-700 font-semibold">ราคา (บาท)</label>
              <input
                type="float"
                name="price"
                value={charmData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="กรอกราคา"
                min="0"
              />
            </div>
            
            {/* วันที่วางจำหน่าย */}
            <div className="text-left">
              <label className="block text-gray-700 font-semibold">วันที่วางจำหน่าย</label>
              <input
                type="date"
                name="avalibleDate"
                value={charmData.avalibleDate instanceof Date 
                  ? charmData.avalibleDate.toISOString().split('T')[0] 
                  : new Date(charmData.avalibleDate).toISOString().split('T')[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* ✅ ปุ่ม Save & Delete */}
          <div className="flex justify-between mt-6">
            {editingCharm && (
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700" onClick={handleDeleteConfirm}>
                Delete
              </button>
            )}
            <button className="bg-[#44AFB6] text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600" onClick={handleSave}>
              {editingCharm ? "Save Changes" : "Add Charm"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Popup ยืนยันการลบ */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this charm?</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700" onClick={handleDelete}>
                Delete
              </button>
              <button className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500" onClick={() => setConfirmDelete(false)}>
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
