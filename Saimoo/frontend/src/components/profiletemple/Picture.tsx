import { env } from "@/config";
import { useState } from "react";

// เพิ่ม interface เพื่อกำหนดโครงสร้างข้อมูลที่ชัดเจน
interface ImageData {
  imagePath: string;
  title?: string;
  description?: string;
}

const Picture = ({ images }: { images: ImageData[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 ฟังก์ชันเปิดรูปภาพในโมดอล
  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index].imagePath);
  };

  // 🔹 ฟังก์ชันปิดรูปภาพ
  const closeImage = () => {
    setSelectedImage(null);
  };

  // 🔹 ฟังก์ชันเลื่อนภาพไปทางซ้าย
  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].imagePath);
  };

  // 🔹 ฟังก์ชันเลื่อนภาพไปทางขวา
  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex].imagePath);
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
            onClick={() => openImage(index)}
          >
            <img
              src={env.API_URL + "/" + img.imagePath}
              alt={`Image ${index + 1}`}
              className="w-full h-auto aspect-[16/9] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* 🔹 Modal แสดงรูปภาพขยายและเลื่อนได้ */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-opacity-75 bg-black z-50"
          onClick={closeImage}
        >
          {/* ปุ่มย้อนกลับ */}
          <button
            className="absolute left-5 text-white text-3xl font-bold p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
            onClick={prevImage}
          >
            ❮
          </button>

          {/* รูปภาพที่เลือก */}
          <img
            src={env.API_URL + "/" + selectedImage}
            alt="Expanded View"
            className="max-w-[70%] max-h-[70%] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อกดที่ภาพ
          />

          {/* ปุ่มไปข้างหน้า */}
          <button
            className="absolute right-5 text-white text-3xl font-bold p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-80"
            onClick={nextImage}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default Picture;
