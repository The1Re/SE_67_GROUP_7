import React, { useState } from "react";

const Picture = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔹 ฟังก์ชันเปิดรูปภาพในโมดอล
  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  // 🔹 ฟังก์ชันปิดรูปภาพ
  const closeImage = () => {
    setSelectedImage(null);
  };

  // 🔹 ฟังก์ชันเลื่อนภาพไปทางซ้าย
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setSelectedImage(
      images[currentIndex > 0 ? currentIndex - 1 : images.length - 1]
    );
  };

  // 🔹 ฟังก์ชันเลื่อนภาพไปทางขวา
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setSelectedImage(
      images[currentIndex < images.length - 1 ? currentIndex + 1 : 0]
    );
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
              src={img}
              alt={`Image ${index + 1}`}
              className="w-full h-auto aspect-[16/9] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* 🔹 Modal แสดงรูปภาพขยายและเลื่อนได้ */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-opacity-75  z-50"
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
            src={selectedImage}
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
