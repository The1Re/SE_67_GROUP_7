import { useState, useEffect } from "react";

const AddPicture = ({ show, onClose, onSave, imageToEdit, onDelete }) => {
  const [imageUrl, setImageUrl] = useState(imageToEdit || null);
  const [confirmDelete, setConfirmDelete] = useState(false); // ✅ แจ้งเตือนก่อนลบ

  if (!show) return null; // ❌ ไม่แสดง Pop-up ถ้า show = false

  // ✅ ตั้งค่าใหม่เมื่อมีการแก้ไขภาพ
  useEffect(() => {
    setImageUrl(imageToEdit || null);
  }, [imageToEdit]);

  // ✅ อัปโหลดรูปใหม่
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      console.log("🖼 รูปที่อัปโหลด:", newUrl);
      setImageUrl(newUrl);
    }
  };

  // ✅ ฟังก์ชันลบรูป
  const handleDelete = () => {
    if (imageToEdit) {
      console.log("กำลังลบรูป:", imageToEdit);
      onDelete(imageToEdit); // ✅ เรียกฟังก์ชันลบรูป
      setImageUrl(null); // ✅ ลบรูปออกจาก UI
      setConfirmDelete(false);
      onClose(); // ✅ ปิด popup
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
      onClick={onClose} // ✅ กดข้างนอกให้ปิด popup
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full text-center"
        onClick={(e) => e.stopPropagation()} // ❌ ป้องกันปิดเมื่อคลิกที่ตัว Popup
      >
        <h2 className="text-xl font-bold text-[#44AFB6]">
          {imageToEdit ? "Edit Picture" : "Add Picture"}
        </h2>

        {/* ✅ แสดงรูปที่อัปโหลดหรือรูปเดิม โดยรักษาสัดส่วน */}
        <label className="w-full flex justify-center items-center bg-gray-300 rounded-lg cursor-pointer mt-4 overflow-hidden relative ">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageUpload}
          />
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="w-auto h-auto max-h-[500px] max-w-full object-contain aspect-auto rounded-lg"
            />
          ) : (
            <span className="text-4xl text-gray-600">+</span>
          )}
        </label>

        <div className="flex justify-center space-x-4 mt-6">
          {imageToEdit && (
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 text-lg cursor-pointer"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg cursor-pointer"
            onClick={() => onSave(imageUrl)}
            disabled={!imageUrl}
          >
            {imageToEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>

      {/* ✅ แจ้งเตือนยืนยันการลบ */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this picture?</p>
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

export default AddPicture;
