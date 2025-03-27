import { Dialog } from "@headlessui/react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const ImageModal = ({ selectedImage, setSelectedImage, prevImage, nextImage }) => {
  if (!selectedImage) return null;

  return (
    <Dialog open={true} onClose={() => setSelectedImage(null)} className="fixed inset-0 flex items-center justify-center bg-opacity-75 backdrop-blur-md">
      <div className="relative p-4 max-w-[80vw] max-h-[80vh]">
        <button className="absolute top-4 right-4 text-white text-2xl cursor-pointer" onClick={() => setSelectedImage(null)}>
          <FaTimes />
        </button>
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer" onClick={prevImage}>
          <FaChevronLeft />
        </button>
        <img src={selectedImage} alt="Selected" className="w-full h-full max-w-[600px] max-h-[500px] object-contain" />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer" onClick={nextImage}>
          <FaChevronRight />
        </button>
      </div>
    </Dialog>
  );
};

export default ImageModal;
