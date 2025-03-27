import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitPopup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-2xl w-96 p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">...ส่งคำเรียบร้อย...</h3>
        
        <p className="text-lg mb-6">รอการอนุมัติการเชื่อมต่อ</p>
        
        <button 
          onClick={onClose}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg text-lg"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
};

export default SubmitPopup;