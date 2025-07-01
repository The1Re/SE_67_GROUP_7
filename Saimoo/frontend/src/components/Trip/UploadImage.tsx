import { useTrip } from "@/context/TripContext";
import { getFile, sendFile } from "@/services/fileupload";
import toast from "react-hot-toast";

const UploadImage = () => {
  const { trip, setTrip } = useTrip();

  // ✅ ตรวจสอบว่ามีค่า imagePath หรือไม่
  const imageURL = trip?.TripPicture?.imagePath
    ? getFile(trip.TripPicture.imagePath)
    : "/assets/imagetemple/placeholder.jpg"; // ✅ ใส่รูป placeholder ถ้าไม่มีภาพ

  // ✅ ฟังก์ชันอัปโหลดรูปภาพ
  function onImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      sendFile(file)
        .then((v) => {
          if (v && v.file && v.file.path) {
            setTrip({ ...trip, TripPicture: { imagePath: v.file.path } });
            toast.success("อัพโหลดรูปภาพสำเร็จ ✅");
          } else {
            toast.error("ไม่สามารถอัปโหลดไฟล์ได้ ❗️");
          }
        })
        .catch(() => {
          toast.error("อัพโหลดรูปภาพไม่สำเร็จ ❗️");
        });
    }
  }

  return (
    <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg relative overflow-hidden">
      {/* ✅ รูปภาพพื้นหลังเบลอถ้ามีรูป */}
      {trip?.TripPicture?.imagePath && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-50"
          style={{ backgroundImage: `url(${imageURL})` }}
        ></div>
      )}

      {/* ✅ ตรวจสอบว่ามีรูปหรือไม่ ถ้าไม่มีให้แสดงปุ่มอัปโหลด */}
      {!trip?.TripPicture?.imagePath ? (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer relative">
          <span className="text-4xl text-gray-500">+</span>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="w-full h-full flex items-center justify-center relative">
          <img
            src={imageURL}
            alt="preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          {/* ✅ ปุ่มแก้ไขรูปภาพ */}
          <label className="absolute bottom-2 left-2 bg-white p-2 text-sm shadow-md rounded cursor-pointer">
            แก้ไข
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
