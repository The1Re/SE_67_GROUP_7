import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CancellationModalProps {
  isOpen: boolean;
  reason: { title: string };
  onClose: () => void;
  onConfirm: () => void;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  reason,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">ยืนยันการยกเลิกทริป</h2>
          <p className="text-gray-600 mb-6">
            คุณต้องการยกเลิกทริปด้วยเหตุผล: 
            <strong className="ml-2 text-red-500">
              {reason.title}
            </strong>
          </p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg"
          >
            ยกเลิก
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};
