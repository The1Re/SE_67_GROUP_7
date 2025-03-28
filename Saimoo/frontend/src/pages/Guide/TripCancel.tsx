import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming React Router
import { ReasonCard } from '@/components/canceltrip/ReasonCard';
import { CancellationModal } from '@/components/canceltrip/CancellationModal';
import { CANCELLATION_REASONS } from '@/components/canceltrip/cancellationReasons';
import toast from 'react-hot-toast';
import api from '@/api';

const TripCancellationPage: React.FC = () => {
  const navigate = useNavigate(); // React Router navigation hook
  const { tripId } = useParams(); // Assuming you're using React Router
  const [selectedReason, setSelectedReason] = useState<any>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleReasonSelect = (reason: any) => {
    setSelectedReason(reason);
  };

  const handleCancelTrip = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmCancellation = async () => {
    // Actual cancellation logic
    await toast.promise(
      api.put(`/trips/${tripId}/cancel`, {  }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }),
      {
        loading: 'กำลังยกเลิกทริป...',
        success: 'ยกเลิกทริปสำเร็จ ด้วยเหตุผล ' + selectedReason.title,
        error: 'ยกเลิกทริปไม่สำเร็จ',
      }
    )
    setIsConfirmModalOpen(false);
    
    // Navigate to a specific route after cancellation
    navigate('/trips'); // Adjust the route as needed
  };

  const handleGoBack = () => {
    // Option 1: Go back to previous page
    navigate(-1);

    // Alternative Option 2: Navigate to a specific route
    // navigate('/trips-detail');
  };

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-xl overflow-hidden">
        {/* Header with Back and Close Buttons */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleGoBack}
              className="hover:bg-white/20 rounded-full p-2"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">ยกเลิกทริป</h1>
          </div>
          <button 
            onClick={() => navigate('/trips')} // Close and go to trips page
            className="hover:bg-white/20 rounded-full p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Reasons Grid */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            เลือกเหตุผลการยกเลิก
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {CANCELLATION_REASONS.map((reason) => (
              <ReasonCard
                key={reason.id}
                {...reason}
                isSelected={selectedReason?.id === reason.id}
                onSelect={() => handleReasonSelect(reason)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-100 p-6 flex justify-between">
          <button 
            onClick={handleGoBack}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
          >
            กลับ
          </button>
          <button 
            onClick={handleCancelTrip}
            disabled={!selectedReason}
            className={`
              px-6 py-3 rounded-lg text-white transition-all 
              ${selectedReason 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            ยืนยันการยกเลิก
          </button>
        </div>

        {/* Confirmation Modal */}
        <CancellationModal
          isOpen={isConfirmModalOpen}
          reason={selectedReason || { title: '' }}
          onClose={handleCloseModal}
          onConfirm={handleConfirmCancellation}
        />
      </div>
    </div>
  );
};

export default TripCancellationPage;