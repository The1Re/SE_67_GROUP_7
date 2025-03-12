import React, { useState, useEffect } from "react";

const AddCharmPopup = ({ show, onClose, onSave, onDelete, editingCharm }) => {
  const [charmData, setCharmData] = useState(
    editingCharm || { name: "", material: "", model: "", price: "", image: null }
  );

  const [confirmDelete, setConfirmDelete] = useState(false);

  // ✅ ตั้งค่าข้อมูลเมื่อมีการแก้ไข
  useEffect(() => {
    setCharmData(editingCharm || { name: "", material: "", model: "", price: "", image: null });
  }, [editingCharm]);

  // ✅ ฟังก์ชันจัดการการเปลี่ยนแปลงฟิลด์
  const handleInputChange = (e) => {
    setCharmData({ ...charmData, [e.target.name]: e.target.value });
  };

  // ✅ ฟังก์ชันอัปโหลดรูป
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCharmData({ ...charmData, image: URL.createObjectURL(file) });
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
      onDelete(editingCharm.id);
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
            {charmData.image ? (
              <div className="relative w-full h-full">
                <img src={charmData.image} alt="Charm Upload" className="w-full h-full object-cover rounded-lg" />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-700"
                  onClick={() => setCharmData({ ...charmData, image: null })}
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
            {[
              { name: "name", label: "ชื่อพระ" },
              { name: "material", label: "เนื้อพระ" },
              { name: "model", label: "รุ่นพระ" },
              { name: "price", label: "ราคา (บาท)" }
            ].map((field) => (
              <div key={field.name} className="text-left">
                <label className="block text-gray-700 font-semibold">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={charmData[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder={`กรอก${field.label}`}
                />
              </div>
            ))}
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
